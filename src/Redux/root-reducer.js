import {combineReducers} from 'redux';
import {firebaseReducer} from "./Firebase/reducer";
import {publicReducer} from "./Public/reducer";

const rootReducer = combineReducers({
    fireBase: firebaseReducer,
    public: publicReducer
});

export default rootReducer;