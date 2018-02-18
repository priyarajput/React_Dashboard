const initialState = {
    content: [],
    tableData: [],
    sortMetric: {sortByValue: "pageViews", sortByLabel: "Page Views"},
    expandedChild: {},
    graphAggregatedOn: {label: "City", value: "city"},
    isLoadingTable:true,
    isLoadingGraph:true,
    isLoadingViews:true
};

function topStory(state = initialState, action) {
    switch (action.type) {
        case 'TOP_STORY_TABLE_DATA_UPDATE':
            return Object.assign({}, state, {
                tableData: action.topStory,
                isLoadingTable:false,
                expandedChild:{}
            });
            break;

        case 'TOP_STORY_TABLE_GRAPH_DIMENSIONAL_DATA_UPDATE':
            return Object.assign({}, state, {
                dimensionalData: action.data,
                isLoadingGraph:false
            });
            break;

        case 'TOP_STORY_TABLE_SORT_VALUE_UPDATE':
            return Object.assign({}, state, {sortMetric: action.sortMetric});
            break;

        case 'TOP_STORY_DETAILED_VIEW_EXPAND_STATE':
            return Object.assign({}, state, {expandedChild: action.expandedChild});
            break;

        case 'TOP_STORY_DETAILED_VIEW_GRAPH_AGGREGATE':
            return Object.assign({}, state, {graphAggregatedOn: action.graphAggregatedOn});
            break;

        case "TOP_STORY_TABLE_DATA_FETCH":
            return Object.assign({}, state, {
                isLoadingTable: true
            });
            break;

        case "TOP_STORY_TABLE_DATA_FETCH_FAILED":
            return Object.assign({}, state, {
                isLoadingTable: false,
                tableData:[],
                expandedChild:{}
            });
            break;

        case "TOP_STORY_TABLE_GRAPH_DIMENSIONAL_DATA_FETCH":
            return Object.assign({}, state, {
                isLoadingGraph: true
            });
            break;

        case "TOP_STORY_TABLE_GRAPH_DIMENSIONAL_DATA_FETCH_FAILED":
            return Object.assign({}, state, {
                isLoadingGraph: false
            });
            break;

        case "TOP_STORY_PIV_DATA_UPDATE":
            let PIVNumber = action.data?((action.data[0].result.sessionCount/action.data[0].result.count)*100):0;
            return Object.assign({}, state, {
                pushInfluencedViews: PIVNumber,
                isLoadingViews:false
            });
            break;

        case "TOP_STORY_PIV_DATA_FETCH_FAILED":
            return Object.assign({}, state, {
                pushInfluencedViews:0,
                isLoadingViews:false
            });
            break;

        case "TOP_STORY_PIV_DATA_FETCH":
            return Object.assign({}, state, {
                pushInfluencedViews:0,
                isLoadingViews:true
            });
            break;
        default:
            return state;
    }
}

module.exports = {
    topStory
};