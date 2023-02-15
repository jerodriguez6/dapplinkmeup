import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { connectWallet } from '../redux/web3Actions'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import logo from '../assets/logo.png'
import Loading from '../components/Loading'


const LoginScreen = ({mode}) => {

    const LoginSection = styled.div`
    background: ${mode ? "linear-gradient(#080808,#030304) padding-box" : "linear-gradient(#f9f9f9,#dcdce9) padding-box"};
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    `

    const LoginContainer = styled.div`
    background-color: ${mode ? "#1c1c1e" : "#b4b4b4"};
    height: 80vh;
    width: 50vw;
    min-width: 420px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: 5px 2px 1px 1px ${mode ? "#fff" : "#00000080"};
    `

    const MetamaskLogin = styled.button `
    background-color: #993609;
    color: white;
    border: 1px solid white;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 20px;
    `

    const LogoStyle = styled.img`
    width: 80%;
    min-width: 380px;

    `
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {connected, loading} = useSelector(state => state.web3)

    const {address} = useParams()
    //console.log("address", address)
    useEffect(() => {
        if (address) {
          // if address starts with 0x, it's a valid address
          if (address.startsWith('0x')) {
          window.localStorage.setItem('address', address)
          }
        }
      }, [address])

    const connect = () => {
        dispatch(connectWallet())
        navigate('/')
    }

  return (
    <LoginSection>
        {
            loading && <Loading />
        }
        <LoginContainer>
            <LogoStyle src={logo} alt="logo" />
            <MetamaskLogin onClick={connect}>
            Connect your wallet
            </MetamaskLogin>
        </LoginContainer>

        
    </LoginSection>
  )
}

export default LoginScreen