import { ethers } from "ethers"

const partnerLoading = () => {
    return {
        type: 'PARTNER_LOADING',
    }
}

const partnerLoaded = (payload) => {
    return {
        type: 'PARTNER_LOADED',
        payload,
    }
}

const partnerError = (payload) => {
    return {
        type: 'PARTNER_ERROR',
        payload,
    }
}


export const getPartner = () => async (dispatch, getState) => {
    dispatch(partnerLoading());
    try {
        const {partnerContract, account} = getState().web3
        const getPartners = await partnerContract.getPartners()
        const getOrbe = await partnerContract.getOrbe()
        //console.log(getPartners)

        let youArePartner = false
        
        getPartners.map((partner) => {
            if(partner == account.address){
                youArePartner = true
            }
        }
        )
        getOrbe.map((orbe) => {
            if(orbe == account.address){
                youArePartner = true
            }
        }
        )

        if(youArePartner){
            let Balances = []
            let myBalance = 0
            const balances = await partnerContract.getAllBalance()
            balances.map((balance) => {
                Balances.push({
                    amount: parseFloat(ethers.utils.formatEther(balance.amount)),
                    user: balance.user
                })
                if(balance.user == account.address){
                    myBalance = parseFloat(ethers.utils.formatEther(balance.amount))
                }
            })

            //console.log(Balances)
            dispatch(partnerLoaded({
                partnerContract: partnerContract,
                partnersBalance: Balances,
                youArePartner: youArePartner,
                myBalance: myBalance,
            }))
            }
    }catch(error){
        console.log(error)
        dispatch(partnerError(error.message))
    }
}



        
     
