export const UPDATE_NUMBER_OF_SIGNED_UP_USERS = 'UPDATE_NUMBER_OF_SIGNED_UP_USERS';
export const UPDATE_LATEST_POSTS = 'UPDATE_LATEST_POSTS';


const updateNumberOfUsers = (usersList) => {
    return {
        type: UPDATE_NUMBER_OF_SIGNED_UP_USERS,
        payload: usersList
    }
}

const updateLatestPosts = (postsList) => {
    return {
        type: UPDATE_LATEST_POSTS,
        payload: postsList
    }
}

export {updateNumberOfUsers, updateLatestPosts};