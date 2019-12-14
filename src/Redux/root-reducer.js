import {combineReducers} from 'redux';
import {numberReducer} from "./Test/reducers";

const rootReducer = combineReducers({
    number: numberReducer
});

export default rootReducer;