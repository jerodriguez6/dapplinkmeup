import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { NFT_PRICES } from '../../const'
import Swal from 'sweetalert2'

const InvestmentPlan = () => {
  const {adminLoaded, allInvestments, allRewards, tokenContract, paymentContract, adminRewards} = useSelector(state => state.admin)
  const Balances = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
  `

  const Button = styled.button`
  height: 30px;
  width: 80px;
  border-radius: 10px;
  border: none;
  color: white;
 
  font-weight: 600;
  margin: 10px;
  `


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

  const splitAddress = (address) => {
    return address.slice(0, 6) + "..." + address.slice(-4)
  }

  console.log("allInvestments", allInvestments)

  const payReward = async (address, level) => {
    try {
      await paymentContract.payOrder(address, level.toString())
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Reward payed',
      })
    } catch (error) {
      if(error.reason){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.reason,
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      })
    }
    }
  }

  return (
    <Balances>
      {adminLoaded ?
        //boostrap table
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">account</th>
              <th scope="col">level</th>
              <th scope="col">date</th>
              <th scope="col">reward</th>
              <th scope="col">status</th>
              <th scope="col">action</th>
            </tr>
          </thead>
          <tbody>
            {allInvestments.map((investment, index) => {
              return (
                <tr key={index}>
                  <td>{splitAddress(investment.account)}</td>
                  <td>{investment.level}</td>
                  <td>{investment.date}</td>
                  <td>{calculateRewardPerDay(investment.level, investment.timestamp)}</td>
                  <td>{
                  !investment.generatedOrder && !investment.payed && !investment.userRetired && !investment.canceled && 'Pending' ||
                  investment.generatedOrder && !investment.payed && !investment.userRetired && !investment.canceled && 'waiting pay' ||
                  investment.generatedOrder && investment.payed && !investment.userRetired && !investment.canceled && 'payed' ||
                  investment.generatedOrder && investment.payed && investment.userRetired && !investment.canceled && 'retired' ||
                  investment.canceled && 'canceled' 
                  }</td>
                  <td> <Button onClick={() => payReward(investment.account, investment.level)}
                  style={{
                    backgroundColor: !investment.generatedOrder && !investment.payed && !investment.userRetired && !investment.canceled && '#7d7e80' ||
                    investment.generatedOrder && !investment.payed && !investment.userRetired && !investment.canceled && '#23712b' ||
                    investment.generatedOrder && investment.payed && !investment.userRetired && !investment.canceled && '#781d13' 
                  }}>
                    pay
                    </Button> </td>

                </tr>
              )
            })}
          </tbody>
        </table>
        :
        <div>
          Loading...
        </div>
      }
    </Balances>
  )
}

export default InvestmentPlan