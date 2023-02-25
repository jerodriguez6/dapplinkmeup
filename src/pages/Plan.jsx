import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import { NFT_PRICES } from '../const'
import Footer from '../components/Footer'


const Plan = ({ mode }) => {

    const Status = styled.div`
    //gap: 20px;
    height: 70vh;
    overflow-y: auto;
    display:flex;
    flex-direction: column;
    width: 100%;
    `
    
    const Section = styled.div`
    display: flex;
    width: 86%;
    height: 115px;
    align-items: center;
    background: ${mode ? "transparent" : "linear-gradient(#59595c,#414145) padding-box"};
    justify-content: space-between;
    flex-direction:column;
    border: 2px solid #5b6eff;
    //margin: 5px auto;
    border-radius: 20px;
    margin-left: 6%;
    margin-bottom:1%;

    
    `
    
    const LeftSide = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    padding: 0 1%;
    //flex-direction: column;
    //justify-content: center;
    //align-items: center;
    justify-content: space-between;
    align-items: center;
      @media (max-width: 500px) {
        padding: 0 3%;
    }

    `

    const RigthSide = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    //width: 20%;
    //height: 100%;
    gap:5px;


    `

    const Center = styled.div`
    display: flex;
    //flex-direction: column;
    //justify-content: center;
    align-items: baseline;
    width: 50%;
    gap:5%;
    height: 100%;
     h2{
        color:#7AC2FF;
        font-size:64px;
        font-weight:800;
    }
    p{
        font-size:20px;
    }
    p span{
        color:#7AC2FF;
    }
      @media (max-width: 500px) {
       h2{
        font-size:54px;
    }
    }

    `

    const ProgressBar = styled.div`
    display: flex;
    justify-content: initial;
    align-items: center;
    width: 98%;
    //height: 30%;
    min-height: 15px;
    //margin-left: 10px;
    border: 1px solid white;
    border-radius: 10px;
    //overflow: hidden;
    margin-bottom:5%;
    span{
      position: relative;
      right: -17%
    }
    @media (max-width: 768px) {
        width: 95%;
        span{
          right: -14%
      }
    }
    @media (max-width: 500px) {
        span{
          right: -13%
      }
    }
    `

    const ProgressBarPercent = styled.div`
    display: flex;
    justify-content: initial;
    //width:100%;
    align-items: center;
    border-radius: 10px;
    height: 100%;
    min-height: 20px;
    background: linear-gradient( to right, #FFA859, #FFE283);
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    position: relative;
    p {
        position: absolute;
        color: #ffffff;
        font-weight: 600;
        top: 0;
        left: 0;
        min-width: 80px;
    }

    `

    const RoundedNum = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background:  ${mode ? "linear-gradient(#1f1f21,#141416) padding-box,linear-gradient(to right, rgba(240, 159, 94, 1), rgba(87, 80, 245, 1), rgba(134, 230, 255, 1)) border-box;" : "linear-gradient(#e8e8ee,#c4c4ce) padding-box,linear-gradient(to right, rgba(240, 159, 94, 1), rgba(87, 80, 245, 1), rgba(134, 230, 255, 1)) border-box;"};
    border-radius: 50%;
    border: 7px solid transparent;
    width: 80px;
    height: 80px;
    font-size: 2rem;
    @media (max-width: 768px) {
        width: 60px;
        height: 60px;
        font-size: 3rem;
    }
    `

    const Rainbow = styled.div`
     display: flex;
    align-items: center;
    justify-content: center;
    width: 147px;
    //height: 40px;
    border-radius: 20px;
    border: none;
    outline: none;
    background: linear-gradient(to right ,#5B6EFF,#83DEFF);
    color: white;
    font-size: 14   px;
    font-weight: 600;
    cursor: pointer;
    padding:2px;
    `

    const Cancel = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 147px;
    //height: 40px;
    border-radius: 20px;
    border: none;
    outline: none;
    background: linear-gradient(to right ,#ff0000,#ff5252);
    color: white;
    font-size: 14   px;
    font-weight: 600;
    cursor: pointer;
    padding:2px;
    `


    const { connected, investmentPlans, paymentContract } = useSelector(state => state.web3)


    const calculateRewardPerDay = (level, startTimesTamp) => {
        //const rewardPerDay = (NFT_PRICES[level - 1] * 1.5 )* 0.005555;
        const rewardPerDay = NFT_PRICES[level - 1] * 0.00275;
        //console.log("rewardPerDay", rewardPerDay)
        const UTCzone = new Date().getTimezoneOffset() * 60;
        const startDay = new Date(startTimesTamp * 1000);
        const now = new Date() * 1 - UTCzone * 1000;
        const diffTime = Math.abs(now - startDay);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        //console.log("diffDays", diffDays - 1)
        const reward = (rewardPerDay * (diffDays - 1)) + NFT_PRICES[level - 1];
        //console.log("reward", reward)
        if(reward > NFT_PRICES[level - 1] * 1.5) return NFT_PRICES[level - 1] * 1.5;
        return reward.toFixed(2);

    }

    const makeOrder = async (level) => {
        try {
            // advertise
       
                
            await paymentContract.investmentOrder(level.toString())
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Your order has been placed',
                showConfirmButton: false,
                timer: 1500
            })
        } catch (e) {
            console.log(e)
            if(e.reason){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: e.reason,
                })
            }
        }
    }

    const cancelOrder = async (level) => {
        try {
            // sure want to cancel
            const result = await Swal.fire({ 
                title: 'Are you sure?', 
                text: "30% will be deducted for penalties", 
                icon: 'warning', showCancelButton: true, 
                confirmButtonColor: '#3085d6', 
                cancelButtonColor: '#d33', 
                confirmButtonText: 'cancel it!' })
            if (result.isConfirmed) {
                const tx = await paymentContract.cancelInvestmentPlan(level.toString())
                await tx.wait()
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Your withdrawal is in process, thank you very much for your trust! We inform you that it may take from 1 to 5 business days',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    const retireReward = async (level) => {
        try {
            const tx = await paymentContract.orderRetire(level.toString())
            await tx.wait()
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Your order has been canceled',
                showConfirmButton: false,
                timer: 1500
            })
        } catch (e) {
            console.log(e)
        }
    }



    //console.log("investmentPlans", investmentPlans)




    return (
        <>
        <Status>
            {/*{investmentPlans.length > 0 ?
                investmentPlans.map((level, index) => {
                    return (*/}
                        <Section key={1}>
                            <LeftSide>
                            <Center>
                                {/*<RoundedNum>*/}
                                    {/*<h2> {parseInt(level.level)}</h2>*/}
                                    <h2> 1</h2>
                                {/*</RoundedNum>*/}
                                <p> <span>$ </span>80</p>

                                {/*<ProgressBar>
                                    <ProgressBarPercent style={{ width: `${calculateRewardPerDay(level.level, level.timestamp) / (NFT_PRICES[level.level - 1]*1.50) * 100}%` }}>*/}
                            </Center>
                            <RigthSide>
                                {/*{level.generatedOrder && level.payed === false &&*/}
                                    {/*<p>waiting payment</p>*/}
                                    {/*}*/}
                                {/*{level.generatedOrder && level.payed === true &&*/}
                                    {/*<Rainbow onClick={() => retireReward(34)}>
                                        retire
                                    </Rainbow>*/}
                                {/*}*/}
                                {/*{level.generatedOrder === false &&*/}
                                    <>
                                        <Rainbow onClick={() => makeOrder(34)}>
                                            make order</Rainbow>
                                        <Cancel onClick={() => cancelOrder(34)}>
                                            cancel Plan
                                        </Cancel>
                                    </>
                                {/*}*/}
                                {/*{
                                    0 && <p>Order canceled</p>
                                }*/}

                            </RigthSide>
                            </LeftSide>
                                <ProgressBar>
                                    <ProgressBarPercent style={{ width: `80%` }}>
                                    </ProgressBarPercent>
                                        <span className='span1'>0%</span>
                                </ProgressBar>
                        </Section>
                        <Section key={1}>
                            <LeftSide>
                            <Center>
                                {/*<RoundedNum>*/}
                                    {/*<h2> {parseInt(level.level)}</h2>*/}
                                    <h2> 1</h2>
                                {/*</RoundedNum>*/}
                                <p> <span>$ </span>80</p>

                                {/*<ProgressBar>
                                    <ProgressBarPercent style={{ width: `${calculateRewardPerDay(level.level, level.timestamp) / (NFT_PRICES[level.level - 1]*1.50) * 100}%` }}>*/}
                            </Center>
                            <RigthSide>
                                {/*{level.generatedOrder && level.payed === false &&*/}
                                    {/*<p>waiting payment</p>*/}
                                    {/*}*/}
                                {/*{level.generatedOrder && level.payed === true &&*/}
                                    {/*<Rainbow onClick={() => retireReward(34)}>
                                        retire
                                    </Rainbow>*/}
                                {/*}*/}
                                {/*{level.generatedOrder === false &&*/}
                                    <>
                                        <Rainbow onClick={() => makeOrder(34)}>
                                            make order</Rainbow>
                                        <Cancel onClick={() => cancelOrder(34)}>
                                            cancel Plan
                                        </Cancel>
                                    </>
                                {/*}*/}
                                {/*{
                                    0 && <p>Order canceled</p>
                                }*/}

                            </RigthSide>
                            </LeftSide>
                                <ProgressBar>
                                    <ProgressBarPercent style={{ width: `80%` }}>
                                    </ProgressBarPercent>
                                        <span className='span1'>0%</span>
                                </ProgressBar>
                        </Section>
                        <Section key={1}>
                            <LeftSide>
                            <Center>
                                {/*<RoundedNum>*/}
                                    {/*<h2> {parseInt(level.level)}</h2>*/}
                                    <h2> 1</h2>
                                {/*</RoundedNum>*/}
                                <p> <span>$ </span>80</p>

                                {/*<ProgressBar>
                                    <ProgressBarPercent style={{ width: `${calculateRewardPerDay(level.level, level.timestamp) / (NFT_PRICES[level.level - 1]*1.50) * 100}%` }}>*/}
                            </Center>
                            <RigthSide>
                                {/*{level.generatedOrder && level.payed === false &&*/}
                                    {/*<p>waiting payment</p>*/}
                                    {/*}*/}
                                {/*{level.generatedOrder && level.payed === true &&*/}
                                    {/*<Rainbow onClick={() => retireReward(34)}>
                                        retire
                                    </Rainbow>*/}
                                {/*}*/}
                                {/*{level.generatedOrder === false &&*/}
                                    <>
                                        <Rainbow onClick={() => makeOrder(34)}>
                                            make order</Rainbow>
                                        <Cancel onClick={() => cancelOrder(34)}>
                                            cancel Plan
                                        </Cancel>
                                    </>
                                {/*}*/}
                                {/*{
                                    0 && <p>Order canceled</p>
                                }*/}

                            </RigthSide>
                            </LeftSide>
                                <ProgressBar>
                                    <ProgressBarPercent style={{ width: `80%` }}>
                                    </ProgressBarPercent>
                                        <span className='span1'>0%</span>
                                </ProgressBar>
                        </Section>
                        <Section key={1}>
                            <LeftSide>
                            <Center>
                                {/*<RoundedNum>*/}
                                    {/*<h2> {parseInt(level.level)}</h2>*/}
                                    <h2> 1</h2>
                                {/*</RoundedNum>*/}
                                <p> <span>$ </span>80</p>

                                {/*<ProgressBar>
                                    <ProgressBarPercent style={{ width: `${calculateRewardPerDay(level.level, level.timestamp) / (NFT_PRICES[level.level - 1]*1.50) * 100}%` }}>*/}
                            </Center>
                            <RigthSide>
                                {/*{level.generatedOrder && level.payed === false &&*/}
                                    {/*<p>waiting payment</p>*/}
                                    {/*}*/}
                                {/*{level.generatedOrder && level.payed === true &&*/}
                                    {/*<Rainbow onClick={() => retireReward(34)}>
                                        retire
                                    </Rainbow>*/}
                                {/*}*/}
                                {/*{level.generatedOrder === false &&*/}
                                    <>
                                        <Rainbow onClick={() => makeOrder(34)}>
                                            make order</Rainbow>
                                        <Cancel onClick={() => cancelOrder(34)}>
                                            cancel Plan
                                        </Cancel>
                                    </>
                                {/*}*/}
                                {/*{
                                    0 && <p>Order canceled</p>
                                }*/}

                            </RigthSide>
                            </LeftSide>
                                <ProgressBar>
                                    <ProgressBarPercent style={{ width: `80%` }}>
                                    </ProgressBarPercent>
                                        <span className='span1'>0%</span>
                                </ProgressBar>
                        </Section>
                        <Section key={1}>
                            <LeftSide>
                            <Center>
                                {/*<RoundedNum>*/}
                                    {/*<h2> {parseInt(level.level)}</h2>*/}
                                    <h2> 1</h2>
                                {/*</RoundedNum>*/}
                                <p> <span>$ </span>80</p>

                                {/*<ProgressBar>
                                    <ProgressBarPercent style={{ width: `${calculateRewardPerDay(level.level, level.timestamp) / (NFT_PRICES[level.level - 1]*1.50) * 100}%` }}>*/}
                            </Center>
                            <RigthSide>
                                {/*{level.generatedOrder && level.payed === false &&*/}
                                    {/*<p>waiting payment</p>*/}
                                    {/*}*/}
                                {/*{level.generatedOrder && level.payed === true &&*/}
                                    {/*<Rainbow onClick={() => retireReward(34)}>
                                        retire
                                    </Rainbow>*/}
                                {/*}*/}
                                {/*{level.generatedOrder === false &&*/}
                                    <>
                                        <Rainbow onClick={() => makeOrder(34)}>
                                            make order</Rainbow>
                                        <Cancel onClick={() => cancelOrder(34)}>
                                            cancel Plan
                                        </Cancel>
                                    </>
                                {/*}*/}
                                {/*{
                                    0 && <p>Order canceled</p>
                                }*/}

                            </RigthSide>
                            </LeftSide>
                                <ProgressBar>
                                    <ProgressBarPercent style={{ width: `80%` }}>
                                    </ProgressBarPercent>
                                        <span className='span1'>0%</span>
                                </ProgressBar>
                        </Section>
                        <Section key={1}>
                            <LeftSide>
                            <Center>
                                {/*<RoundedNum>*/}
                                    {/*<h2> {parseInt(level.level)}</h2>*/}
                                    <h2> 1</h2>
                                {/*</RoundedNum>*/}
                                <p> <span>$ </span>80</p>

                                {/*<ProgressBar>
                                    <ProgressBarPercent style={{ width: `${calculateRewardPerDay(level.level, level.timestamp) / (NFT_PRICES[level.level - 1]*1.50) * 100}%` }}>*/}
                            </Center>
                            <RigthSide>
                                {/*{level.generatedOrder && level.payed === false &&*/}
                                    {/*<p>waiting payment</p>*/}
                                    {/*}*/}
                                {/*{level.generatedOrder && level.payed === true &&*/}
                                    {/*<Rainbow onClick={() => retireReward(34)}>
                                        retire
                                    </Rainbow>*/}
                                {/*}*/}
                                {/*{level.generatedOrder === false &&*/}
                                    <>
                                        <Rainbow onClick={() => makeOrder(34)}>
                                            make order</Rainbow>
                                        <Cancel onClick={() => cancelOrder(34)}>
                                            cancel Plan
                                        </Cancel>
                                    </>
                                {/*}*/}
                                {/*{
                                    0 && <p>Order canceled</p>
                                }*/}

                            </RigthSide>
                            </LeftSide>
                                <ProgressBar>
                                    <ProgressBarPercent style={{ width: `80%` }}>
                                    </ProgressBarPercent>
                                        <span className='span1'>0%</span>
                                </ProgressBar>
                        </Section>
                        <Section key={1}>
                            <LeftSide>
                            <Center>
                                {/*<RoundedNum>*/}
                                    {/*<h2> {parseInt(level.level)}</h2>*/}
                                    <h2> 1</h2>
                                {/*</RoundedNum>*/}
                                <p> <span>$ </span>80</p>

                                {/*<ProgressBar>
                                    <ProgressBarPercent style={{ width: `${calculateRewardPerDay(level.level, level.timestamp) / (NFT_PRICES[level.level - 1]*1.50) * 100}%` }}>*/}
                            </Center>
                            <RigthSide>
                                {/*{level.generatedOrder && level.payed === false &&*/}
                                    {/*<p>waiting payment</p>*/}
                                    {/*}*/}
                                {/*{level.generatedOrder && level.payed === true &&*/}
                                    {/*<Rainbow onClick={() => retireReward(34)}>
                                        retire
                                    </Rainbow>*/}
                                {/*}*/}
                                {/*{level.generatedOrder === false &&*/}
                                    <>
                                        <Rainbow onClick={() => makeOrder(34)}>
                                            make order</Rainbow>
                                        <Cancel onClick={() => cancelOrder(34)}>
                                            cancel Plan
                                        </Cancel>
                                    </>
                                {/*}*/}
                                {/*{
                                    0 && <p>Order canceled</p>
                                }*/}

                            </RigthSide>
                            </LeftSide>
                                <ProgressBar>
                                    <ProgressBarPercent style={{ width: `80%` }}>
                                    </ProgressBarPercent>
                                        <span className='span1'>0%</span>
                                </ProgressBar>
                        </Section>
                        <Section key={1}>
                            <LeftSide>
                            <Center>
                                {/*<RoundedNum>*/}
                                    {/*<h2> {parseInt(level.level)}</h2>*/}
                                    <h2> 1</h2>
                                {/*</RoundedNum>*/}
                                <p> <span>$ </span>80</p>

                                {/*<ProgressBar>
                                    <ProgressBarPercent style={{ width: `${calculateRewardPerDay(level.level, level.timestamp) / (NFT_PRICES[level.level - 1]*1.50) * 100}%` }}>*/}
                            </Center>
                            <RigthSide>
                                {/*{level.generatedOrder && level.payed === false &&*/}
                                    {/*<p>waiting payment</p>*/}
                                    {/*}*/}
                                {/*{level.generatedOrder && level.payed === true &&*/}
                                    {/*<Rainbow onClick={() => retireReward(34)}>
                                        retire
                                    </Rainbow>*/}
                                {/*}*/}
                                {/*{level.generatedOrder === false &&*/}
                                    <>
                                        <Rainbow onClick={() => makeOrder(34)}>
                                            make order</Rainbow>
                                        <Cancel onClick={() => cancelOrder(34)}>
                                            cancel Plan
                                        </Cancel>
                                    </>
                                {/*}*/}
                                {/*{
                                    0 && <p>Order canceled</p>
                                }*/}

                            </RigthSide>
                            </LeftSide>
                                <ProgressBar>
                                    <ProgressBarPercent style={{ width: `80%` }}>
                                    </ProgressBarPercent>
                                        <span className='span1'>0%</span>
                                </ProgressBar>
                        </Section>
                        <Section key={1}>
                            <LeftSide>
                            <Center>
                                {/*<RoundedNum>*/}
                                    {/*<h2> {parseInt(level.level)}</h2>*/}
                                    <h2> 1</h2>
                                {/*</RoundedNum>*/}
                                <p> <span>$ </span>80</p>

                                {/*<ProgressBar>
                                    <ProgressBarPercent style={{ width: `${calculateRewardPerDay(level.level, level.timestamp) / (NFT_PRICES[level.level - 1]*1.50) * 100}%` }}>*/}
                            </Center>
                            <RigthSide>
                                {/*{level.generatedOrder && level.payed === false &&*/}
                                    {/*<p>waiting payment</p>*/}
                                    {/*}*/}
                                {/*{level.generatedOrder && level.payed === true &&*/}
                                    {/*<Rainbow onClick={() => retireReward(34)}>
                                        retire
                                    </Rainbow>*/}
                                {/*}*/}
                                {/*{level.generatedOrder === false &&*/}
                                    <>
                                        <Rainbow onClick={() => makeOrder(34)}>
                                            make order</Rainbow>
                                        <Cancel onClick={() => cancelOrder(34)}>
                                            cancel Plan
                                        </Cancel>
                                    </>
                                {/*}*/}
                                {/*{
                                    0 && <p>Order canceled</p>
                                }*/}

                            </RigthSide>
                            </LeftSide>
                                <ProgressBar>
                                    <ProgressBarPercent style={{ width: `80%` }}>
                                    </ProgressBarPercent>
                                        <span className='span1'>0%</span>
                                </ProgressBar>
                        </Section>
                        <Section key={1}>
                            <LeftSide>
                            <Center>
                                {/*<RoundedNum>*/}
                                    {/*<h2> {parseInt(level.level)}</h2>*/}
                                    <h2> 1</h2>
                                {/*</RoundedNum>*/}
                                <p> <span>$ </span>80</p>

                                {/*<ProgressBar>
                                    <ProgressBarPercent style={{ width: `${calculateRewardPerDay(level.level, level.timestamp) / (NFT_PRICES[level.level - 1]*1.50) * 100}%` }}>*/}
                            </Center>
                            <RigthSide>
                                {/*{level.generatedOrder && level.payed === false &&*/}
                                    {/*<p>waiting payment</p>*/}
                                    {/*}*/}
                                {/*{level.generatedOrder && level.payed === true &&*/}
                                    {/*<Rainbow onClick={() => retireReward(34)}>
                                        retire
                                    </Rainbow>*/}
                                {/*}*/}
                                {/*{level.generatedOrder === false &&*/}
                                    <>
                                        <Rainbow onClick={() => makeOrder(34)}>
                                            make order</Rainbow>
                                        <Cancel onClick={() => cancelOrder(34)}>
                                            cancel Plan
                                        </Cancel>
                                    </>
                                {/*}*/}
                                {/*{
                                    0 && <p>Order canceled</p>
                                }*/}

                            </RigthSide>
                            </LeftSide>
                                <ProgressBar>
                                    <ProgressBarPercent style={{ width: `80%` }}>
                                    </ProgressBarPercent>
                                        <span className='span1'>0%</span>
                                </ProgressBar>
                        </Section>
                        <Section key={1}>
                            <LeftSide>
                            <Center>
                                {/*<RoundedNum>*/}
                                    {/*<h2> {parseInt(level.level)}</h2>*/}
                                    <h2> 1</h2>
                                {/*</RoundedNum>*/}
                                <p> <span>$ </span>80</p>

                                {/*<ProgressBar>
                                    <ProgressBarPercent style={{ width: `${calculateRewardPerDay(level.level, level.timestamp) / (NFT_PRICES[level.level - 1]*1.50) * 100}%` }}>*/}
                            </Center>
                            <RigthSide>
                                {/*{level.generatedOrder && level.payed === false &&*/}
                                    {/*<p>waiting payment</p>*/}
                                    {/*}*/}
                                {/*{level.generatedOrder && level.payed === true &&*/}
                                    {/*<Rainbow onClick={() => retireReward(34)}>
                                        retire
                                    </Rainbow>*/}
                                {/*}*/}
                                {/*{level.generatedOrder === false &&*/}
                                    <>
                                        <Rainbow onClick={() => makeOrder(34)}>
                                            make order</Rainbow>
                                        <Cancel onClick={() => cancelOrder(34)}>
                                            cancel Plan
                                        </Cancel>
                                    </>
                                {/*}*/}
                                {/*{
                                    0 && <p>Order canceled</p>
                                }*/}

                            </RigthSide>
                            </LeftSide>
                                <ProgressBar>
                                    <ProgressBarPercent style={{ width: `80%` }}>
                                    </ProgressBarPercent>
                                        <span className='span1'>0%</span>
                                </ProgressBar>
                        </Section>
                        <Section key={1}>
                            <LeftSide>
                            <Center>
                                {/*<RoundedNum>*/}
                                    {/*<h2> {parseInt(level.level)}</h2>*/}
                                    <h2> 1</h2>
                                {/*</RoundedNum>*/}
                                <p> <span>$ </span>80</p>

                                {/*<ProgressBar>
                                    <ProgressBarPercent style={{ width: `${calculateRewardPerDay(level.level, level.timestamp) / (NFT_PRICES[level.level - 1]*1.50) * 100}%` }}>*/}
                            </Center>
                            <RigthSide>
                                {/*{level.generatedOrder && level.payed === false &&*/}
                                    {/*<p>waiting payment</p>*/}
                                    {/*}*/}
                                {/*{level.generatedOrder && level.payed === true &&*/}
                                    {/*<Rainbow onClick={() => retireReward(34)}>
                                        retire
                                    </Rainbow>*/}
                                {/*}*/}
                                {/*{level.generatedOrder === false &&*/}
                                    <>
                                        <Rainbow onClick={() => makeOrder(34)}>
                                            make order</Rainbow>
                                        <Cancel onClick={() => cancelOrder(34)}>
                                            cancel Plan
                                        </Cancel>
                                    </>
                                {/*}*/}
                                {/*{
                                    0 && <p>Order canceled</p>
                                }*/}

                            </RigthSide>
                            </LeftSide>
                                <ProgressBar>
                                    <ProgressBarPercent style={{ width: `80%` }}>
                                    </ProgressBarPercent>
                                        <span className='span1'>0%</span>
                                </ProgressBar>
                        </Section>
                        <Section key={1}>
                            <LeftSide>
                            <Center>
                                {/*<RoundedNum>*/}
                                    {/*<h2> {parseInt(level.level)}</h2>*/}
                                    <h2> 1</h2>
                                {/*</RoundedNum>*/}
                                <p> <span>$ </span>80</p>

                                {/*<ProgressBar>
                                    <ProgressBarPercent style={{ width: `${calculateRewardPerDay(level.level, level.timestamp) / (NFT_PRICES[level.level - 1]*1.50) * 100}%` }}>*/}
                            </Center>
                            <RigthSide>
                                {/*{level.generatedOrder && level.payed === false &&*/}
                                    {/*<p>waiting payment</p>*/}
                                    {/*}*/}
                                {/*{level.generatedOrder && level.payed === true &&*/}
                                    {/*<Rainbow onClick={() => retireReward(34)}>
                                        retire
                                    </Rainbow>*/}
                                {/*}*/}
                                {/*{level.generatedOrder === false &&*/}
                                    <>
                                        <Rainbow onClick={() => makeOrder(34)}>
                                            make order</Rainbow>
                                        <Cancel onClick={() => cancelOrder(34)}>
                                            cancel Plan
                                        </Cancel>
                                    </>
                                {/*}*/}
                                {/*{
                                    0 && <p>Order canceled</p>
                                }*/}

                            </RigthSide>
                            </LeftSide>
                                <ProgressBar>
                                    <ProgressBarPercent style={{ width: `80%` }}>
                                    </ProgressBarPercent>
                                        <span className='span1'>0%</span>
                                </ProgressBar>
                        </Section>
                        <Section key={1}>
                            <LeftSide>
                            <Center>
                                {/*<RoundedNum>*/}
                                    {/*<h2> {parseInt(level.level)}</h2>*/}
                                    <h2> 1</h2>
                                {/*</RoundedNum>*/}
                                <p> <span>$ </span>80</p>

                                {/*<ProgressBar>
                                    <ProgressBarPercent style={{ width: `${calculateRewardPerDay(level.level, level.timestamp) / (NFT_PRICES[level.level - 1]*1.50) * 100}%` }}>*/}
                            </Center>
                            <RigthSide>
                                {/*{level.generatedOrder && level.payed === false &&*/}
                                    {/*<p>waiting payment</p>*/}
                                    {/*}*/}
                                {/*{level.generatedOrder && level.payed === true &&*/}
                                    {/*<Rainbow onClick={() => retireReward(34)}>
                                        retire
                                    </Rainbow>*/}
                                {/*}*/}
                                {/*{level.generatedOrder === false &&*/}
                                    <>
                                        <Rainbow onClick={() => makeOrder(34)}>
                                            make order</Rainbow>
                                        <Cancel onClick={() => cancelOrder(34)}>
                                            cancel Plan
                                        </Cancel>
                                    </>
                                {/*}*/}
                                {/*{
                                    0 && <p>Order canceled</p>
                                }*/}

                            </RigthSide>
                            </LeftSide>
                                <ProgressBar>
                                    <ProgressBarPercent style={{ width: `80%` }}>
                                    </ProgressBarPercent>
                                        <span className='span1'>0%</span>
                                </ProgressBar>
                        </Section>
                        {/*//////////////////////////////////////////////////////////////////////*/}
                        <Section key={2}>
                            <LeftSide>
                            <Center>
                                {/*<RoundedNum>*/}
                                    {/*<h2> {parseInt(level.level)}</h2>*/}
                                    <h2> 2</h2>
                                {/*</RoundedNum>*/}
                                <p> <span>$ </span>80</p>

                                {/*<ProgressBar>
                                    <ProgressBarPercent style={{ width: `${calculateRewardPerDay(level.level, level.timestamp) / (NFT_PRICES[level.level - 1]*1.50) * 100}%` }}>*/}
                            </Center>
                            <RigthSide>
                                {/*{level.generatedOrder && level.payed === false &&*/}
                                    {/*<p>waiting payment</p>*/}
                                    {/*}*/}
                                {/*{level.generatedOrder && level.payed === true &&*/}
                                    {/*<Rainbow onClick={() => retireReward(34)}>
                                        retire
                                    </Rainbow>*/}
                                {/*}*/}
                                {/*{level.generatedOrder === false &&*/}
                                    <>
                                        <Rainbow onClick={() => makeOrder(34)}>
                                            make order</Rainbow>
                                        <Cancel onClick={() => cancelOrder(34)}>
                                            cancel Plan
                                        </Cancel>
                                    </>
                                {/*}*/}
                                {/*{
                                    0 && <p>Order canceled</p>
                                }*/}

                            </RigthSide>
                            </LeftSide>
                                <ProgressBar>
                                    <ProgressBarPercent style={{ width: `80%` }}>
                                    </ProgressBarPercent>
                                        <span className='span1'>0%</span>
                                </ProgressBar>
                        </Section>
                    {/*)
                })
                :
                <Section>
                    <h2>Please buy one NFT first </h2>
                </Section>
            }*/}

        </Status>
        <Footer />
        </>
    )
}

export default Plan