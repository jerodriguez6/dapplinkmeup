import { ethers } from 'ethers'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const UserBalance = () => {
  const {adminLoaded, allInvestments, allRewards, tokenContract, paymentContract, adminRewards} = useSelector(state => state.admin)

  const Balances = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
  `

  const splitAddress = (address) => {
    return address.slice(0, 6) + '...' + address.slice(-4)
  }

  const countBalance = (allReward) => {
    let total = 0
    allReward.forEach(reward => {
      total += reward.balance
    })
    adminRewards.forEach(reward => {
      total += reward.balance
    })
    setTotalBalance(total)
  }

  const tokenBalance = async () => {
    const balance = await tokenContract.balanceOf(paymentContract.address)
    setTokenBalance(ethers.utils.formatEther(balance))
  }


  const [allReward, setAllReward] = useState([])
  const [totalBalance, setTotalBalance] = useState(0)
  const [TokenBalance, setTokenBalance] = useState(0)

  useEffect(() => {
    if (adminLoaded) {
      setAllReward(allRewards)
      tokenBalance()

    }
  }, [adminLoaded, allRewards])

  useEffect(() => {
    if (allReward.length > 0) {
      countBalance(allReward)
    }
  }, [allReward])



  return (
    <Balances>
      {adminLoaded ?
      <>
        <div>
          Total Balance: {totalBalance}
        </div>
        <div>
          token in contract : {TokenBalance}
        </div>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
            <th scope="col">Index</th>
              <th scope="col">account</th>
              <th scope="col">level</th>
              <th scope="col">balance</th>
              <th scope="col">status</th>
            </tr>
          </thead>
          <tbody>
            {allReward.map((rewards, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{splitAddress(rewards.account)}</td>
                <td>{rewards.level}</td>
                <td>{rewards.balance}</td>
                <td>{rewards.status? 'active' : 'inactive'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </>
        :
        <div>
          Loading...
        </div>

      }
    </Balances>

  )
}

export default UserBalance