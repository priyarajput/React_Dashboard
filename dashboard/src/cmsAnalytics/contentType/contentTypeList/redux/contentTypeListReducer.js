function contentTypeListData(state = {tableData:[],isLoading:true}, action) {
    switch (action.type) {
        case "CONTENT_TYPE_LIST_DATA_UPDATE":
            return Object.assign({}, state, {
                tableData: action.tableData,
                isLoading: false
            });
            break;
        case "CONTENT_TYPE_LIST_FETCH":
            return Object.assign({}, state, {
                isLoading: true
            });
            break;
        case "CONTENT_TYPE_LIST_FETCH_FAILED":
            return Object.assign({}, state, {
                isLoading: false
            });
            break;
        default:
            return state
    }
}

module.exports = {
    contentTypeListData
};

