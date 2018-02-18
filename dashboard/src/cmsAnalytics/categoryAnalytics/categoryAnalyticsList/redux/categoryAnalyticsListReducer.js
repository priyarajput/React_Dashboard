function categoryAnalyticsListData(state = {tableData:[],isLoading:true}, action) {
    switch (action.type) {
        case "CATEGORY_ANALYTICS_LIST_DATA_UPDATE":
            return Object.assign({}, state, {
                tableData: action.tableData,
                isLoading: false
            });
            break;
        case "CATEGORY_ANALYTICS_LIST_FETCH":
            return Object.assign({}, state, {
                isLoading: true
            });
            break;
        case "CATEGORY_ANALYTICS_LIST_FETCH_FAILED":
            return Object.assign({}, state, {
                isLoading: false
            });
            break;
        default:
            return state
    }
}

module.exports = {
    categoryAnalyticsListData
};

