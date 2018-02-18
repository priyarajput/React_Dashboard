function authorPerformanceData(state = {authorArray:[],isLoading:true}, action) {
    switch (action.type) {
        case "AUTHOR_PERFORMANCE_DATA_UPDATE":
            return Object.assign({}, state, {
                authorArray: action.authorPerformanceData,
                isLoading: false
            });
            break;
        case "AUTHOR_PERFORMANCE_FETCH":
            return Object.assign({}, state, {
                isLoading: true
            });
            break;
        case "AUTHOR_PERFORMANCE_FETCH_FAILED":
            return Object.assign({}, state, {
                isLoading: false
            });
            break;
        default:
            return state
    }
}

function authorPageViewsData(state = {authorPageViewsDataArray:[],isLoading:true}, action) {
    switch (action.type) {
        case "AUTHOR_PERFORMANCE_PAGEVIEWS_DATA_UPDATE":
            return Object.assign({}, state, {
                authorPageViewsDataArray: action.authorPageViewsData
            });
            break;
        default:
            return state
    }
}

module.exports = {
    authorPerformanceData, authorPageViewsData
};

