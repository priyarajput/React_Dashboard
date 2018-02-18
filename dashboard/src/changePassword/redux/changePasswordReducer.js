const initialState = {
    email: '',
    isPasswordChanged: false,
    error: null,
};

function changePasswordData(state = initialState, action) {
    switch (action.type) {
        case "CHANGE_PASSWORD_TOKEN_DATA_FETCH":
            return Object.assign({}, state, {
                email: '',
                isPasswordChanged: false
            })
        case "CHANGE_PASSWORD_TOKEN_DATA_UPDATE":
            return Object.assign({}, state, {
                email: action.data.email,
                error: null
            })
        case "CHANGE_PASSWORD_TOKEN_DATA_FETCH_FAILED":
            return Object.assign({}, state, {
                email: '',
                error: ""
            })
        case "CLEAR_CHANGE_PASSWORD_ERROR":
            return Object.assign({}, state, {
                error: null,
                isPasswordChanged: false
            })
        case "CHANGE_PASSWORD_FETCH":
            return Object.assign({}, state, {
                isPasswordChanged: false
            })
        case "CHANGE_PASSWORD_SUCCESS":
            return Object.assign({}, state, {
                isPasswordChanged: true
            })
        case "CHANGE_PASSWORD_FAILURE":
            return Object.assign({}, state, {
                isPasswordChanged: false,
            })

        default:
            return state;
    }
}


module.exports = {
    changePasswordData
};