import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { NFT_PRICES } from '../const'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { ethers } from 'ethers'
import ReinvestModal from '../components/ReinvestModal'
import WithdrawModal from '../components/WithdrawModal'
import { connectWallet } from '../redux/web3Actions'
import retiroefectivoAzul from '../assets/retiroefectivoAzul.png'
import mano from '../assets/mano.png'
const Status = ({mode}) => {

    const Status = styled.div`
    gap: 20px;
    height: 70vh;
    width: 90%;
    display: grid;
    grid-template-columns: repeat(2, minmax(50%,1fr)); 
    margin-left:6%;
    @media (max-width: 768px) {
        grid-template-columns: repeat(1, minmax(50%,1fr)); 

    }
    `

    const Section = styled.div`
    display: flex;
    width: 90%;
    //height: 115px;
    align-items: center;
    background: ${mode ? "transparent" : "linear-gradient(#bfbfc0,#b4b4b9) padding-box"};
    justify-content: space-between;
    flex-direction:column;
    //margin: 8px auto;
    border: 2px solid #5b6eff;
    border-radius: 20px;
    padding:2% 4%;

    `

    const Rainbow = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    //height: 40px;
    border-radius: 20px;
    border: none;
    outline: none;
    background: linear-gradient(to right ,#5B6EFF,#83DEFF);
    color: white;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    padding:2px;

    //@media (max-width: 768px) {
    //    width: 60px;
    //    height: 30px;
    //    font-size: 10px;
    //}
    `

    const Cancel = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    //height: 40px;
    border-radius: 20px;
    border: none;
    outline: none;
    background: linear-gradient(to right ,#5B6EFF,#83DEFF);
    color: white;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    padding:2px;
    //@media (max-width: 768px) {
    //    width: 60px;
    //    height: 30px;
    //    font-size: 10px;
    //}
    `

    const ProgressBar = styled.div`
    display: flex;
    justify-content: initial;
    align-items: center;
    width: 90%;
    height: 20%;
    min-height: 20px;
    margin-left: 10px;
    border: 1px solid white;
    border-radius: 10px;
    justify-content:end;
    padding-right:7%;
    //margin-right: 10%;
    @media (max-width: 768px) {
        width: 90%;
    }
    `

    const ProgressBarPercent = styled.div`
    display: flex;
    justify-content: initial;
    align-items: center;
    border-radius: 10px;
    height: 100%;
    min-height: 20px;
    background: linear-gradient(to right, rgba(240, 159, 94, 1), rgba(87, 80, 245, 1), rgba(134, 230, 255, 1)) padding-box;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    p{
        position:relative;
    
    }
    
    `

    const LeftSide = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    //width: 20%;
    //height: 100%;
    //margin-left:5%;
    h2{
        color:#7AC2FF;
        font-size:50px;
        font-weight:800;
    }
    `

    const RigthSide = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 20%;
    height: 100%;

   
    `

    const Center = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    //width: 60%;
    height: 100%;
  
    `

    const Capdiv = styled.div`
    display: flex;
    align-items: center;
    gap:5%;
    width: 80%;
    font-size: 12px;
    font-weight: 600;
    img{
        width:10%;
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

    const Roundedgrey = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${mode? "linear-gradient(#1f1f21,#141416) padding-box,linear-gradient(to right, #565656, #6f6f6f, #919191) border-box;" : "linear-gradient(#e8e8ee,#c4c4ce) padding-box,linear-gradient(to right, #565656), #6f6f6f, #919191) border-box;"};
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
    const GetBalanceWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    input {
        width: 50%;
        height: 30px;
        border-radius: 15px;
    }
    `
    const SectionFirts = styled.div`
    width: 90%;
    display: flex;
    justify-content: space-between;

    
    `
    const SectionSecond = styled.div`
    width: 70%;
    display: flex;

    
    `

    const navigate = useNavigate()

    const { connected, referalPlans, paymentContract, account , accountLevel } = useSelector(state => state.web3)
    console.log("referalPlans", referalPlans)
    const dispatch = useDispatch()

    const [openWithdraw, setOpenWithdraw] = useState(false)

    const calculateBar = (balance, level) => {
        const total = (NFT_PRICES[level - 1] * 1.5)
        const bar = (balance / total) * 100
        if(bar > 0) {
        return bar.toFixed(2)
        } else {
            return 0
        }
    }



    const renew = async(level, internal ) => {
        try{    
            const tx = await paymentContract.reinvest(account.address, level, internal)
            await tx.wait()
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Renew successful',
                showConfirmButton: false,
                timer: 1500
            })
            dispatch(connectWallet())
            setOpenWithdraw(false)
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    const [openModal, setOpenModal] = useState(false)
    const [chooseLevel, setChooseLevel] = useState(0)


    const handleOpenModal = (level) => {
        //console.log("level-", level)
        setChooseLevel(level)
        setOpenModal(true)
    }

    const handleOpenWithdraw = (level) => {
        //console.log("level-", level)
        setChooseLevel(level)
        setOpenWithdraw(true)
    }




    return (
        <>
        {openModal && <ReinvestModal openModal={openModal} setOpenModal={setOpenModal} renew={renew} level={chooseLevel} />}
        {openWithdraw && <WithdrawModal openWithdraw={openWithdraw} setOpenWithdraw={setOpenWithdraw}  level={chooseLevel} />}
        <Status>
            {connected ?
                referalPlans.map((level, index) => {
                    return (
                        <Section key={index}>
                            <SectionFirts>
                            <SectionSecond>

                            <LeftSide>
                                <h2>{index +1}</h2>
                            
                            </LeftSide>
                            <Center>
                                <Capdiv>
                                    <img src={retiroefectivoAzul} alt="" />
                                    <p>balance: {level.balance} USD</p>          
                                </Capdiv>
                                <Capdiv>
                                    <img src={mano} alt="" />
                                    <p>withdraw: {level.retireCap} USD</p>
                                </Capdiv>
                               
                            </Center>
                            </SectionSecond>
                            <RigthSide>
                                {/*{accountLevel >= index + 1 ?*/}
                                <>
                                <Cancel onClick={() => handleOpenModal(level.level)}>
                                    Renew
                                </Cancel>     
                                <Rainbow onClick={() => handleOpenWithdraw(level.level)}>
                                    Withdraw
                                </Rainbow>

                                </>
                                {/*:*/}
                                {/*<Rainbow onClick={() => navigate('/buy')}
                                >Buy NFT
                                </Rainbow>*/}
                                {/*}*/}
                            </RigthSide>
                        </SectionFirts>
                            <ProgressBar>
                                <ProgressBarPercent style={{ width: `${calculateBar(level.accountCap, level.level)}%` }}>
                                    <p> {calculateBar(level.accountCap, level.level)}%</p>
                                </ProgressBarPercent>
                            </ProgressBar>
                        </Section>
                    )
                })
                :
                <h2>connect to see your status</h2>
            }

        </Status>
        </>
    )
}

export default Status