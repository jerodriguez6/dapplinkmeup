import React from 'react'
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

const TopBar = ({mode, toggleMode}) => {

  const Top = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    //dark mode
    background-color: ${mode ? "#1e1e1e" : "#dcdde4"};
    color: ${mode ? "#ffffff" : "#000"};
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    transition: all 0.5s ease;
    width: 100vw;
    padding: 0 20px;
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
    background-color: ${mode ? "#1e1e1e" : "#dcdde4"};
    color: ${mode ? "#ffffff" : "#000"};
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    transition: all 0.5s ease;
    width: 100vw;
    max-width: 1080px;
    padding: 0 20px;
    position: relative;
    margin: 0 auto;
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
    width: 150px;
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
    border: 5px solid ${mode ? "#101011" : "#616164"};
    background: ${mode ? "#101011" : "#616164"};
    border-radius: 10px;
    color: #fff;
    overflow: hidden;
    width: 100%;
    `

    const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${mode ? "#101011" : "#616164"};
    border-radius: 10px;
    cursor: pointer;
    color: #fff;
    width: 35%;
    `

    const LogoutWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: #a80a0a;
    border-radius: 10px;
    cursor: pointer;
    color: #fff;
    `

    const dispatch = useDispatch();


    const {account} = useSelector(state => state.web3);


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

  return (
    <Top>
      <TopWrapper>
        {account.address == '0x27573dd1742FB3a759Ea1e33318567444259b053' && 
       <TopBox onClick={navToAdmin}>
        <MdEngineering />
      </TopBox> 
      }
      <NoctMdde onClick={toggleMode}>
        {mode ? <BsFillSunFill /> : <RiMoonClearFill />}
      </NoctMdde>
      <LogoDiv>
        <ImgLarge src={logo} alt="logo" />
        <ImgSmall src={logoSmall} alt="logo" />
      </LogoDiv>
      <Wrapper onClick={copyToClipboard}>
        <div>
          <FaCopy  />
        </div>
      <LinkWrapper> {`https://lmumatrix.netlify.app/${splitAddress(account.address)}`} </LinkWrapper>
      </Wrapper>
      <LogoutWrapper onClick={handleLogout}>
        <BiLogInCircle size={30} />
      </LogoutWrapper>
      </TopWrapper>
    </Top>
  )
}

export default TopBar