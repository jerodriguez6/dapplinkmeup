import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import Swal from 'sweetalert2';
import { loadAdmin } from '../redux/adminActions';

const Admin = () => {

    const Admin = styled.div`
    display: flex;
    padding: 0 20px;
    gap: 20px;
    height: 65vh;
    border: 1px solid red;
    justify-content: initial;
    align-items: center;
    flex-direction: column;
    @media (max-width: 768px) {
        flex-direction: column;
    }
    `

    const NavBar = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 60px;
    //dark mode

    transition: all 0.5s ease;
    border : 1px solid red;
    margin-top: 10px;
    margin-bottom: 20px;
    width: 100%;
    @media (max-width: 768px) {
        flex-direction: column;
        height: 220px;
    }
    `;

    const NavBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    height: 60px;
    width: 80px;
    border: 1px solid green;
    background-color: green;
    border-radius: 15px;
    cursor: pointer;
    @media (max-width: 768px) {
        width: 50px;
        height: 50px;
    }
    `;

    const items = [
        {
            name: 'User Balances',
            link: '/admin/balances',
        },
        // {
        //     name: 'Users Transactions',
        //     link: '/admin/users-transactions',
        // },
        {
            name: 'Investmens plans',
            link: '/admin/investors',
        },
        // {
        //     name: 'Options',
        //     link: '/admin/options'
        // }
    ]

    const {paymentContract, connected, adminLoaded } = useSelector(state => state.web3)

    const navigate = useNavigate();

    const handleNav = (link) => {
        navigate(link)
    }

    const dispatch = useDispatch();

    useEffect(() => {
        if(connected && !adminLoaded){
            dispatch(loadAdmin())
        }
    }, [connected])


  return (
    <Admin>
        <NavBar>
            {items.map((item, index) => (
                <NavBox key={index} onClick={() => handleNav(item.link)}>
                    <p>{item.name}</p>
                </NavBox>
            ))}
        </NavBar>
        <Outlet/>
    </Admin>
  )
}

export default Admin