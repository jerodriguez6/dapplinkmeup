import React from 'react'
import { Outlet } from 'react-router-dom'
import TopBar from '../components/TopBar'
import {createGlobalStyle } from 'styled-components'
import Navigation from '../components/Navigation'
import fondo from '../assets/Fondo1.png'
import fondo2 from '../assets/Capa1.png'

import SVG from '../assets/squircle.svg'
import styled from 'styled-components'
import star from '../assets/star.png'
import Footer from '../components/Footer'



const Layout = ({mode, toggleMode}) => {

    const GlobalStyle = createGlobalStyle`
    body {
        /* background: ${mode ? "linear-gradient(#04040e,#080828) padding-box" : "linear-gradient(#f2f2f8,#e0e2e7) padding-box"}; */
        //background-size: cover;
        //background-repeat: no-repeat;
        //background-position: contain;
        color: ${mode ? "#fff" : "#000"};
        //animation change delay 080828 04040e
        transition: all 0.5s ease;
        overflow-y: auto;
        overflow-x: hidden;
        margin: 0;
        padding: 0;
        //height: 100vh;
        position: relative;
    }
    `;

    const Squircle1 = styled.div`
    position: absolute;
    top: 50px;
    left: 50px;
    width: 100px;
    height: 100px;
    opacity: 0.5;
    //animation infinite 5s linear spin
    animation: infinite 5s linear spin;
    @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        50% {
          transform: rotate(180deg);
        }
        100% {
          transform: rotate(360deg);
        }
    }
    img {
        width: 100%;
        height: 100%;
    }
    z-index: -1;
    @media (max-width: 512px) {
      display: none;
    }

    `;

    const Squircle2 = styled.div`
    position: absolute;
    top: 250px;
    left: 150px;
    width: 100px;
    height: 100px;
    opacity: 0.5;
    //animation infinite 5s linear spin
    animation: infinite 5s linear spin;
    @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        50% {
          transform: rotate(180deg);
        }
        100% {
          transform: rotate(360deg);
        }
    }
    img {
        width: 100%;
        height: 100%;
    }
    z-index: -1;
    @media (max-width: 512px) {
      display: none;
    }
    `;

    const Squircle3 = styled.div`
    position: absolute;
    top: 450px;
    left: 250px;
    width: 100px;
    height: 100px;
    opacity: 0.5;
    //animation infinite 5s linear spin
    animation: infinite 5s linear spin;
    @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        50% {
          transform: rotate(180deg);
        }
        100% {
          transform: rotate(360deg);
        }
    }
    img {
        width: 100%;
        height: 100%;
    }
    z-index: -1;
    @media (max-width: 512px) {
      display: none;
    }
    `;
    
    const Squircle4 = styled.div`
    position: absolute;
    top: 650px;
    left: 50px;
    width: 100px;
    height: 100px;
    opacity: 0.5;
    //animation infinite 5s linear spin
    animation: infinite 5s linear spin;
    @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        50% {
          transform: rotate(180deg);
        }
        100% {
          transform: rotate(360deg);
        }
    }
    img {
        width: 100%;
        height: 100%;
    }
    z-index: -1;
    @media (max-width: 512px) {
      display: none;
    }
    `;

  const Squircle01 = styled.div`
  position: absolute;
  top: 50px;
  right: 50px;
  width: 100px;
  height: 100px;
  opacity: 0.5;
  //animation infinite 5s linear spin
  animation: infinite 5s linear spin;
  @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      50% {
        transform: rotate(180deg);
      }
      100% {
        transform: rotate(360deg);
      }
  }
  img {
      width: 100%;
      height: 100%;
  }
  z-index: -1;
  @media (max-width: 512px) {
      display: none;
    }
  `;
  const Squircle02 = styled.div`
      position: absolute;
      top: 250px;
      right: 150px;
      width: 100px;
      height: 100px;
      opacity: 0.5;
      //animation infinite 5s linear spin
      animation: infinite 5s linear spin;
      @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(180deg);
          }
          100% {
            transform: rotate(360deg);
          }
      }
      img {
          width: 100%;
          height: 100%;
      }
      z-index: -1;
      @media (max-width: 512px) {
      display: none;
    }
  `;

  const Squircle03 = styled.div`
  position: absolute;
  top: 450px;
  right: 250px;
  width: 100px;
  height: 100px;
  opacity: 0.5;
  //animation infinite 5s linear spin
  animation: infinite 5s linear spin;
  @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      50% {
        transform: rotate(180deg);
      }
      100% {
        transform: rotate(360deg);
      }
  }
  img {
      width: 100%;
      height: 100%;
  }
  z-index: -1;
  @media (max-width: 512px) {
      display: none;
    }
  `;
  
  const Squircle04 = styled.div`
  position: absolute;
  top: 650px;
  right: 50px;
  width: 100px;
  height: 100px;
  opacity: 0.5;
  //animation infinite 5s linear spin
  animation: infinite 5s linear spin;
  @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      50% {
        transform: rotate(180deg);
      }
      100% {
        transform: rotate(360deg);
      }
  }
  img {
      width: 100%;
      height: 100%;
  }
  z-index: -1;
  @media (max-width: 512px) {
      display: none;
    }
  `;





  return (
    <> 
    <GlobalStyle />
    {/*<Squircle1>
        <img src={star} alt="squircle" />
    </Squircle1>
    <Squircle2>
    <img src={star} alt="squircle" />
    </Squircle2>
    <Squircle3>
    <img src={star} alt="squircle" />
    </Squircle3>
    <Squircle4>
    <img src={star} alt="squircle" />
    </Squircle4>
    <Squircle01>
    <img src={star} alt="squircle" />
    </Squircle01>
    <Squircle02>
    <img src={star} alt="squircle" />
    </Squircle02>
    <Squircle03>
    <img src={star} alt="squircle" />
    </Squircle03>
    <Squircle04>
    <img src={star} alt="squircle" />
    </Squircle04>*/}
        <TopBar mode={mode} toggleMode={toggleMode}/>
        <Navigation mode={mode} />
        <Outlet />
    </>
  )
}

export default Layout