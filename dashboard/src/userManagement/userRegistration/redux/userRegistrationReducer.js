const initialState = {
    userDetails: {},
    isPasswordChanged: false,
    error: null,
};

function userRegistrationData(state = initialState, action) {
    switch (action.type) {
        case "USER_REGISTRATION_TOKEN_DATA_FETCH":
            return Object.assign({}, state, {
                userDetails: {},
                isPasswordChanged: false
            })
        case "USER_REGISTRATION_TOKEN_DATA_UPDATE":
            return Object.assign({}, state, {
                userDetails: action.data,
                error: null
            })
        case "USER_REGISTRATION_TOKEN_DATA_FETCH_FAILED":
            return Object.assign({}, state, {
                userDetails: {},
                error: ""
            });
            break;
        case "USER_REGISTRATION_DATA_UPDATE":
            return Object.assign({}, state, {
                isPasswordChanged: true
            });
            break;
        case "USER_REGISTRATION_DATA_FETCH":
            return Object.assign({}, state, {
                isPasswordChanged: false
            });
            break;
        case "USER_REGISTRATION_DATA_FETCH_FAILED":
            return Object.assign({}, state, {
                isPasswordChanged: false
            });
            break;
        case "CLEAR_CREATED_PASSWORD_ERROR":
            return Object.assign({}, state, {
                error: null,
                isPasswordChanged: false
            })
        default:
            return state

    }
}


module.exports = {
    userRegistrationData
};
