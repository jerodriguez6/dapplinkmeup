import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { NFT_PRICES } from '../const'
import Loading from './Loading'
import { ethers } from 'ethers'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { connectWallet } from '../redux/web3Actions'


const WithdrawModal = ({openWithdraw, setOpenWithdraw, level}) => {

    const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: #00000096;
    border-radius: 10px;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    `

    const LoadingStyle = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    width: 380px;
    height: 200px;
    position: absolute;
    background:  #333333;
    border-radius: 20px;
    border: 1px solid #fff;
    `

    const CloseButton = styled.div`
    position: absolute;
    top: 10px;
    right: 5%;
    width: 30px;
    height: 30px;
    border: 1px solid #fff;
    background: red;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    font-weight: 800;
    cursor: pointer;
    `

    const Button = styled.button`
    border: 1px solid #fff;
    background: #2f31a3;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    cursor: pointer;
    `

    const ButtonUSDT = styled.button`
    border: 1px solid #fff;
    background: #097229;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    cursor: pointer;
    `

    const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap : 10px;
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

    const dispatch = useDispatch()
    //console.log("level", level)
    const { paymentContract} = useSelector(state => state.web3)
  
    const [writeAmount, setWriteAmount] = useState(0)
    const [loading, setLoading] = useState(false)

    const withdraw = async(amount, level) => {
        try{
        setLoading(true)
            //console.log(amount, level)
        const amountToSend = ethers.utils.parseEther(amount.toString())
        const withdraw = await paymentContract.retireReferalBonus( amountToSend, level.toString())
        await withdraw.wait()
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Withdraw successful',
            showConfirmButton: false,
            timer: 1500
        })
        dispatch(connectWallet())
        setLoading(false)
        setOpenWithdraw(false)
        } catch (error) {
            console.log(error)
            if(error.reason){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.reason,
                showConfirmButton: false,
                timer: 1500
            })
            }
            setLoading(false)
        }
    }

  return (
    <>
    
    <Wrapper>
        <LoadingStyle>
        {loading ? <Loading/>
        :
        <>
            <CloseButton onClick={() => setOpenWithdraw(!openWithdraw)}>
                x
            </CloseButton>
                    <br/>
                   <h5>Withdraw fee 5%</h5>
                   <input 
                   type="number" 
                   autoFocus={true}
                   value={writeAmount} 
                   onChange={(e) => setWriteAmount(e.target.value)} />
                   <div>
                    Witdraw : { parseFloat(writeAmount-(writeAmount * 0.05) ) } USDT
                   </div>
            <ButtonWrapper>
                <Rainbow onClick={() => withdraw( writeAmount, level)}>
                    Retire
                </Rainbow>
            </ButtonWrapper>
        </>
}
        </LoadingStyle>
    </Wrapper>
    </>
  )
}

export default WithdrawModal