import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { NFT_PRICES } from '../const'
import {BiCollapse} from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import persona from '../assets/persona.png'
import grupo from '../assets/grupo.png'
import retiroefectivoAzul from '../assets/retiroefectivoAzul.png'
import mano from '../assets/mano.png'
import fama from '../assets/fama.png'
import NFT from '../assets/NFT.png'

const Home = ({ mode }) => {
    const Home = styled.div`
    display: flex;
    padding: 0 20px;
    flex-direction: column;
    height: 85vh;
    max-width: 1190px;
    margin: 0 auto;
    position: relative;
    `

    const UpperBody = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px,1fr));    
    width:97%;
    margin-left:3%;
    @media (max-width: 1072px) {
        grid-template-columns: repeat(2, minmax(250px,1fr)); 
    }
    @media (max-width: 532px) {
        grid-template-columns: repeat(1, minmax(250px,1fr));
        margin-left:6%;

    }

    `

    const FirstPart = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 0 20px;
    width: 100%;
    @media (max-width: 768px) {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px,1fr)); 
    }
  
    `

    const Tittle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    font-size: 20px;
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
    flex-direction:column;
    margin-bottom: 15%;
    `

    const SecondPart = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    //padding: 0 20px;
    //height:80%;
    width: 100%;
    `

    const BoxContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: initial;
    flex-direction: column;
    width: 90%;
    background: ${mode ? "transparent" : "linear-gradient(#bfbfc0,#b4b4b9) padding-box"};
    border: 2px solid #5b6eff;
    border-radius: 20px;
    margin-bottom: 5%;
    &:hover {
        transform: scale(1.01);
        transition: 0.3s;
    }

    `

    const MidBody = styled.div`
    margin-top: 20px;
    display: grid;
    justify-content: space-between;
    align-items: center;
    width:95%;
    position:relative;
    grid-template-columns: repeat(auto-fit, minmax(50%,1fr)); 
    margin-left:5%;
    @media (max-width: 768px) {
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin-left:0%;

    }
    `

    const BottomBody = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 20px;
   
    `

    const FooterBody = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 20px;
    height: 110px;
      @media (max-width: 768px) {
        flex-direction: column;

    }
    
    `

    const LevelBox = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding-left: 10px;
    
    `

    const ProgressBar = styled.div`
    display: flex;
    justify-content: initial;
    align-items: center;
    width: 85%;
    //height: 30%;
    //min-height: 20px;
    margin-left: 10px;
    //border: 1px solid white;
    //border-radius: 5px;
    padding: 4px 0;
    @media (max-width: 768px) {
        width: 80%;
    }
    `

    const ProgressBarPercent = styled.div`
    //display: flex;
    //justify-content: initial;
    //align-items: center;
    //width: 50%;
    //height: 100%;
    //min-height: 20px;
    //background: linear-gradient(to right, rgba(240, 159, 94, 1), rgba(87, 80, 245, 1), rgba(134, 230, 255, 1)) padding-box;
    //border-top: 1px solid white;
    //border-bottom: 1px solid white;
    //border-left: 1px solid white;
    `

    const BottomContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    align-items:center;

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
    display:flex;
    gap:5%;
        align-items:center;

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
    const BoxContentImg = styled.img`
    width: 10%;
    @media (max-width: 1072px) {
        width: 6%;

    }
    @media (max-width: 768px) {
        width:9%;
    }

    `;
    const BoxContentImg2 = styled.img`
    width: 10%;
   @media (max-width: 768px) {
        width:6%;
    }
    `;
    const TextBodyP = styled.p`
    font-size: 15px;
    margin-top: -5%;

    `;
    const TextBodyN = styled.p`
    font-size: 50px;
    color: #83DEFF;
    font-weight: 700;
 
    `;
    const BoxContentSell = styled.div`
    width:100%;
    display: flex;
    align-items:center;

    background: ${mode ? "transparent" : "linear-gradient(#bfbfc0,#b4b4b9) padding-box"};
    border: 2px solid #5b6eff;
    border-radius: 20px;
    padding: 10px 15px;
    @media (max-width: 768px) {
        padding: 10px 15px;

    }
    `;
    
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


                    {/*<FirstPart>*/}

                        <BoxContent>
                            <Tittle>
                                <BoxContentImg src={persona} alt="persona"/>
                                Account
                            </Tittle>
                            <TextBody>
                               <TextBodyN>{accountLevel}</TextBodyN>
                                <TextBodyP>Level</TextBodyP> 
                            </TextBody>
                        </BoxContent>
                        <BoxContent>
                            <Tittle>
                                <BoxContentImg src={grupo} alt="persona"/>
                                Team
                            </Tittle>
                            <TextBody>
                               <TextBodyN>{referalsCounter}</TextBodyN>
                                <TextBodyP>Count</TextBodyP> 
                            </TextBody>
                        </BoxContent>
                        <BoxContent>
                            <Tittle>
                                <BoxContentImg src={retiroefectivoAzul} alt="persona"/>
                                Balance
                            </Tittle>
                            <TextBody>
                               <TextBodyN>{totalBalance}</TextBodyN>
                                <TextBodyP>Total</TextBodyP> 
                            </TextBody>
                        </BoxContent>
                        <BoxContent>
                            <Tittle>
                                <BoxContentImg src={mano} alt="persona"/>
                                Investment
                            </Tittle>
                            <TextBody>
                               <TextBodyN>{investmentReward}</TextBodyN>
                                <TextBodyP>Reward</TextBodyP> 
                            </TextBody>
                        </BoxContent>
                       
                    {/*</FirstPart>*/}
                    {/*<SecondPart>*/}
                    {/*</SecondPart>*/}
                </UpperBody>
                {/* <div><h5>Reference cap</h5></div> */}
                <MidBody>
                        <BoxContent>
                            <LevelBox>
                                1 <ProgressBar>
                                    <ProgressBarPercent style={{ width: `${calculateBar(referalPlans[0]?.accountCap, 1)}%` }}>
                                    </ProgressBarPercent>
                                </ProgressBar>
                            </LevelBox>
                        </BoxContent>
                        <BoxContent>
                            <LevelBox>
                                2 <ProgressBar>
                                    <ProgressBarPercent style={{ width: `${calculateBar(referalPlans[1]?.accountCap, 2)}%` }}>
                                    </ProgressBarPercent>
                                </ProgressBar>
                            </LevelBox>
                        </BoxContent>
                        <BoxContent>
                            <LevelBox>
                                3 <ProgressBar>
                                    <ProgressBarPercent style={{ width: `${calculateBar(referalPlans[2]?.accountCap, 3)}%` }}>
                                    </ProgressBarPercent>
                                </ProgressBar>
                            </LevelBox>
                        </BoxContent>
                        <BoxContent>
                            <LevelBox>
                                4 <ProgressBar>
                                    <ProgressBarPercent style={{ width: `${calculateBar(referalPlans[3]?.accountCap, 4)}%` }}>
                                    </ProgressBarPercent>
                                </ProgressBar>
                            </LevelBox>
                        </BoxContent>
                        <BoxContent>
                            <LevelBox>
                                5 <ProgressBar>
                                    <ProgressBarPercent style={{ width: `${calculateBar(referalPlans[4]?.accountCap, 5)}%` }}>
                                    </ProgressBarPercent>
                                </ProgressBar>
                            </LevelBox>
                        </BoxContent>
                            <BoxContent>
                            <LevelBox>
                                6 <ProgressBar>
                                    <ProgressBarPercent style={{ width: `${calculateBar(referalPlans[5]?.accountCap, 6)}%` }}>
                                    </ProgressBarPercent>
                                </ProgressBar>
                            </LevelBox>
                        </BoxContent>
                        <BoxContent>
                            <LevelBox>
                                7 <ProgressBar>
                                    <ProgressBarPercent style={{ width: `${calculateBar(referalPlans[6]?.accountCap, 7)}%` }}>
                                    </ProgressBarPercent>
                                </ProgressBar>
                            </LevelBox>
                        </BoxContent>
                        <BoxContent>
                            <LevelBox>
                                8 <ProgressBar>
                                    <ProgressBarPercent style={{ width: `${calculateBar(referalPlans[7]?.accountCap, 8)}%` }}>
                                    </ProgressBarPercent>
                                </ProgressBar>
                            </LevelBox>
                        </BoxContent>
                        <BoxContent>
                            <LevelBox>
                                9 <ProgressBar>
                                    <ProgressBarPercent style={{ width: `${calculateBar(referalPlans[8]?.accountCap, 9)}%` }}>
                                    </ProgressBarPercent>
                                </ProgressBar>
                            </LevelBox>
                        </BoxContent>
                        <BoxContent>
                            <LevelBox>
                                10 <ProgressBar>
                                    <ProgressBarPercent style={{ width: `${calculateBar(referalPlans[9]?.accountCap, 10)}%` }}>

                                    </ProgressBarPercent>
                                </ProgressBar>
                            </LevelBox>
                        </BoxContent>
                </MidBody>
                {/* <div><h5>Global</h5></div> */}
                <FooterBody>
                    <FirstPart>
                        <BottomContent>
                            <BoxContentSell>
                                <BottomWrapper>
                                <BoxContentImg2 src={NFT} alt="nft"/>
                                NFT Selled 
                                </BottomWrapper>
                                {totalSupply}
                            </BoxContentSell>
                        </BottomContent>
                    </FirstPart>
                    <FirstPart>
                        <BottomContent>
                            <BoxContentSell>
                                <BottomWrapper>
                                <BoxContentImg2 src={fama} alt="fama"/>
                                Accounts: 
                                </BottomWrapper>
                                {allAccounts.length + 10}
                            </BoxContentSell>
                        </BottomContent>
                    </FirstPart>
                </FooterBody>
            </Home>
        </>
    )
}

export default Home