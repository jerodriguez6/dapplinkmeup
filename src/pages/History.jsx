import React, { useState } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { ethers } from 'ethers'
const History = () => {

    const History = styled.div`
    gap: 20px;
    height: 70vh;

    overflow-y: auto;
    `

    const Section = styled.div`
    display: flex;
    width: 90%;
    height: 65px;
    align-items: center;

    justify-content: space-around;
    margin: 5px auto;

    `

    const {paymentContract, referalPerLevel, account} = useSelector(state => state.web3)


    const getRewardHistory = async () => {
        try{
            let rewards = []
        const rew = await paymentContract.getMyRewardHistory(account.address)
        //console.log("rew", rew)
        rew.map((rew, index) => {
            if(rew.amount > 0){
            rewards.push({
                amount : parseFloat(ethers.utils.formatEther(rew.amount)),
                date : date(parseInt(rew.date)),
                level : parseInt(rew.level)
            })
        }
        })
        setRewardHistory(rewards)

        } catch (e) {
            console.log(e)
        }
    }

    const getWithdrawHistory = async () => {
        try{
            let withdraws = []
        const withd = await paymentContract.getMyRetireHistory(account.adress)
        withd.map((withd, index) => {
            withdraws.push({
                amount : parseFloat(ethers.utils.formatEther(withd.amount)),
                date : date(parseInt(withd.date)),
                level : parseInt(withd.level)
            })
        })
        setWithdrawHistory(withdraws)
   
        } catch (e) {
            console.log(e)
        }
    }


    const [withdrawHistory, setWithdrawHistory] = useState([])
    const [rewardHistory, setRewardHistory] = useState([])
    const [showTable, setShowTable] = useState(2)

    const date = (timestamp) => {
        const date = new Date(timestamp * 1000)
        return date.toLocaleDateString()
    }

    useEffect(() => {
        if(paymentContract) {
            getWithdrawHistory()
            getRewardHistory()
        }
    }, [paymentContract, account, showTable])

    //console.log("withdrawHistory", withdrawHistory)
    //console.log("rewardHistory", rewardHistory)
    return (
        <>
            <Section>
                <div>
                    <select onChange={(e) => setShowTable(e.target.value)}
                        value={showTable}>
                        <option value={1}>Withdraw History</option>
                        <option value={2}>Reward History</option>

                    </select>
                </div>
            </Section>
            <History>

             {showTable ==1 ? (

                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Level</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    withdrawHistory.map((withdraw, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{date(withdraw.date)}</td>
                                                <td>{ethers.utils.formatEther(withdraw.amount)}</td>
                                                <td>{parseInt(withdraw.level)}</td>
                                            </tr>
                                        )
                                    }
                                    )
                                }
                            </tbody>
                        </table>
                    ) 
                    : 
                    (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Level</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rewardHistory.length > 0 &&
                                    rewardHistory.map((reward, index) => (
                                            <tr key={index}>
                                                <td>{reward.date}</td>
                                                <td>{reward.amount} USD</td>
                                                <td>{reward.level}</td>
                                            </tr>
                                        )
                                    )
                                }
                            </tbody>
                        </table>
                    )
             }

            </History>
        </>
    )
}

export default History