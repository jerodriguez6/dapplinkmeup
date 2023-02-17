import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { NFT_PRICES } from '../const'
import { ethers } from 'ethers'
import Swal from 'sweetalert2'
import nftVideo1 from '../assets/01_720.mp4'
import nftVideo2 from '../assets/02_720.mp4'
import nftVideo3 from '../assets/03_720.mp4'
import nftVideo4 from '../assets/04_720.mp4'
import nftVideo5 from '../assets/05_720.mp4'
import nftVideo6 from '../assets/06_720.mp4'
import nftVideo7 from '../assets/07_720.mp4'
import nftVideo8 from '../assets/08_720.mp4'
import nftVideo9 from '../assets/09_720.mp4'
import nftVideo10 from '../assets/10_720.mp4'
import Loading from '../components/Loading'
import { useDispatch } from 'react-redux'
import { connectWallet } from '../redux/web3Actions'
import puntasflechaizquierda from '../assets/puntasflechaizquierda.png'
import priceIcon from '../assets/price.png'
import lowIcon from '../assets/low.png'
import coinIcon from '../assets/coin.png'
import Footer from '../components/Footer'


const Buy = ({ mode }) => {
    const Buy = styled.div`
    display: flex;
    padding: 0 20px;
    gap: 20px;
    height: 90vh;
    //overflow: auto;
    justify-content: center;
    align-items: center;
    margin-bottom:4%;
    @media (max-width: 768px) {
        flex-direction: column;
        height: 140vh;
    }
    @media (max-width: 500px) {
    }
    `

    const LeftPart = styled.div`
    display: flex;
    width: 44%;
    height: 100%;
    margin-top: -5%;

    justify-content: center;
    align-items: center;
    flex-direction: column;
    h2{
        color:#83DEFF;
    }
    @media (max-width: 768px) {
        width: 90%;
        height: 300px;
        margin-top: 40%;
        h2 {
            margin-top:5%;
        }
    }
    @media (max-width: 640px) {
        margin-top: 57%;
     
    }
    @media (max-width: 500px) {
        margin-top: 70%;
        
        h2 {
            font-size:25px;
        }
    }
    @media (max-width: 430px) {
        margin-top: 85%;
     
    }
    @media (max-width: 370px) {
        margin-top: 100%;
     
    }
    `

    const Card = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
    border-radius: 10px;
    overflow: hidden;
    @media (max-width: 768px) {
        height: 100%;
    }
    `

    const RightPart = styled.div`
    display: flex;
    width: 40%;
    height: 100%;
    
    flex-direction: column;
    gap: 20px;
    @media (max-width: 768px) {
        width: 90%;
        
    }
    `

    const Section = styled.div`
    display: flex;
    width: 100%;
    //height: 30%;
    align-items: center;
    justify-content: space-around;
    flex-direction:column;
    background: ${mode ? "transparent" : "linear-gradient(#59595c,#414145) padding-box"};
    //flex-direction: column;
    border:2px solid #5b6eff;
    border-radius: 20px;
    //box-shadow: 5px 2px 1px 1px ${mode ? "#fff" : "#00000080"};
    `
    const Section2 = styled.div`
    display: flex;
    width: 100%;
    flex-direction:column;
    border:2px solid #5b6eff;
    border-radius: 20px;
    select {
        border-radius: 10px;
        border: none;
        outline: none;
        background: ${mode ? 'transparent' : "#2c2c2d"};
        color: #83DEFF;
        font-size: 45px;
        font-weight: 900;
        cursor: pointer;
        text-align: center;
    }
    select option{
        width: 1%;
        font-size: 20px;
        background: #0A0A26;
        color: white;
        font-weight: 600;
        border:2px solid #5b6eff;
        text-aling:center;
    }
    img{
        width:4%;
        padding-top:20px;
        position:relative;
        margin-left:5%;
    }
    `

    const PurpleButton = styled.button`
        width: 100%;
        border-radius: 10px;
        border: none;
        outline: none;
        background: linear-gradient( to right, #A14ADA, #F581FC);
        color: white;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        margin-button:4%;
          p{
            color: white;
            font-size: 20px;
            font-weight: 700;

        }
    `

        const OrangeButton = styled.button`
        width: 100%;
        height: 50px;
        border-radius: 10px;
        border: none;
        outline: none;
        background: linear-gradient( to right, #FFA859, #FFE283);
        cursor: pointer;
        p{
            color: white;
            font-size: 20px;
            font-weight: 700;

        }
        `
        const BlueButton = styled.button`
        width: 100%;
        height: 50px;
        border-radius: 10px;
        border: none;
        outline: none;
        background: linear-gradient( to right, #5A6CFF, #84E0FF);
        color: white;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
          p{
            color: white;
            font-size: 20px;
            font-weight: 700;

        }
        `

    const RoundedNum = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${mode ? "linear-gradient(#1f1f21,#141416) padding-box,linear-gradient(to right, rgba(240, 159, 94, 1), rgba(87, 80, 245, 1), rgba(134, 230, 255, 1)) border-box;" : "linear-gradient(#e8e8ee,#c4c4ce) padding-box,linear-gradient(to right, rgba(240, 159, 94, 1), rgba(87, 80, 245, 1), rgba(134, 230, 255, 1)) border-box;"};
    border-radius: 50%;
    border: 8px solid transparent;
    width: 100px;
    height: 100px;
    font-size: 4rem;
    @media (max-width: 768px) {
        width: 80px;
        height: 80px;
        font-size: 3rem;
    }
    `

    const Tittle = styled.div`
    display: flex;
    justify-content: initial;
    align-items: center;
    background: ${mode ? "linear-gradient(#0f0f10,#080808) padding-box" : "linear-gradient(#59595c,#414145) padding-box"};
    font-weight: 600;
    color: ${mode ? "white" : "black"};
    border-radius: 5px 5px 0 0;
    width: 100%;
    margin-bottom: 15px;
    @media (max-width: 768px) {
        font-size: 1.5rem;
    }
    `

    const Information = styled.div`
    display: flex;
    flex-direction: column;
    align-items: initial;
    align-items: center;
    background: ${mode ? "transparent" : "linear-gradient(#333335,#2f2f32)"};
    border-radius: 10px;
    width: 24%;
    height: 100px;
    min-width: 100px;
    color: #fff;
    h2{
        font-size: 35px;
        color: #83DEFF;
        font-weight: 700;
    }
    p{
        margin-top:-15%;
        font-size: 15px;

    }
    `
    const InformationTotal = styled.div`
    display: flex;
    flex-direction: column;
    align-items: initial;
    align-items: center;
    background: ${mode ? "transparent" : "linear-gradient(#333335,#2f2f32)"};
    border-radius: 10px;
    width: 24%;
    height: 100px;
    min-width: 100px;
    color: #fff;
    h2{
        font-size: 50px;
        color: #83DEFF;
        font-weight: 900;
    }
    p{
        margin-top:-10%;
        font-size: 15px;

    }
    `
    const SectionDiv1 = styled.div`
    width:100%;
    display: flex;
    justify-content: center;
    margin-top:-12%;
    align-items:baseline;
    padding:10%;
    gap:5%;
    p{
        font-size: 25px;
    }

    `
    const Sectionvid2 = styled.div`
    width:100%;
    display:flex;
    gap: 5%;
     @media (max-width: 500px) {
        flex-direction:column;
        gap: 20px;
    }
    
    `
    const SectionPrice = styled.div`
    width:100%;
    display:flex;
    justify-content: space-between;
    padding: 5% 9%;
    img{
        width:10%;
    }
    p{
        <font-size:20></font-size:20>px;
    }
    
    `
    const SectionTotal = styled.div`
    width:100%;
    display:flex;
    justify-content: space-between;
    padding: 5% 9%;
    img{
        width:10%;
    }
    p{
        font-size:26px;
    }
    
    `
    const FoterDiv = styled.div`
    @media (max-width: 768px) {
       display:none;
   }
    
    `
    const FoterDiv2 = styled.div`
    @media (min-width: 768px) {
       display:none;
   }
    
    `

    const { connected, account, tokenContract, paymentContract, referalPerLevel, referalPlans, loading } = useSelector(state => state.web3)
    //console.log("referalPlans ", referalPlans)

    const dispatch = useDispatch()

    const [selectedLevel, setSelectedLevel] = useState(1)
    const [price, setPrice] = useState(0)
    const [allowance, setAllowance] = useState(0)
    const [isLoading, setIsLoading] = useState(false)


    //approve payment contract to spend token
    const approve = async () => {
        try {
            setIsLoading(true)
            const approveAmount = 24500
            const tx = await tokenContract.approve(paymentContract.address, ethers.utils.parseEther(approveAmount.toString()))
            await tx.wait()
            setAllowance(approveAmount)
            setIsLoading(false)
            
        } catch (e) {
            setIsLoading(false)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'e.reason',
            })
        }
    }

    useEffect(() => {
        setPrice(NFT_PRICES[selectedLevel - 1])
    }, [selectedLevel])



    const buyNFT = async () => {
        try {
            setIsLoading(true)
            //console.log("buying...")
            //console.log("selected level", selectedLevel)
            let referal = "";
            if (selectedLevel === 1) {
                if (localStorage.getItem("address") === null) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        message: 'Please enter with your referal address',
                    })
                    setIsLoading(false)
                    return;
                }

                referal = window.localStorage.getItem("address")
            }
            else {
                referal = referalPlans[0].referer;
            }

            //console.log("referal", referal)

            const tx = await paymentContract.buyNft(account.address, referal, selectedLevel.toString())
            await tx.wait()
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'NFT bought',
            })
            dispatch(connectWallet())
            setIsLoading(false)

        } catch (e) {
            setIsLoading(false)
            //console.log(e)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: e.reason,
            })
        }
    }


