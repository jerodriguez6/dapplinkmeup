import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { NFT_PRICES } from '../const'
import {BiCollapse} from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

const Home = ({ mode }) => {
    const Home = styled.div`
    display: flex;
    padding: 0 20px;
    flex-direction: column;
    height: 70vh;
    max-width: 1190px;
    margin: 0 auto;
    position: relative;
    `

    const UpperBody = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height:40%;
    
    width: 100%;
    `

    const FirstPart = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 0 20px;
    height:80%;
    width: 40%;
    min-width: 200px;
    `

    const Tittle = styled.div`
    display: flex;
    justify-content:initial;
    align-items: center;
    
    height: 30%;
    min-height: 20px;
    padding-left: 10px;
    background: ${mode ? "linear-gradient(#1c1c1e,#131314) padding-box" : "linear-gradient(#59595c,#414145) padding-box"};
    font-weight: 600;
    color: #fff;
    border-radius: 5px 5px 0 0;
    @media (max-width: 768px) {
        font-size: 12px;
    }
    `

    const TextBody = styled.div`
    display: flex;
    justify-content:center;
    align-items: center;
    width: 100%;
    height: 70%;
    min-height: 30px;
    padding-left: 10px;
    min-height: 40px;
    `

    const SecondPart = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height:80%;
    width: 60%;
    `

    const BoxContent = styled.div`
    display: flex;
    //justify-content: center;
    align-items: initial;
    flex-direction: column;
    width: 90%;
    height: 40%;
    min-height: 40px;
    background: ${mode ? "linear-gradient(#2b2b31,#2a2a30) padding-box" : "linear-gradient(#bfbfc0,#b4b4b9) padding-box"};
    border-radius: 5px;
    margin: 5px 0;
    min-height: 30px;
    box-shadow: 5px 2px 1px 1px ${mode ? "#fff" : "#00000080"};
    &:hover {
        transform: scale(1.01);
        transition: 0.3s;
    }
    `

    const MidBody = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 20px;
    height: 210px;
    
    `

    const BottomBody = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 20px;
    height: 110px;
   
    `

    const FooterBody = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 20px;
    height: 110px;
    
    `

    const LevelBox = styled.div`
    display: flex;
    justify-content: initial;
    align-items: center;
    width: 100%;
    padding-left: 10px;
    `

    const ProgressBar = styled.div`
    display: flex;
    justify-content: initial;
    align-items: center;
    width: 85%;
    height: 30%;
    min-height: 20px;
    margin-left: 10px;
    border: 1px solid white;
    border-radius: 5px;
    padding: 4px 0;
    @media (max-width: 768px) {
        width: 80%;
    }
    `

    const ProgressBarPercent = styled.div`
    display: flex;
    justify-content: initial;
    align-items: center;
    width: 50%;
    height: 100%;
    min-height: 20px;
    background: linear-gradient(to right, rgba(240, 159, 94, 1), rgba(87, 80, 245, 1), rgba(134, 230, 255, 1)) padding-box;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    border-left: 1px solid white;
    `

    const BottomContent = styled.div`
    display: flex;
    //justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 90%;
    height: 40%;
    min-height: 30px;
    border-radius: 5px;
    margin: 5px 0;
    &:hover {
    transform: scale(1.01);
    transition: 0.3s;
    font-weight: 800;
    }
    `

    const BottomWrapper = styled.div`
    padding: 0 20px;
    width: 100%;
    height: 100%;
    min-width: 200px;
    `

    const PartnerBlob = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 50px;
    left: 30px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: linear-gradient(to right, rgba(240, 159, 94, 1), rgba(87, 80, 245, 1), rgba(134, 230, 255, 1)) padding-box;
    z-index: 999;
    cursor: pointer;
    `

    const { connected, accountLevel, referalPlans, investmentPlans, totalSupply, allAccounts, referalsCounter, account } = useSelector(state => state.web3)

    const navigate = useNavigate()

    const { youArePartner } = useSelector(state => state.partner)

    const [totalBalance, setTotalBalance] = useState(0)
    const [investmentReward, setInvestmentReward] = useState(0)
    const [frontAddress, setFrontAddress] = useState('')


    const calculateBar = (balance, level) => {
        const total = (NFT_PRICES[level - 1] * 1.5)
        const bar = (balance / total) * 100
        return bar.toFixed(2)
    }

    const handlePartner = () => {
        navigate('/partner')
    }


    useEffect(() => {
        if (connected) {
            if (referalPlans.length === 0) {
                setTotalBalance(0)
            } else {
                let total = 0
                referalPlans.forEach(plan => {
                    total += plan.balance
                })
                setTotalBalance(total)
            }

        }
    }, [referalPlans])

    return (
        <>
        {youArePartner &&
            <PartnerBlob onClick={handlePartner}>
                <BiCollapse size={30}  />
                partners
            </PartnerBlob>
        }

            <Home>
                {/* <div><h5>Details</h5></div> */}

                <UpperBody>


                    <FirstPart>
                        <BoxContent>
                            <Tittle>
                                ACCOUNT
                            </Tittle>
                            <TextBody>
                                Level: {accountLevel}
                            </TextBody>
                        </BoxContent>
                        <BoxContent>
                            <Tittle>
                                TEAM
                            </Tittle>
                            <TextBody>
                                Count {referalsCounter}
                            </TextBody>
                        </BoxContent>
                    </FirstPart>
                    <SecondPart>
                        <BoxContent>
                            <Tittle>
                                BALANCE
                            </Tittle>
                            <TextBody>
                                Total: {totalBalance}
                            </TextBody>
                        </BoxContent>
                        <BoxContent>
                            <Tittle>
                                INVESTMENT
                            </Tittle>
                            <TextBody>
                                Reward : {investmentReward}
                            </TextBody>
                        </BoxContent>
                    </SecondPart>
                </UpperBody>
                {/* <div><h5>Reference cap</h5></div> */}
                <MidBody>
                    <FirstPart>
                        <BoxContent>
                            <LevelBox>
                                1: <ProgressBar>
                                    <ProgressBarPercent style={{ width: `${calculateBar(referalPlans[0]?.accountCap, 1)}%` }}>
                                    </ProgressBarPercent>
                                </ProgressBar>
                            </LevelBox>
                        </BoxContent>
                        <BoxContent>
                            <LevelBox>
                                2: <ProgressBar>
                                    <ProgressBarPercent style={{ width: `${calculateBar(referalPlans[1]?.accountCap, 2)}%` }}>
                                    </ProgressBarPercent>
                                </ProgressBar>
                            </LevelBox>
                        </BoxContent>
                        <BoxContent>
                            <LevelBox>
                                3: <ProgressBar>
                                    <ProgressBarPercent style={{ width: `${calculateBar(referalPlans[2]?.accountCap, 3)}%` }}>
                                    </ProgressBarPercent>
                                </ProgressBar>
                            </LevelBox>
                        </BoxContent>
                        <BoxContent>
                            <LevelBox>
                                4: <ProgressBar>
                                    <ProgressBarPercent style={{ width: `${calculateBar(referalPlans[3]?.accountCap, 4)}%` }}>
                                    </ProgressBarPercent>
                                </ProgressBar>
                            </LevelBox>
                        </BoxContent>
                        <BoxContent>
                            <LevelBox>
                                5: <ProgressBar>
                                    <ProgressBarPercent style={{ width: `${calculateBar(referalPlans[4]?.accountCap, 5)}%` }}>
                                    </ProgressBarPercent>
                                </ProgressBar>
                            </LevelBox>
                        </BoxContent>
                    </FirstPart>

                    <FirstPart>
                        <BoxContent>
                            <LevelBox>
                                6: <ProgressBar>
                                    <ProgressBarPercent style={{ width: `${calculateBar(referalPlans[5]?.accountCap, 6)}%` }}>
                                    </ProgressBarPercent>
                                </ProgressBar>
                            </LevelBox>
                        </BoxContent>
                        <BoxContent>
                            <LevelBox>
                                7: <ProgressBar>
                                    <ProgressBarPercent style={{ width: `${calculateBar(referalPlans[6]?.accountCap, 7)}%` }}>
                                    </ProgressBarPercent>
                                </ProgressBar>
                            </LevelBox>
                        </BoxContent>
                        <BoxContent>
                            <LevelBox>
                                8: <ProgressBar>
                                    <ProgressBarPercent style={{ width: `${calculateBar(referalPlans[7]?.accountCap, 8)}%` }}>
                                    </ProgressBarPercent>
                                </ProgressBar>
                            </LevelBox>
                        </BoxContent>
                        <BoxContent>
                            <LevelBox>
                                9: <ProgressBar>
                                    <ProgressBarPercent style={{ width: `${calculateBar(referalPlans[8]?.accountCap, 9)}%` }}>
                                    </ProgressBarPercent>
                                </ProgressBar>
                            </LevelBox>
                        </BoxContent>
                        <BoxContent>
                            <LevelBox>
                                10: <ProgressBar>
                                    <ProgressBarPercent style={{ width: `${calculateBar(referalPlans[9]?.accountCap, 10)}%` }}>

                                    </ProgressBarPercent>
                                </ProgressBar>
                            </LevelBox>
                        </BoxContent>
                    </FirstPart>
                </MidBody>
                {/* <div><h5>Global</h5></div> */}
                <FooterBody>
                    <FirstPart>
                        <BottomContent>
                            <BoxContent>
                                <BottomWrapper>
                                    NFT SELLED: {totalSupply}
                                </BottomWrapper>
                            </BoxContent>
                        </BottomContent>
                    </FirstPart>
                    <FirstPart>
                        <BottomContent>
                            <BoxContent>
                                <BottomWrapper>
                                    Accounts: {allAccounts.length + 10}
                                </BottomWrapper>
                            </BoxContent>
                        </BottomContent>
                    </FirstPart>
                </FooterBody>
            </Home>
        </>
    )
}

export default Home