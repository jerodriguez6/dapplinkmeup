import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ethers } from 'ethers';
import {AiOutlineDashboard} from 'react-icons/ai';
import {AiOutlineDollarCircle} from 'react-icons/ai';
import {VscUngroupByRefType} from 'react-icons/vsc';
import {GiCoins} from 'react-icons/gi';
import {AiFillBank} from 'react-icons/ai';
import {BiRefresh} from 'react-icons/bi';
import {RiTeamLine} from 'react-icons/ri';
import {HiOutlineDocumentText} from 'react-icons/hi';
import {BiWallet} from 'react-icons/bi';
import {BiCoinStack} from 'react-icons/bi';

const Navigation = ({mode}) => {

    const Navigation = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 110px;
    //dark mode
    color: ${mode ? "#fff" : "#000"};
    transition: all 0.5s ease;
    
 
    max-width: 1080px;
    margin: 10px auto;
    @media (max-width: 768px) {
        flex-direction: column;
        height: 220px;
    }
    `;

    const FirstPart = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;
    height: 110px;
    //dark mode
    width: 60%;
  
    @media (max-width: 768px) {width: 100%;}
    `

    const NavigationBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 5px;
    height: 80px;
    width: 80px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    background: ${mode ? "linear-gradient(#2b2b31,#2a2a30) padding-box" : "linear-gradient(#bfbfc0,#b4b4b9) padding-box"};
    font-weight: 600;
    font-size: 12px;
    border-radius: 15px;
    cursor: pointer;
    &:hover {
        // gradient border
        background: ${mode? "linear-gradient(#2b2b31,#2a2a30) padding-box,linear-gradient(to right, rgba(240, 159, 94, 1), rgba(87, 80, 245, 1), rgba(134, 230, 255, 1)) border-box;" : "linear-gradient(#bfbfc0,#b4b4b9) padding-box,linear-gradient(to right, rgba(240, 159, 94, 1), rgba(87, 80, 245, 1), rgba(134, 230, 255, 1)) border-box;"};
        border-radius: 15px;
        border: 3px solid transparent;
    }
    //transition: all 0.5s ease;
    @media (max-width: 768px) {
        width: 60px;
        height: 60px;
    }
    @media (max-width: 500px) {
        width: 50px;
        height: 50px;
    }
    `

    const SecondPart = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 110px;
    width: 40%;
    `

    const BoxContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 40%;
    background: ${mode ? "linear-gradient(#2b2b31,#2a2a30) padding-box" : "linear-gradient(#bfbfc0,#b4b4b9) padding-box"};
    font-weight: 600;
    border-radius: 15px;
    @media (max-width: 768px) {
        width: 90vw;
        
    }

 
    `

    const navigationBar = [
        {
            name: "Home",
            link: "/",
            icon: <AiOutlineDashboard size={40} />
        },
        {
            name: "Buy",
            link: "/buy",
            icon: <AiOutlineDollarCircle size={40} />
        },
        {
            name: "Matrix",
            link: "/matrix",
            icon: <VscUngroupByRefType size={40} />
        },
        {
            name: "Rewards",
            link: "/reward",
            icon: <GiCoins size={40} />
        },
        {
            name: "Plans",
            link: "/plans",
            icon: <BiRefresh size={40} />
        },
        {
            name: "Team",
            link: "/team",
            icon: <RiTeamLine size={40} />
        },
        {
            name: "History",
            link: "/history",
            icon: <HiOutlineDocumentText size={40} />
        }
    ]

    const {connected, account, referalPlans} = useSelector(state => state.web3);
    
    const [frontAddress, setFrontAddress] = useState('')
    const [totalBalance, setTotalBalance] = useState(0)

    const navigate = useNavigate();

    const handleClick = (link) => {
        navigate(link);
    }

    useEffect(() => {
        if(connected){
            const address = account.address.split('')
            const addressLength = address.length
            const frontAddress = address.slice(0, 6).join('')
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
    <Navigation>
        <FirstPart>
            {navigationBar.map((item, index) => {
                return (
                    <NavigationBox key={index} onClick={() => handleClick(item.link)}>
                        {item.icon}
                        <div>{item.name}</div>
                    </NavigationBox>
                )})}
        </FirstPart>
        <SecondPart>
            <BoxContent>
                <BiWallet size={20} />
                {connected ? frontAddress : 'Connect Wallet'}
            </BoxContent>
            <BoxContent>
                <BiCoinStack size={20} />
                Total balance: {totalBalance} USD
            </BoxContent>
        </SecondPart>
    </Navigation>

  )
}

export default Navigation