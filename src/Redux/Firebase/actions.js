export const CHECK_AUTH_STATE = 'CHECK_AUTH_STATE';

// Check auth state would boolean signedIn or Off and add in the userObj
export const checkAuthState = (authUser) => {
    console.log('authUser from action', authUser);
    return {
        type: CHECK_AUTH_STATE,
        payload: authUser
    }
}