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

const Buy = ({ mode }) => {
    const Buy = styled.div`
    display: flex;
    padding: 0 20px;
    gap: 20px;
    height: 70vh;
    overflow: auto;
    justify-content: center;
    align-items: center;
    @media (max-width: 768px) {
        flex-direction: column;
    }
    `

    const LeftPart = styled.div`
    display: flex;
    width: 30%;
    height: 100%;
   
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @media (max-width: 768px) {
        width: 90%;
        height: 300px;
        h2 {
            display: none;
        }
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
    height: 30%;
    align-items: center;
    justify-content: space-around;
    background: ${mode ? "linear-gradient(#1c1c1e,#131314) padding-box" : "linear-gradient(#59595c,#414145) padding-box"};
    //flex-direction: column;
    border-radius: 10px;
    box-shadow: 5px 2px 1px 1px ${mode ? "#fff" : "#00000080"};
    select {
        width: 180px;
        height: 50px;
        border-radius: 10px;
        border: none;
        outline: none;
        background: ${mode ? "#060607" : "#2c2c2d"};
        color: white;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        font-size: 20px;
    }
    `

    const RainbowButton = styled.button`
        width: 180px;
        height: 50px;
        border-radius: 10px;
        border: none;
        outline: none;
        background: linear-gradient( rgba(240, 159, 94, 1), rgba(87, 80, 245, 1), rgba(134, 230, 255, 1)) padding-box;
        color: white;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
    `

        const GreenButton = styled.button`
        width: 180px;
        height: 50px;
        border-radius: 10px;
        border: none;
        outline: none;
        background: linear-gradient( #5ef065, #249c4a, #168223) padding-box;
        color: white;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
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
    background: ${mode ? "linear-gradient(#0d0d10,#040405)}" : "linear-gradient(#333335,#2f2f32)"};
    border-radius: 10px;
    font-size: 20px;
    width: 24%;
    height: 100px;
    min-width: 100px;
    color: #fff;
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
            <Section>
                <div>
                    <select
                        value={selectedLevel}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                    >
                        <option value={1}>Level 1</option>
                        <option value={2}>Level 2</option>
                        <option value={3}>Level 3</option>
                        <option value={4}>Level 4</option>
                        <option value={5}>Level 5</option>
                        <option value={6}>Level 6</option>
                        <option value={7}>Level 7</option>
                        <option value={8}>Level 8</option>
                        <option value={9}>Level 9</option>
                        <option value={10}>Level 10</option>

                    </select>
                </div>

                <RoundedNum>
                    {selectedLevel}
                </RoundedNum>
            </Section>
            <Section>

                <Information>
                    <Tittle>
                        Price:
                    </Tittle>
                    {price} USD
                </Information>
                <Information>
                    <Tittle>
                        Fee:
                    </Tittle>
                    {price * 0.05} USD
                </Information>
                <Information>
                    <Tittle>
                        Total:
                    </Tittle>
                    {price * 1.05} USD
                </Information>
            </Section>
            <Section>
                {allowance >= price * 1.05 ? (
                    <RainbowButton onClick={buyNFT}>
                        Buy
                    </RainbowButton>
                ) : (
                    <GreenButton onClick={() => approve()}>
                        Approve
                    </GreenButton>
                )}
            </Section>
        </RightPart>
    </Buy>
</>
)
}

export default Buy