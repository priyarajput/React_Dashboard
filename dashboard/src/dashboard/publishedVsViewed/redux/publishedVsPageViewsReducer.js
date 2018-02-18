function publishedVsPageViews(state = {isLoading: true}, action) {
    switch (action.type) {
        case "PUBLISHED_VS_PAGEVIEWS_DATA_UPDATE":
            return Object.assign({}, state, {
                publishedVsPageViewsData:action.publishedVsPageViewsData,
                isLoading:false
            });
            break;
        case "PUBLISHED_VS_PAGEVIEWS_FETCH":
            return Object.assign({}, state, {
                isLoading: true
            });
            break;
        case "PUBLISHED_VS_PAGEVIEWS_FETCH_FAILED":
            return Object.assign({}, state, {
                isLoading: false
            });
            break;
        default:
            return state
    }
}

module.exports={
    publishedVsPageViews
};

