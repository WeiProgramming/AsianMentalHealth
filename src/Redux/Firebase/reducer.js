import Firebase from '../../Constants/firebase';
import {firebaseConfig} from "../../configuration";
import {CHECK_AUTH_STATE} from "./actions";


const INITIAL_STATE = {
    fireBase: new Firebase(firebaseConfig),
    authUser: null,
    isSignedIn: false
}

export const firebaseReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHECK_AUTH_STATE:
            return {...state, isSignedIn: (action.payload ? true : false), authUser: (action.payload ? action.payload : null)}
        default:
            return state;
    }
}