const checkAllowance = async () => {
    try{
    const allowance = await tokenContract.allowance(account.address, paymentContract.address)

    const approved = ethers.utils.formatEther(allowance.toString())
    setAllowance(parseInt(approved))
    //console.log("allowance", parseFloat(approved))
    //console.log("price", price * 1.05)
    }catch(e){
        console.log(e)
    }
}

useEffect(() => {
    if (connected) { checkAllowance() }
}, [account, connected])

const videos = [
    nftVideo1,
    nftVideo2,
    nftVideo3,
    nftVideo4,
    nftVideo5,
    nftVideo6,
    nftVideo7,
    nftVideo8,
    nftVideo9,
    nftVideo10,
]



return (
<>
{loading && <Loading/>}
{isLoading && <Loading/>}
    <Buy>

        <LeftPart>
            <h2>NFT LEVEL {selectedLevel}
            </h2>
            <Card>
                <video height="100%" autoPlay loop muted>
                    <source src={videos[selectedLevel - 1]} type="video/mp4" />
                </video>
            </Card>
        </LeftPart>
        <RightPart>
            <Section2>
                <img src={puntasflechaizquierda} alt="persona" />
                <SectionDiv1>

                <p>NFT Level</p>
                <div>
                    <select
                        value={selectedLevel}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                        >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>

                    </select>
                </div>

                </SectionDiv1>
                {/*<RoundedNum>
                    {selectedLevel}
                </RoundedNum>*/}
            </Section2>
            {/*<Section>*/}
                <Sectionvid2>
                    <Section>
                        <SectionPrice>
                            <img src={priceIcon} alt="price" />
                            <p>Price</p>
                        </SectionPrice>
                        <Information>
                           <h2>{price}</h2>
                           <p>USD</p>
                        </Information>
                    </Section>
                    <Section>
                    <SectionPrice>
                            <img src={lowIcon} alt="lowIcon" />
                            <p>Fee</p>
                        </SectionPrice>
                        <Information>
                           <h2>{price * 0.05}</h2>
                           <p>USD</p>
                        </Information>
                    </Section>

                </Sectionvid2>
                <Section>
                <SectionTotal>
                    <img src={coinIcon} alt="coinIcon" />
                    <p>Total</p>
                    <div></div>
                </SectionTotal>
                    <InformationTotal>
                        <h2>{price * 1.05}</h2>
                        <p>USD</p>
                    </InformationTotal>

                </Section>

            {/*</Section>*/}
            {/*<Section>*/}
                {allowance >= price * 1.05 ? (
                    <PurpleButton onClick={buyNFT}>
                        <p>Buy</p> 
                    </PurpleButton>
                ) : (
                    <OrangeButton onClick={() => approve()}>
                        <p>Aprove</p> 
                    </OrangeButton>
                )}
            {/*</Section>*/}
            <FoterDiv2>
                <Footer />

            </FoterDiv2>
        </RightPart>

    </Buy>
    <FoterDiv>
        <Footer />

    </FoterDiv>
</>
)
}

export default Buy