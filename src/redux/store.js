import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import adminReducer from "./adminReducer";
import partnerReducer from "./partnerReducer";
import web3Reducer from "./web3Reducer";

const rootReducer = combineReducers({
    web3: web3Reducer,
    partner: partnerReducer,
    admin: adminReducer
});

const middleware = [thunk];
const composeEnhancers = compose(applyMiddleware(...middleware));

const configureStore = () => {
    return createStore(rootReducer, composeEnhancers);
}

const store = configureStore();

export default store;