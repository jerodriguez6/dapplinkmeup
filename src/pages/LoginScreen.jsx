import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { connectWallet } from '../redux/web3Actions'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import logo from '../assets/logo.png'
import banner from '../assets/banner2.png'
import Loading from '../components/Loading'


const LoginScreen = ({mode}) => {

    const LoginSection = styled.div`
    background: ${mode ?  `url(${banner})`: `url(${banner})`};
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    `

    const LoginContainer = styled.div`
    //height: 80vh;
    width: 50vw;
    min-width: 420px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 10px;
    margin-top:5%;
    //box-shadow: 5px 2px 1px 1px ${mode ? "#fff" : "#00000080"};
    `

    const MetamaskLogin = styled.button `
    background: ${mode ? "linear-gradient(to right , #5B6EFF, #83DEFF)" : "transparent"};
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 20px;
    font-size: 20px;
    box-shadow: 0 0 20px #fff;
    cursor:pointer;

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