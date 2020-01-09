export const UPDATE_NUMBER_OF_SIGNED_UP_USERS = 'UPDATE_NUMBER_OF_SIGNED_UP_USERS';
export const UPDATE_LATEST_HAPPINESS_POSTS = 'UPDATE_LATEST_HAPPINESS_POSTS';
export const UPDATE_LATEST_TROUBLES_POSTS = 'UPDATE_LATEST_TROUBLES_POSTS';


const updateNumberOfUsers = (usersList) => {
    return {
        type: UPDATE_NUMBER_OF_SIGNED_UP_USERS,
        payload: usersList
    }
}

const updateLatestHappinessPosts = (postsList) => {
    return {
        type: UPDATE_LATEST_HAPPINESS_POSTS,
        payload: postsList
    }
}

const updateLatestTroublesPosts = (postsList) => {
    return {
        type: UPDATE_LATEST_TROUBLES_POSTS,
        payload: postsList
    }
}

export {updateNumberOfUsers, updateLatestHappinessPosts, updateLatestTroublesPosts};