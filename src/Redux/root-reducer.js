import {combineReducers} from 'redux';
import {firebaseReducer} from "./Firebase/reducer";

const rootReducer = combineReducers({
    fireBase: firebaseReducer
});

export default rootReducer;