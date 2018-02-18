function cmsTopContentByDimension(state = {isLoading: true}, action) {


    switch (action.type) {
        case "CMS_TOP_DIMENSION_DATA_UPDATE":
            let assign = Object.assign({}, state, {
                cmsDimensionContainerDimensionToDisplay: action.dimension,
                cmsDimensionContainerDimensionData: action.dimensionData?action.dimensionData.map(eachItem => getData(eachItem)):[],
                cmsDimensionContainerDimensionDataTotal: action.dimensionData.length>0?action.dimensionData.map(item => getCount(item)).reduce(getTotal):action.dimensionData,
                isLoading:false
            });
            return assign;
            break;
        case "CMS_TOP_DIMENSION_FETCH":
            return Object.assign({}, state, {
                isLoading: true
            });
            break;
        case "CMS_TOP_DIMENSION_FETCH_FAILED":
            return Object.assign({}, state, {
                isLoading: false
            });
            break;
        default:
            return state
    }

    function getTotal(prev, next) {
        return prev + next;

    }

    function getCount(item) {
        return item.event.count;

    }


    function getData(eachItem) {
        return {"dimensionName": eachItem.event.dimension, "count": eachItem.event.count}
    }
}


module.exports = {
    cmsTopContentByDimension
};

