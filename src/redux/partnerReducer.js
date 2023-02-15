const initialState = {
    partnerContract: null,
    partnersBalance: [],
    partnerLoaded: false,
    error: false,
    errorMessage: null,
    youArePartner: false,
    partnerLoading: false,
    myBalance: 0,
}

export default function partnerReducer(state = initialState, action) {
    switch (action.type){
        case 'PARTNER_LOADING':
            return {
                ...state,
                partnerLoaded: false,
                error: false,
                errorMessage: null,
                partnerLoading: true,
            }
        case 'PARTNER_LOADED':
            return {
                ...state,
                partnerContract: action.payload,
                partnersBalance: action.payload,
                partnerLoaded: true,
                error: false,
                errorMessage: null,
                partnerLoading: false,
                youArePartner: true,
                myBalance: action.payload.myBalance,
            }
        case 'PARTNER_ERROR':
            return {
                ...state,
                partnerLoaded: false,
                error: true,
                errorMessage: action.payload,
                partnerLoading: false,
            }
        
        default:
            return state;
        }

    }