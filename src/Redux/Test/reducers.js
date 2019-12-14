import {UPDATE_NUMBER} from "./actions";

const INITIAL_STATE = {
    number: 0
}

export const numberReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case UPDATE_NUMBER:
            console.log(state)
            let curNum = state.number;
            return {...state, number: ++curNum}
        default:
            return state;
    }
}