const initialState = {
    isLoading: false,
    showModal: false,
    isRedirect: false,
    addUserAPIError: null,
};

function addUserData(state = initialState, action) {
    switch (action.type) {
        case "ADD_USER_DATA_UPDATE":
            return Object.assign({}, state, {
                isLoading: false,
                showModal: true,
                isRedirect: true,
                addUserAPIError: "Add User Request Is successfully sent",
            });
            break;
        case "ADD_USER_DATA_FETCH":
            return Object.assign({}, state, {
                isLoading: true
            });
            break;
        case "ADD_USER_DATA_FETCH_FAILED":
            return Object.assign({}, state, {
                isLoading: false,
                showModal: false,
                isRedirect: false,
                addUserAPIError: (action.error == "Something bad happened") ? "This email is already registered" : "error",
            });
            break;
        case "CLEAR_ADD_USER_ERROR":
            return Object.assign({}, state, {                
                showModal: false,
                addUserAPIError: null,
                addUserAPISuccess: false
            })
        default:
            return state
    }
}


module.exports = {
    addUserData
};