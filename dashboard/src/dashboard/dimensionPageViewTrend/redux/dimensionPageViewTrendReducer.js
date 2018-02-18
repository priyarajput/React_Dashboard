const initialState = {
    dimensionSelection: {dimensionKeyLabel: "City", dimensionKeyValue: "city"},
    isLoading:true
};
function dimensionPageviewTrend(state = initialState, action) {
    switch (action.type) {
        case 'DEVICE_DIMENSION_PAGEVIEWS_DATA_UPDATE':
            return Object.assign({}, state, {
                dimensionPageviews: action.dimensionPageviews,
                isLoading:false
            });
            break;
        case 'DEVICE_DIMENSION_SELECTION_UPDATE':
            return Object.assign({}, state, {dimensionSelection: action.dimensionSelection});
            break;
        case "DEVICE_DIMENSION_FETCH":
            return Object.assign({}, state, {
                isLoading: true
            });
            break;
        case "DEVICE_DIMENSION_FETCH_FAILED":
            return Object.assign({}, state, {
                dimensionPageviews:{},
                isLoading: false
            });
            break;
        default:
            return state
    }
}


module.exports = {
    dimensionPageviewTrend
};

