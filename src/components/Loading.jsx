import React from 'react'
import loading from '../assets/24frames.gif'
import styled from 'styled-components'


const Loading = () => {

    const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: #000000bc;
    border-radius: 10px;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    `

    const LoadingStyle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    img {
        width: 400px;
    }
    `

    return (
        <Wrapper>
            <LoadingStyle>
                <img src={loading} alt="loading" />
            </LoadingStyle>
        </Wrapper>
    )
}

export default Loading