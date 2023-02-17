import React, {useState, useEffect} from 'react'
import { Tree, TreeNode } from 'react-organizational-chart'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import nft1png from '../assets/1.png'
import nft2png from '../assets/2.png'
import nft3png from '../assets/3.png'
import nft4png from '../assets/4.png'
import nft5png from '../assets/5.png'
import nft6png from '../assets/6.png'
import nft7png from '../assets/7.png'
import nft8png from '../assets/8.png'
import nft9png from '../assets/9.png'
import nft10png from '../assets/10.png'
import backImg from '../assets/back/GRIS.png'

const Matrix = ({mode}) => {

    const NFTs = [
        nft1png,
        nft2png,
        nft3png,
        nft4png,
        nft5png,
        nft6png,
        nft7png,
        nft8png,
        nft9png,
        nft10png
    ]

    const Matrix = styled.div`
    display: flex;

    gap: 20px;
    height: 70vh;
    
    flex-direction: column;

    `

    const SelectCarrousel = styled.div`
    display: flex;
    width: 100%;
    height: 70px;
    justify-content: center;
    align-items: center;
    gap: 10%;
    select {
        display:flex;
        gap:5%;
        border: none;
        outline: none;
        background: ${mode ? "transparent" : "#4f4f51"};
        color:  #83DEFF;
        font-size: 35px;
        font-weight: 900;
        cursor: pointer;
    }
    select option{
        width: 1%;
        font-size: 20px;
        background: #0A0A26;
        color: white;
        font-weight: 600;
        border:2px solid #5b6eff;
        text-aling:center;
    }
    `

    const CarrouselBox = styled.div`
    display: flex;
    width: 100px ;
    height: 60px;
    
    justify-content: center;
    align-items: center;
    `

    const MatrixBox = styled.div`
    overflow: auto;
    justify-content: center;
    align-items: center;

    `
    const StyledNode = styled.div`
    /* background: url(assets/img/others/account.png);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat; */
    position: relative;
    width: 60px;
    height: 100px;
    display: inline-block;
    //border: ${mode ? "1px solid #ffffff" : "1px solid #2d2dcd"};
    position: relative;
    z-index: 1;
    //overflow: hidden;
    img {
        width: 105%;
        box-shadow: 0 0 10px 2px #fff;
        border-radius: 10px;

    }
    @media (max-width: 768px) {
        width:40px;
    }
    @media (max-width: 500px) {
        width:15px;
        img{
            width:20px;
            border-radius: 5px;
            height: 50px;


        }
    }
  `;

  const FixedId = styled.div`
  width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: black;
    color: white;
    z-index: 110;
  ` 

  const Wrapper = styled.div`
  width: 100%;
  display: flex;
    justify-content: center;    
  `
  const SelectCarrouselEspa = styled.div`
  width: 30%;
  display: flex;
    justify-content: center; 
    border:2px solid #5b6eff;
    border-radius: 10px;  
    align-items:center;
    gap: 8%;
  `

    const {accountLevel, nftByLevel, paymentContract} = useSelector(state => state.web3)

    const [selectedLevel, setSelectedLevel] = useState(1)
    const [nft, setNft] = useState([])

    const [myPosition, setMyPosition] = useState([])
    const [myPosittionBool, setMyPositionBool] = useState(false)

    const [firstChild, setFirstChild] = useState([])
    const [firstChildBool, setFirstChildBool] = useState(false)

    const [secondChild, setSecondChild] = useState([])
    const [secondChildBool, setSecondChildBool] = useState(false)

    const [thirdChild, setThirdChild] = useState([])
    const [thirdChildBool, setThirdChildBool] = useState(false)

    const [firstGrandChild, setFirstGrandChild] = useState([])
    const [firstGrandChildBool, setFirstGrandChildBool] = useState(false)

    const [secondGrandChild, setSecondGrandChild] = useState([])
    const [secondGrandChildBool, setSecondGrandChildBool] = useState(false)

    const [thirdGrandChild, setThirdGrandChild] = useState([])
    const [thirdGrandChildBool, setThirdGrandChildBool] = useState(false)

    const [fourthGrandChild, setFourthGrandChild] = useState([])
    const [fourthGrandChildBool, setFourthGrandChildBool] = useState(false)

    const [fifthGrandChild, setFifthGrandChild] = useState([])
    const [fifthGrandChildBool, setFifthGrandChildBool] = useState(false)

    const [sixthGrandChild, setSixthGrandChild] = useState([])
    const [sixthGrandChildBool, setSixthGrandChildBool] = useState(false)

    const [seventhGrandChild, setSeventhGrandChild] = useState([])
    const [seventhGrandChildBool, setSeventhGrandChildBool] = useState(false)

    const [eighthGrandChild, setEighthGrandChild] = useState([])
    const [eighthGrandChildBool, setEighthGrandChildBool] = useState(false)

    const [ninthGrandChild, setNinthGrandChild] = useState([])
    const [ninthGrandChildBool, setNinthGrandChildBool] = useState(false)

  
    const getMatrixPosition = async () => {
        try{
        if (nft && paymentContract) {
    
            const Mypost = await paymentContract.getMyPosition(nft);

            

            setMyPosition({
                id: parseInt(Mypost.id),
                level: parseInt(Mypost.level),
                father: parseInt(Mypost.father),
                position: parseInt(Mypost.position),
                childrens: Mypost.children
            })
            setMyPositionBool(true)
        }
        }catch(error){
            console.log("error", error)
        }
    }

   

    const getMatrixChilds = async (position, id) => {
        try{
        if (paymentContract) {
            //console.log("trigger")
            const child = await paymentContract.getMyPosition(id.toString());
            const resp = {
                id: parseInt(child.id),
                level: parseInt(child.level),
                father: parseInt(child.father),
                position: parseInt(child.position),
                childrens: child.children
            }
            if(position === 1){
                setFirstChild(resp)
                setFirstChildBool(true)
            }
            if(position === 2){
                setSecondChild(resp)
                setSecondChildBool(true)
            }
            if(position === 3){
                setThirdChild(resp)
                setThirdChildBool(true)
            }
            if(position === 4){
                setFirstGrandChild(resp)
                setFirstGrandChildBool(true)
            }
            if(position === 5){
                setSecondGrandChild(resp)
                setSecondGrandChildBool(true)
            }
            if(position === 6){
                setThirdGrandChild(resp)
                setThirdGrandChildBool(true)
            }
            if(position === 7){
                setFourthGrandChild(resp)
                setFourthGrandChildBool(true)
            }
            if(position === 8){
                setFifthGrandChild(resp)
                setFifthGrandChildBool(true)
            }
            if(position === 9){
                setSixthGrandChild(resp)
                setSixthGrandChildBool(true)
            }
            if(position === 10){
                setSeventhGrandChild(resp)
                setSeventhGrandChildBool(true)
            }
            if(position === 11){
                setEighthGrandChild(resp)
                setEighthGrandChildBool(true)
            }
            if(position === 12){
                setNinthGrandChild(resp)
                setNinthGrandChildBool(true)
            }
        }
        }catch(error){
            console.log("error", error)
        }
    }

    useEffect(() => {
        let NFT = 0
        if (nftByLevel) {
            setNft(nftByLevel[selectedLevel-1])
            NFT = nftByLevel[selectedLevel-1]
        }
    }, [nftByLevel, selectedLevel])

    useEffect(() => {
       if(accountLevel >= 1 && paymentContract && nft){
            getMatrixPosition()
       } 
    }, [accountLevel, paymentContract, nft])

    useEffect(() => {
        if(myPosittionBool){
        
        if(myPosition.childrens.length >= 1){
          getMatrixChilds(1 , myPosition.childrens[0])
        }
        if(myPosition.childrens.length >= 2){
          getMatrixChilds(2 , myPosition.childrens[1])
        }
        if(myPosition.childrens.length >= 3){
             getMatrixChilds(3 , myPosition.childrens[2])
        }}
    }, [myPosition, myPosittionBool])

    useEffect(() => {
        if(firstChildBool){
            //console.log("firstChild", firstChild)
        if(firstChild.childrens.length >= 1){
             getMatrixChilds(4 , firstChild.childrens[0])
        }
        if(firstChild.childrens.length >= 2){
       
           getMatrixChilds( 5 , firstChild.childrens[1])
       
        }
        if(firstChild.childrens.length >= 3){
              getMatrixChilds( 6 , firstChild.childrens[2])
        }}
    }, [firstChild, firstChildBool])

    useEffect(() => {
        if(secondChildBool){
        if(secondChild.childrens.length >= 1){
             getMatrixChilds( 7 , secondChild.childrens[0])
        }
        if(secondChild.childrens.length >= 2){
            getMatrixChilds( 8 , secondChild.childrens[1])
     
        }
        if(secondChild.childrens.length >= 3){
             getMatrixChilds( 9 , secondChild.childrens[2])
        }}
    }, [secondChild, secondChildBool])

    useEffect(() => {
        if(thirdChildBool){
        if(thirdChild.childrens.length >= 1){
             getMatrixChilds( 10 , thirdChild.childrens[0])

        }
        if(thirdChild.childrens.length >= 2){
            getMatrixChilds( 11 , thirdChild.childrens[1])
        }
        if(thirdChild.childrens.length >= 3){
            getMatrixChilds( 12 , thirdChild.childrens[2])
        }}
    }, [thirdChild, thirdChildBool])

    const changeLevel = (e) => {
        setSelectedLevel(e.target.value)
        setFirstChildBool(false)
        setSecondChildBool(false)
        setThirdChildBool(false)
        setFirstGrandChildBool(false)
        setSecondGrandChildBool(false)
        setThirdGrandChildBool(false)
        setFourthGrandChildBool(false)
        setFifthGrandChildBool(false)
        setSixthGrandChildBool(false)
        setSeventhGrandChildBool(false)
        setEighthGrandChildBool(false)
        setNinthGrandChildBool(false)
    }



  return (
    <Matrix>
        <SelectCarrousel>   
        <SelectCarrouselEspa>
        <p>NFT Level</p>

            <select onChange={(e) => changeLevel(e)} value={selectedLevel}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
            {/* <div>
                search address: <input type="text" />
                <button>search</button>
            </div> */}
        
            </SelectCarrouselEspa>
        </SelectCarrousel>
        {/*{accountLevel >= selectedLevel ? */}
        <MatrixBox>
        <Tree lineWidth={'2px'} lineColor={mode?'white':'#2d2dcd'} lineBorderRadius={'10px'}>
            <TreeNode label={
            <StyledNode>
                <img src={myPosition ? NFTs[myPosition.level-1] : backImg} alt="nft" />
                {/*<FixedId>
                ID: {myPosition.id}
                </FixedId>*/}
            </StyledNode>}>

                <TreeNode label={
                    <StyledNode>
                     <img src={firstChildBool ? NFTs[firstChild.level-1] : backImg} alt="nft" />
                     {/*<FixedId>
                        ID: {firstChild.id}
                        </FixedId>*/}
                    </StyledNode>}>

                    <TreeNode label={
                        <StyledNode>
                        <img src={firstGrandChildBool ? NFTs[firstGrandChild.level-1] : backImg} alt="nft" />
                        {/*<FixedId>
                        ID: {firstGrandChild.id}
                        </FixedId>*/}
                        </StyledNode>}/>

                    <TreeNode label={
                    <StyledNode>
                        <img src={secondGrandChildBool ? NFTs[secondGrandChild.level-1] : backImg} alt="nft" />
                        {/*<FixedId>
                        ID: {secondGrandChild.id}
                        </FixedId>*/}
                    </StyledNode>}/>
                    <TreeNode label={<StyledNode>
                        <img src={thirdGrandChildBool ? NFTs[thirdGrandChild.level-1] : backImg} alt="nft" />
                        {/*<FixedId>
                        ID: {thirdGrandChild.id}
                        </FixedId>*/}
                    </StyledNode>}/>

                </TreeNode>
                <TreeNode label={<StyledNode>
                    <img src={secondChildBool ? NFTs[secondChild.level-1] : backImg} alt="nft" />
                    {/*<FixedId>
                    ID: {secondChild.id}
                    </FixedId>*/}
                    </StyledNode>}>
                    <TreeNode label={<StyledNode>
                        <img src={fourthGrandChildBool ? NFTs[fourthGrandChild.level-1] : backImg} alt="nft" />
                        {/*<FixedId>
                        ID: {fourthGrandChild.id}
                        </FixedId>*/}
                        </StyledNode>}/>
                    <TreeNode label={<StyledNode>
                        <img src={fifthGrandChildBool ? NFTs[fifthGrandChild.level-1] : backImg} alt="nft" />
                        {/*<FixedId>
                        ID: {fifthGrandChild.id}
                        </FixedId>*/}
                        </StyledNode>}/>
                    <TreeNode label={<StyledNode>
                        <img src={sixthGrandChildBool ? NFTs[sixthGrandChild.level-1] : backImg} alt="nft" />
                        {/*<FixedId>
                        ID: {sixthGrandChild.id}
                        </FixedId>*/}
                        </StyledNode>}/>

                </TreeNode>
                <TreeNode label={<StyledNode>
                    <img src={thirdChildBool ? NFTs[thirdChild.level-1] : backImg} alt="nft" />
                    {/*<FixedId>
                    ID: {thirdChild.id}
                    </FixedId>*/}
                    </StyledNode>}>
                    <TreeNode label={
                    <StyledNode>
                        <img src={seventhGrandChildBool ? NFTs[seventhGrandChild.level-1] : backImg} alt="nft" />
                        {/*<FixedId>
                        ID: {seventhGrandChildBool.id}
                        </FixedId>*/}
                    </StyledNode>}/>
                    <TreeNode label={<StyledNode>
                        <img src={eighthGrandChildBool ? NFTs[eighthGrandChild.level-1] : backImg} alt="nft" />
                        {/*<FixedId>
                        ID: {eighthGrandChildBool.id}
                        </FixedId>*/}
                        </StyledNode>}/>
                    <TreeNode label={<StyledNode>
                        <img src={ninthGrandChildBool ? NFTs[ninthGrandChild.level-1] : backImg} alt="nft" />
                        {/*<FixedId>
                        ID: {ninthGrandChildBool.id}
                        </FixedId>*/}
                        </StyledNode>}/>
                </TreeNode>
            </TreeNode>
        </Tree>
        </MatrixBox>
        {/*: 

        <Wrapper>
           <h3>Dont have access to this level</h3>         
        </Wrapper>
        }*/}
    </Matrix>
  )
}

export default Matrix