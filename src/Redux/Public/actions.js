export const UPDATE_NUMBER_OF_SIGNED_UP_USERS = 'UPDATE_NUMBER_OF_SIGNED_UP_USERS';

const updateNumberOfUsers = (usersList) => {
    return {
        type: UPDATE_NUMBER_OF_SIGNED_UP_USERS,
        payload: usersList
    }
}

export {updateNumberOfUsers};