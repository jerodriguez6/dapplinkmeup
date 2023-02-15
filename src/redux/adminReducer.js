const initialState = {
    paymentContract: null,
    tokenContract: null,
    adminLoading: false,
    adminLoaded: false,
    error: false,
    errorMessage: null,
    allInvestments: [],
    allRewards: [],
    adminRewards: [],
}

export default function adminReducer(state = initialState, action) {
    switch (action.type){
        case 'ADMIN_LOADING':
            return {
                ...state,
                adminLoaded: false,
                error: false,
                errorMessage: null,
                adminLoading: true,
            }
        case 'ADMIN_LOADED':
            return {
                ...state,
                paymentContract: action.payload.paymentContract,
                adminLoaded: true,
                error: false,
                errorMessage: null,
                adminLoading: false,
                allInvestments: action.payload.allInvestments,
                allRewards: action.payload.allRewards,
                tokenContract: action.payload.tokenContract,
                adminRewards: action.payload.adminRewards,
            }
        case 'ADMIN_ERROR':
            return {
                ...state,
                adminLoaded: false,
                error: true,
                errorMessage: action.payload,
                adminLoading: false,
            }
        
        default:
            return state;
        }

    }