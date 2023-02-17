import React from 'react'
import styled from 'styled-components'


const Footer = () => {

    const Footer = styled.div`
    width:100%;
    text-align: center;
    padding:2%;
    a{
        font-weight: 900;
        font-size:20px;
    }
    `

    //const LoadingStyle = styled.div`
    //display: flex;
    //justify-content: center;
    //align-items: center;
    //width: 100%;
    //height: 100%;
    //img {
    //    width: 400px;
    //}
    //`

    return (
        <Footer>
            <p> <a>LinkMeUp</a>2023 All Rights Reserved</p>
        </Footer>
    )
}

export default Footer