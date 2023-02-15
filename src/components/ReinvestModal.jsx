import React from 'react'
import styled from 'styled-components'
import { NFT_PRICES } from '../const'

const ReinvestModal = ({openModal, setOpenModal, renew, level}) => {

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
    height: 300px;
    position: absolute;
    background:  #333333;
    border-radius: 20px;
    border: 1px solid #fff;
    `

    const CloseButton = styled.div`
    position: absolute;
    top: 10px;
    right: 5%;
    width: 40px;
    height: 40px;
    border: 1px solid #fff;
    background: red;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    `

    const Button = styled.button`
    border: 1px solid #fff;
    background: #2f31a3;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    cursor: pointer;
    `

    const ButtonUSDT = styled.button`
    border: 1px solid #fff;
    background: #097229;
    border-radius: 6px;
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
    //console.log("level", level)

  return (
    <Wrapper>
        <LoadingStyle>

            <CloseButton onClick={() => setOpenModal(!openModal)}>
                x
            </CloseButton>

                   <h5>Choose reinvest method</h5> 

            <ButtonWrapper>
                <Button onClick={() => renew(level, true)}>
                    balance: {NFT_PRICES[level-1] * 1.03}
                </Button>

                <ButtonUSDT onClick={() => renew(level, false)}>
                     USDT: {NFT_PRICES[level-1] * 1.05}
                </ButtonUSDT>   
            </ButtonWrapper>
        </LoadingStyle>
    </Wrapper>
  )
}

export default ReinvestModal