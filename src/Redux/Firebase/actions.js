export const CHECK_AUTH_STATE = 'CHECK_AUTH_STATE';

export const checkAuthState = (authUser) => {
    console.log('authUser from action', authUser);
    return {
        type: CHECK_AUTH_STATE,
        payload: authUser
    }
}
