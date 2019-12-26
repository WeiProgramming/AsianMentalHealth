import {UPDATE_NUMBER_OF_SIGNED_UP_USERS, UPDATE_LATEST_POSTS} from "./actions";

const INITIAL_STATE = {
    numUsers: 0,
    posts: null
}

export const publicReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_NUMBER_OF_SIGNED_UP_USERS:
            return {...state, numUsers: action.payload.length}
        case UPDATE_LATEST_POSTS:
            return {...state, posts: action.payload}
        default:
            return state;
    }
};