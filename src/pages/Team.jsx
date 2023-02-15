import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { ethers } from 'ethers'

const Team = () => {
    const Team = styled.div`
    gap: 20px;
    height: 70vh;

    overflow-y: auto;
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
    <Team>
        <Section>
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
        </Section>
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
                { referalPerLevel.length > 0 &&
                referalPerLevel.map((item, index) => (
                    <tr key={index} className="table-row">
                        <th scope="row">{splitAddress(item.address)}</th>
                        <td>{item.level}</td>
                        <td>{item.status? "active" : "inactive"}</td>
                        <td>{item.countReferals}</td>
                    </tr>
                ))}
            </tbody>
        </table>

    </Team>
  )
}

export default Team