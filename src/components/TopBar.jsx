import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import {FaCopy} from 'react-icons/fa';
import {BsFillSunFill} from 'react-icons/bs';
import {RiMoonClearFill} from 'react-icons/ri';
import {MdEngineering} from 'react-icons/md';
import {BiLogInCircle} from 'react-icons/bi';
import { Logout } from '../redux/web3Actions';
import logoSmall from '../assets/logo2.png'
import banner from '../assets/banner.png'
import retiroefectivo from '../assets/retiroefectivo.png'
import wallet from '../assets/wallet-pass.png'
import {BiWallet} from 'react-icons/bi';

const TopBar = ({mode, toggleMode}) => {

  const Top = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    //align-items: center;
    //height: 500em;
    //dark mode
    background: ${mode ?  `url(${banner})`: `url(${banner})`};
    background-repeat: no-repeat;
    background-size: cover;


    color: ${mode ? "#ffffff" : "#000"};
    //box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    transition: all 0.5s ease;
    width: 100vw;
    //padding: 0 20px;
    position: relative;
    
    @media (max-width: 768px) {
      padding: 2px;
    }
 
    `;

    const TopWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    //dark mode
    background-color: ${mode ? "rgba(0, 0, 0, 0.3)" : "#dcdde4"};
    color: ${mode ? "#ffffff" : "#000"};
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    transition: all 0.5s ease;
    width: 100vw;
    //max-width: 1080px;
    padding: 4% 60px;
    position: relative;
    //margin: 0 auto;
    margin-bottom: 22%;

    `;

  const TopBox = styled.div`
    position: absolute;
    top: 10px;
    left: 200px;
    width: 40px;
    height: 40px;
    border: 1px solid #fff;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    @media (max-width: 768px) {
      left: 80px;
    }
    `;

    const NoctMdde = styled.div`
    position: absolute;
    top: 10px;
    right: 15%;
    width: 40px;
    height: 40px;
    border: 1px solid #fff;
    
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    `;

    const LogoDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    `;

    const ImgLarge = styled.img`
    width: 200px;
    @media (max-width: 768px) {
      display: none;
    }
    `;

    const ImgSmall = styled.img`
    width: 40px;
    @media (min-width: 768px) {
      display: none;
    }
    `;

    const LinkWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 5px solid ${mode ? "transparent" : "#616164"};
    background: ${mode ? "transparent" : "#616164"};
    border-radius: 10px;
    color: #fff;
    overflow: hidden;
    width: 85%;
    font-size: 1vw;
    @media (max-width: 768px) {
      font-size: 1.5vw;
      width: 95%;

    }
    `

    const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${mode ? "linear-gradient(to right , #5B6EFF, #83DEFF)" : "transparent"};
    border-radius: 10px;
    cursor: pointer;
    color: #fff;
    width: 25%;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    //opacity:0;
    padding: 2px 7px;
    @media (max-width: 768px) {
      width: 40%;
    }
    @media (max-width: 500px) {
      width: 46%;
    }

    `

    const LogoutWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    //background: #a80a0a;
    border-radius: 10px;
    cursor: pointer;
    color: #fff;
    width:100%;
    gap:5%;
    padding: 5px 0px;
    border: #83DEFF solid 1px;
    font-size: 1vw;
    &:hover{
      background: ${mode ? "linear-gradient(to right , #5B6EFF, #83DEFF)" : "transparent"};
    } 

    `
    const TopHomeContent = styled.div`
    display: flex;
    flex-direction: column;


    `
    const TopHomeContentOrdani = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 60px;
    margin-top:-9%;
    margin-bottom:8%;
    @media (max-width: 768px) {
      margin-top:-14%;

    }
    @media (max-width: 500px) {
      margin-top:-20%;

    }


    `
    const TopHomeContentH1 = styled.h1`
    font-size: 7vw;
    @media (max-width: 500px) {
      font-size: 5vw;
      
    }
    `
    const TopHomeContentP = styled.p`
    font-size: 20px;
    margin-top:-25px;
    @media (max-width: 768px) {
      margin-top:-17px;
      font-size: 15px;

    }
    @media (max-width: 500px) {
      font-size: 10px;
      margin-top:-10px;

      
    }
    `

    const TopHomeContentImg = styled.div`
    display: flex;
    gap:1%;
    font-size: 1vw;
    margin-top:3%;

    `;
    const TopHomelogin = styled.div`
    display: flex;
    width:20%;
    gap: 3%
    `;
    const ImgRes = styled.img`
    width: 1.8vw;
    //@media (max-width: 768px) {
    //  display: none;
    //}
    `;
    
    const dispatch = useDispatch();


    const {account, connected, referalPlans} = useSelector(state => state.web3);


  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/profile');
  }

  const navToAdmin = (e) => {
    e.preventDefault();
    navigate('/admin/balances');
  }

  const splitAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const copyToClipboard = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(`https://lmumatrix.netlify.app/${account.address}`)
    Swal.fire({

      icon: 'success',
      title: 'Copied to clipboard',
      showConfirmButton: false,
      timer: 1500
    })

  }

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(Logout());

  }
      
    const [frontAddress, setFrontAddress] = useState('')
    const [totalBalance, setTotalBalance] = useState(0)

    useEffect(() => {
        if(connected){
            const address = account.address.split('')
            const addressLength = address.length
            const frontAddress = address.slice(0, 15).join('')
            const backAddress = address.slice(addressLength - 4, addressLength).join('')
            setFrontAddress(frontAddress + '...' + backAddress)
        }
        // add referalPlans balances
        let totalBalance = 0;
        referalPlans.map((item, index) => {
        
            const balance = item.balance
           
            totalBalance += balance
            setTotalBalance(totalBalance.toFixed(2))
        })
        
    }, [connected])


  return (
    <Top>
      <TopWrapper>
        {account.address == '0x27573dd1742FB3a759Ea1e33318567444259b053' && 
       <TopBox onClick={navToAdmin}>
        <MdEngineering />
      </TopBox> 
      }
      {/*<NoctMdde onClick={toggleMode}>
        {mode ? <BsFillSunFill /> : <RiMoonClearFill />}
      </NoctMdde>*/}
      <LogoDiv>
        <ImgLarge src={logo} alt="logo" />
        <ImgSmall src={logoSmall} alt="logo" />
      </LogoDiv>
      <Wrapper onClick={copyToClipboard}>
        <div>
          <ImgRes src={wallet} alt="" />
        </div>
      {/*<LinkWrapper> My Link: {`https://lmumatrix.netlify.app/${splitAddress(account.address)}`} </LinkWrapper>*/}
      <LinkWrapper> My Link: {connected ? frontAddress : 'Connect Wallet'} </LinkWrapper>
      </Wrapper>
      <TopHomelogin>

      <LogoutWrapper onClick={handleLogout}>
      <p>Sing In</p>

        {/*<BiLogInCircle size={30} />*/}
      </LogoutWrapper>
      <LogoutWrapper onClick={handleLogout}>
      <p>Sing Up</p>

        {/*<BiLogInCircle size={30} />*/}
      </LogoutWrapper>
      </TopHomelogin>
      </TopWrapper>
    <TopHomeContent>
      <TopHomeContentOrdani>
        <TopHomeContentH1>DAPP</TopHomeContentH1>
        <TopHomeContentP>All you need in one place</TopHomeContentP>
      <TopHomeContentImg> 
        <ImgRes src={retiroefectivo} alt="" /> 
        <p>Total Balance: 0.0 USD</p>
      </TopHomeContentImg>
    </TopHomeContentOrdani>
    </TopHomeContent> 
    </Top>
  )
}

export default TopBar