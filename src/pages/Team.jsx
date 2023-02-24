import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { ethers } from 'ethers'
import Footer from '../components/Footer'

const Team = () => {
    const Team = styled.div`
    gap: 20px;
    height: 70vh;
    width:86%;
    margin-left:6%;
    overflow-y: auto;
    border: 2px solid #5b6eff;
    border-radius: 20px;
    padding:40px;
    .table{
        overflow: auto;
    }
    .table thead th {
        text-align: center;
        border-bottom: 2px solid #5B6EFF;
        font-size: 23px;
        font-weight: 100;
    }
    .table td, .table th {
        border-top: none;
        text-align: center;
        font-size: 23px;
        font-weight: 100;
    }
    @media (max-width: 768px) {
        .table td, .table th {
            font-size: 15px;
        }
        .table thead th {
            font-size: 15px;
        }
        overflow-x: auto;

    }
    @media (max-width: 500px) {
        .table td, .table th {
            font-size: 6px;
        }
        .table thead th {
            font-size: 7px;
        }

    }
    `

    const Section = styled.div`
    display: flex;
    width: 90%;
    height: 65px;
    align-items: center;

    justify-content: space-around;
    margin: 5px auto;

    `

    const {paymentContract, referalPerLevel} = useSelector(state => state.web3)
  
 



    const trasformDate = (date) => {
        const newDate = new Date(date * 1000);
        const year = newDate.getFullYear();
        const month = newDate.getMonth();
        const day = newDate.getDate();
        const hour = newDate.getHours();
        const minutes = newDate.getMinutes();
        const seconds = newDate.getSeconds();
        const finalDate = `${day}/${month}/${year} ${hour}:${minutes}:${seconds}`;
        return finalDate;
    }

    const splitAddress = (address) => {
        const firstPart = address.slice(0, 6)
        const lastPart = address.slice(-4)
        const finalAddress = `${firstPart}...${lastPart}`
        return finalAddress
    }






  return (
    <>
    <Team>
        {/*<Section>*/}
                {/* <div>                
                <input type="text"
                placeholder="search address" 
                />
                <button>search</button>
                
                </div>
                <div>
                <label>Filter by status</label>
                <select>
                <option>all</option>
                <option>active</option>
                <option>inactive</option>
                </select>
                </div>
                <div>
                <label>Filter by level</label>
                <select>
                <option>all</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                </select>
            </div> */}
        {/*</Section>*/}
        <table className="table">
            <thead className="table-header">
                <tr className="table-header">
                    <th scope="col">Address</th>
                    <th scope="col">Level</th>
                    <th scope="col">Status</th>
                    <th scope="col">references</th>

                </tr>
            </thead>
            <tbody className="table-body">
                {/*{ 
                    referalPerLevel.length > 0 &&
                referalPerLevel.map((item, index) => (*/}
                    <tr  className="table-row">
                        <th scope="row">ffviujuibytf6tgui</th>
                        {/*<th scope="row">{splitAddress(item.address)}</th>*/}
                        <td>tuyvyiubñiu</td>
                        <td>ghjkmlñ</td>
                        <td>fghjklñ</td>
                        {/*<td>{item.level}</td>
                        <td>{item.status? "active" : "inactive"}</td>
                    <td>{item.countReferals}</td>*/}
                    </tr>
                
            </tbody>
        </table>
    </Team>
    <Footer />
    </>
  )
}

export default Team