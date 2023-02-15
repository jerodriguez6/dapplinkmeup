import { ethers } from 'ethers'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import { getPartner } from '../redux/partnerAction'

const Partner = () => {

    const Background = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    color: #fff;
    `

    const BottomWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    color: #fff;
    margin-top: 100px;
    input {
        width: 200px;
    }
  
    `

    const Button = styled.button`
    border: 1px solid #fff;
    width: 200px;
    height: 60px;
    background: #2f31a3;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    cursor: pointer;
   
    `

    const {partnerContract, account} = useSelector(state => state.web3)
    const {myBalance} = useSelector(state => state.partner)
    //console.log(myBalance)
    const dispatch = useDispatch()

    const [balance, setBalance] = useState([])

    const getBalance = async () => {
        const balance = await partnerContract.getAllBalance()
        setBalance(balance)
    }

    const Claim = async () => {
        try{
        const BALANCE = ethers.utils.parseEther(amount.toString())
        const claim = await partnerContract.retire(BALANCE)
        await claim.wait()
        console.log(claim)
        dispatch(getPartner())
        } catch (err) {
            console.log(err)
            if(err.reason){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.reason,
                    })
            }
        }
    }

    const [amount , setAmount] = useState(0)


    useEffect(() => {
        if(partnerContract && account) {
            getBalance()
        }
    }, [partnerContract, account])

    



  return (
    <Background>
       <h3>Partner</h3>
       <BottomWrapper>
              <h4>Balance</h4>
              <h5>{myBalance}</h5>  
        </BottomWrapper> 
        <BottomWrapper>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} autoFocus={true} />
              <Button onClick={Claim}>
                    Claim
              </Button>
        </BottomWrapper> 
    </Background>
  )
}

export default Partner