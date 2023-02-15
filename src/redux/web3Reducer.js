const InitialState = {
    connected: false,
    account: null,
    balance : null,
    loading : false,
    error: false, 
    errorMessage: null,
    tokenContract: null,
    paymentContract: null,
    partnerContract: null,
    accountLevel: null,
    referalPlans: null,
    investmentPlans: null,
    provider: null,
    referalsCounter: 0,
    totalSupply: null,
    allAccounts: null,
    nftByLevel: null,
    referalPerLevel: []
}

const web3Reducer = (state = InitialState, action) => {
    switch (action.type) {
        case 'LOADING_ACCOUNT':
            return {
                ...state,
                loading: true
            }
        case 'LOADING_SUCCESS':
            return {
                ...state,
                loading: false,
                connected: true,
                account: action.payload.account,
                balance : action.payload.balance,
                provider: action.payload.provider,
                signer: action.payload.signer,
                tokenContract: action.payload.tokenContract,
                paymentContract: action.payload.paymentContract,
                partnerContract: action.payload.partnerContract,
                accountLevel: action.payload.accountLevel,
                referalPlans: action.payload.referalPlans,
                investmentPlans: action.payload.investmentPlans,
                referalsCounter: action.payload.referalsCounter,
                totalSupply: action.payload.totalSupply,
                allAccounts: action.payload.allAccounts,
                nftByLevel: action.payload.nftByLevel,
                referalPerLevel: action.payload.referalPerLevel
            }

        case 'ERROR':
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: action.payload.errorMessage
            }

        case 'LOGOUT_ACCOUNT':
            return {
                ...state,
                loading: false,
                connected: false,
                account: null,
                balance : null
            }

        default:
            return state
    }
}


export default web3Reducer

    

           