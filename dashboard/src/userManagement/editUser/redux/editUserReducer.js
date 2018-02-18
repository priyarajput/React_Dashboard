const initialState = {
    isLoading: false,
    showModal: false,
    isRedirect: false,
    userId: '',
    editUserAPIError: null,
};

function editUserData(state = initialState, action) {
    switch (action.type) {
        case "EDIT_USER_DATA_UPDATE":
            return Object.assign({}, state, {
                isLoading: false,
                showModal: true,
                isRedirect: true,
                editUserAPIError: "User Request Is successfully updated",
            });
            break;
        case "EDIT_USER_DATA_FETCH":
            return Object.assign({}, state, {
                isLoading: true
            });
            break;
        case "EDIT_USER_DATA_FETCH_FAILED":
            return Object.assign({}, state, {
                isLoading: false,
                showModal: false,
                isRedirect: false,
                editUserAPIError: "error",
            });
            break;
        case "CLEAR_EDIT_USER_ERROR":
            return Object.assign({}, state, {
                showModal: false,
                editUserAPIError: null,
                editUserAPISuccess: false
            })

        case "EDIT_USER_EMAIL_ID":
            return Object.assign({}, state, {
                userId: action.userId
            })
        default:
            return state
    }
}


module.exports = {
    editUserData
};