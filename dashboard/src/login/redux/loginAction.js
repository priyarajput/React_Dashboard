import { browserHistory } from 'react-router';

export function loginError(error) {
    return{
        type:"LOGGED_FAILED",
        error
    }
}

export function authenticated(isAuthenticated){
    return{
        type:"IS_AUTHENTICATED",
        isAuthenticated
    }
}

export function setRedirectUrl(currentUrl){
    return {
        type:"SET_REDIRECT_URL",
        currentUrl
    }
}

export function updateUserData(user){
    return{
        type:"LOGGED_SUCCESSFULLY",
        user
    }
}

export function logout() {
    return{
        type:"LOGOUT"
    }
}

export function loginSuccess(user,redirectUrl) {
    if(redirectUrl){
        browserHistory.push(redirectUrl);
    }else{
        browserHistory.push('/dashboard');
    }
    return{
        type:"LOGGED_SUCCESSFULLY",
        user
    }
}

export function clearError(){
    return {
        type:"CLEAR_ERROR"
    }
}

export function isLoggedInAction(){
    return{
        type:"IS_LOGGED_IN"
    }
}

export function loginAttempt(authHash,redirectUrl,history){
    return{
        type:"LOGIN_ATTEMPT",
        authHash,
        redirectUrl,
        history
    }
}