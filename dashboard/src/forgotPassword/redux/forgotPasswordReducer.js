const initialState = {
    forgotAPISuccess: false,
    forgotAPIError: null
};
function forgotPasswordData(state = initialState, action) {
    switch (action.type) {
        case "FORGOT_PASSWORD_DATA_FETCH":
            return Object.assign({}, state, {
                forgotAPISuccess: false,
            })
        case "FORGOT_PASSWORD_DATA_UPDATE":
            return Object.assign({}, state, {
                forgotAPIError: null,
                forgotAPISuccess: true
            })
        case "FORGOT_PASSWORD_DATA_FETCH_FAILED":
            return Object.assign({}, state, {
                forgotAPIError: "This email is not registered with us.",
                forgotAPISuccess: false
            })
        case "CLEAR_FORGOT_ERROR":
            return Object.assign({}, state, {
                forgotAPIError: null,
                forgotAPISuccess: false
            })
        default:
            return state;
    }
}


module.exports = {
    forgotPasswordData
};