import {UPDATE_NUMBER_OF_SIGNED_UP_USERS, UPDATE_LATEST_HAPPINESS_POSTS, UPDATE_LATEST_TROUBLES_POSTS} from "./actions";

const INITIAL_STATE = {
    numUsers: 0,
    happinessPosts: [],
    troublesPosts: []
}

export const publicReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_NUMBER_OF_SIGNED_UP_USERS:
            return {...state, numUsers: action.payload.length}
        case UPDATE_LATEST_HAPPINESS_POSTS:
            return {...state, happinessPosts: action.payload}
        case UPDATE_LATEST_TROUBLES_POSTS:
            return {...state, troublesPosts: action.payload}
        default:
            return state;
    }
};