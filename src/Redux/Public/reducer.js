import {UPDATE_NUMBER_OF_SIGNED_UP_USERS} from "./actions";

const INITIAL_STATE = {
    numUsers: 0
}

export const publicReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_NUMBER_OF_SIGNED_UP_USERS:
            return {...state, numUsers: action.payload.length}
        default:
            return state;
    }
};