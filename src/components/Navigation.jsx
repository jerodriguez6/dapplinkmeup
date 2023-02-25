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
    //dark mode
    color: ${mode ? "#fff" : "#000"};
    transition: all 0.5s ease;
    width:86%;
    margin: 10px 6% 3%; 
    @media (max-width: 768px) {
        flex-direction: column;
    }
    `;

    const FirstPart = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:5px 5px;

    width: 100%;
    border: 2px;
    box-shadow: 0 0 0 2px #5B6EFF;
    border-radius: 10px;
    
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
    const NavigationLinks = styled.div`
    display:flex;
    justify-content:center;
    font-weight: 600;
    font-size: 20px;
    border-radius: 15px;
    cursor: pointer;
    padding:5px 20px;
    width:100%;
   
    &.selected {
        // gradient border
        background: ${mode ? "linear-gradient(to right , #5B6EFF, #83DEFF)" : "transparent"};
        padding:10px;
    }
    //transition: all 0.5s ease;
    @media (max-width: 768px) {
        font-size: 9px;
        border-radius: 10px;


    }
    @media (max-width: 500px) {
        font-size: 7px;
        width:14%;

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
            name: "Sell",
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
    const [selectedLink, setSelectedLink] = useState("");

    const navigate = useNavigate();

    const handleClick = (link) => {
        navigate(link);
        setSelectedLink(link);

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
                    <NavigationLinks 
                        key={index} 
                        onClick={() => handleClick(item.link)}
                        className={selectedLink === item.link || (selectedLink === "" && item.link === "/") ? "selected" : ""}

                        >{item.name}</NavigationLinks>
                )})}
        </FirstPart>
        {/*<SecondPart>
            <BoxContent>
                <BiWallet size={20} />
                {connected ? frontAddress : 'Connect Wallet'}
            </BoxContent>
            <BoxContent>
                <BiCoinStack size={20} />
                Total balance: {totalBalance} USD
            </BoxContent>
        </SecondPart>*/}
    </Navigation>

  )
}

export default Navigation