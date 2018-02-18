function contentMasterUpdate(state = [], action) {
    switch (action.type) {
        case "CONTENT_METADATA_REFRESH_DATA":
            return Object.assign({}, state, {
                content: action.content
            });
            break;
        default:
            return state
    }
}

module.exports = {
    contentMasterUpdate
};