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

const Status = ({mode}) => {

    const Status = styled.div`
    gap: 20px;
    height: 70vh;
   
    overflow-y: auto;

    `

    const Section = styled.div`
    display: flex;
    width: 90%;
    height: 115px;
    align-items: center;
    background: ${mode ? "linear-gradient(#2b2b31,#2a2a30) padding-box" : "linear-gradient(#bfbfc0,#b4b4b9) padding-box"};
    box-shadow: 5px 2px 1px 1px ${mode ? "#fff" : "#00000080"};
    justify-content: space-between;
    margin: 8px auto;

    `

    const Rainbow = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 40px;
    border-radius: 5px;
    border: none;
    outline: none;
    background: linear-gradient( rgba(240, 159, 94, 1), rgba(87, 80, 245, 1), rgba(134, 230, 255, 1)) padding-box;
    color: white;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    @media (max-width: 768px) {
        width: 60px;
        height: 30px;
        font-size: 10px;
    }
    `

    const Cancel = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 40px;
    border-radius: 5px;
    border: none;
    outline: none;
    background: #0051ff;
    color: white;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    @media (max-width: 768px) {
        width: 60px;
        height: 30px;
        font-size: 10px;
    }
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
    border-radius: 10px;
    @media (max-width: 768px) {
        width: 80%;
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
    
    `

    const LeftSide = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 20%;
    height: 100%;

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
    width: 60%;
    height: 100%;
  
    `

    const Capdiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80%;
    font-size: 12px;
    font-weight: 600;
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
                            <LeftSide>
                                {level.status === true ?
                            <RoundedNum>
                                <h2>{parseInt(level.level)}</h2>
                            </RoundedNum>
                            :
                            <Roundedgrey>
                            <h2>{parseInt(level.level)}</h2>
                            </Roundedgrey>
                            }
                            </LeftSide>
                            <Center>
                                <Capdiv>
                            <p>balance: {level.balance} USD</p>          <p>withdraw: {level.retireCap} USD</p>
                                </Capdiv>
                                <ProgressBar>
                                    <ProgressBarPercent style={{ width: `${calculateBar(level.accountCap, level.level)}%` }}>
                                        <p> {calculateBar(level.accountCap, level.level)}%</p>
                                    </ProgressBarPercent>
                                </ProgressBar>
                            </Center>
                            <RigthSide>
                                {accountLevel >= index + 1 ?
                                <>
                                <Cancel onClick={() => handleOpenModal(level.level)}>
                                    Renew
                                </Cancel>     
                                <Rainbow onClick={() => handleOpenWithdraw(level.level)}>
                                    Withdraw
                                </Rainbow>

                                </>
                                :
                                <Rainbow onClick={() => navigate('/buy')}
                                >Buy NFT
                                </Rainbow>
                                }
                            </RigthSide>
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