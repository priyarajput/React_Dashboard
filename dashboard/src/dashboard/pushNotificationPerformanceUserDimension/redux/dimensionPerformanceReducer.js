const initialState = {
    dimensionPerformance: [],
    dimensionSelection: {dimensionKeyValue:"country",dimensionKeyLabel:"Country"},
    isLoading: true
};
function dimensionPerformanceData(state = initialState, action) {
    switch (action.type) {
        case "DIMENSION_PERFORMANCE_DATA_UPDATE":
            return Object.assign({},state,{
                dimensionPerformance:action.dimensionPerformance,
                isLoading:false
            });
            break;

        case "DIMENSION_PERFORMANCE_SELECTION_UPDATE":
            return Object.assign({},state,{dimensionSelection:action.dimensionSelection});
            break;

        case "DIMENSION_PERFORMANCE_FETCH":
            return Object.assign({}, state, {
                isLoading: true
            });
            break;

        case "DIMENSION_PERFORMANCE_FETCH_FAILED":
            return Object.assign({}, state, {
                isLoading: false
            });
            break;

        default:
            return state
    }
}

module.exports = {
    dimensionPerformanceData
};
