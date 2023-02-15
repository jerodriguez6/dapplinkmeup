import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import tokenAbi from "../web3/testToken.json";
import paymentAbi from "../web3/paymentAbi.json";
import partner from "../web3/partner.json";
import nftAbi from "../web3/nftAbi.json";

const CONTRACTS = [
    "0xae2d69B63DCAB6B9deAdD1fDc8EeE779C5E4C5ef", //token
    "0xa25AE51e305cB21D53900f32AaC7eECC58f6fBE4", //partner
    "0xF556EefBcadA9b19D9A0367404C53B8E019D56cF", //matrix
    "0x6dfEd9BcCFA8b9AEDCeBB9038718F7cc31A6BB73" //nft
]

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider,
        options: {
            rpc: {
                8001: "https://rpc-mumbai.maticvigil.com",

                //137: "https://rpc-mainnet.maticvigil.com",
            },
        }
    }
};

const web3Modal = new Web3Modal({
    disableInjectedProvider: false,
    cacheProvider: true,
    providerOptions // required
});


const loadingAccount = () => {
    return {
        type: 'LOADING_ACCOUNT'
    }
}

const loadingSuccess = (payload) => {
    return {
        type: 'LOADING_SUCCESS',
        payload: payload
    }
}

const errorMsg = (payload) => {
    return {
        type: 'ERROR',
        payload: payload
    }
}

const logoutAccount = () => {
    return {
        type: 'LOGOUT_ACCOUNT'
    }
}

export const connectWallet = () => {
    return async (dispatch) => {
        try {
            dispatch(loadingAccount())
            const instance = await web3Modal.connect(providerOptions);
            const provider = new ethers.providers.Web3Provider(instance);
            const signer = provider.getSigner();
            try {

                const accounts = await provider.listAccounts();

                const networkID = await provider.getNetwork();
                const network = networkID.chainId;
                //console.log(network);
                if(network == 80001){
                    //console.log("Mumbai Network");
                const balance = await provider.getBalance(accounts[0]);
                const balanceInEth = ethers.utils.formatEther(balance);

                const tokenContract = new ethers.Contract( CONTRACTS[0], tokenAbi, signer);
                const partnerContract = new ethers.Contract( CONTRACTS[1], partner, signer);
                const paymentContract = new ethers.Contract( CONTRACTS[2], paymentAbi, signer);
                const nftContract = new ethers.Contract( CONTRACTS[3], nftAbi, signer);

                const AccountLevel  = await paymentContract.accountLevel(accounts[0]);
               
                const accountLevel = parseInt(AccountLevel);
           
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
                let referalPlans = [];
                
                for(let i=0; i<10; i++){
                    const plan = await paymentContract.referalPlans(accounts[0], i+1);
                    referalPlans.push({
                        account: plan.account,
                        level: parseInt(plan.level),
                        balance: parseInt(ethers.utils.formatEther(plan.balance)),
                        accountCap: parseInt(ethers.utils.formatEther(plan.accountCap)),
                        banned: plan.banned,
                        desactivatedDate:  trasformDate(parseInt(plan.desactivatedDate)),
                        referer: plan.referer,
                        retireCap: parseInt(ethers.utils.formatEther(plan.retireCap)),
                        status: plan.status
                    });
                }


                

                let investmentPlans = [];
                for(let i=0; i<accountLevel; i++){
                    const plan = await paymentContract.getMyInvestmentPlan(accounts[0], i+1);
                    investmentPlans.push({
                        account: plan.account,
                        level: parseInt(plan.level),
                        date: trasformDate(parseInt(plan.date)),
                        generatedOrder: plan.generatedOrder,
                        payed: plan.payed,
                        userRetired: plan.userRetired,
                        banned: plan.banned,
                        timestamp: parseInt(plan.date),
                        canceled: plan.canceled,
                        cancelDate: trasformDate(parseInt(plan.cancelDate))
                    });
                }

                let referalsCounter = 0;
                let referalPerLevel = [];
                for(let i=0; i<accountLevel; i++){
                    const NUMBER = await paymentContract.countMyReferals(accounts[0], i+1);
                    //console.log("NUMBER", NUMBER)
                    const number = parseInt(NUMBER);
                    const refer = await paymentContract.getReferralHistories(accounts[0], i+1);
                   // console.log("REFER", refer)

                    if(refer.length > 0){
                        refer.map(async(address, index) => {
                            const statusRef = await paymentContract.referalPlans(address, i+1);
                            const countReferals = await paymentContract.countMyReferals(address, i+1);
                            referalPerLevel.push({
                                address : address,
                                level : i+1,
                                status: statusRef.status,
                                countReferals: parseInt(countReferals)
                            })
                        })
                    }
                    referalsCounter += number;
                }

                let nftByLevel = [];
                for(let i=0; i<accountLevel; i++){
                    const nft = await nftContract.getNftByLevel(accounts[0], i+1);
                    nftByLevel.push(nft);
                }

                

                const TotalSupply = await nftContract.totalSupply();
                const totalSupply = parseInt(TotalSupply);

                const allAccounts = await paymentContract.getAllAccount();
                console.log("ALL ACCOUNTS", allAccounts);
        
                  

                const account = {
                    address: accounts[0],
                    balance: balanceInEth,
                    network: network
                }

                dispatch(loadingSuccess({
                    account: account,
                    provider: provider,
                    signer: signer,
                    tokenContract: tokenContract,
                    paymentContract: paymentContract,
                    partnerContract: partnerContract,
                    accountLevel: accountLevel,
                    referalPlans: referalPlans,
                    investmentPlans: investmentPlans,
                    referalsCounter: referalsCounter,
                    totalSupply: totalSupply,
                    allAccounts: allAccounts,
                    nftByLevel: nftByLevel,
                    referalPerLevel: referalPerLevel

                }))

                instance.on("accountsChanged", async (accounts) => {
                    dispatch(logoutAccount())
                });

            }else{
                //switch network
                alert("Please switch to the Polygon network")
                try{
                await provider.send("wallet_switchEthereumChain", [{ chainId: "0x13881" }]);
                }catch(error){
                    console.log(error)
                    if (error.code === 4902) {
                        try {
                            await provider.send("wallet_addEthereumChain", [
                                {
                                    chainId: "0x13881",
                                    chainName: "Mumbai Testnet",
                                    nativeCurrency: {
                                        name: "MATIC",
                                        symbol: "MATIC",
                                        decimals: 18,
                                    },
                                    rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
                                    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
                                },
                            ]);
                        } catch (addError) {
                            console.log(addError)
                        }
                    }
                }
            }

                instance.on("chainChanged", async (chainId) => {
                    const network = chainId;
                    const balance = await provider.getBalance(accounts[0]);
                    const balanceInEth = ethers.utils.formatEther(balance);

                    const account = {
                        address: accounts[0],
                        balance: balanceInEth,
                        network: network
                    }

                    dispatch(loadingSuccess({
                        account: account,
                        provider: provider,
                        signer: signer

                    }))
                });

                instance.on("disconnect", (error, payload) => {
                    dispatch(logoutAccount())
                });

            } catch (error) {
                dispatch(errorMsg(error))
                console.log(error)
            }
        } catch (error) {
            dispatch(errorMsg(error))
            console.log(error)
        }
    }
}



export const Logout = () => {
    return async (dispatch) => {
        web3Modal.clearCachedProvider();
        dispatch(logoutAccount())

    }
}


