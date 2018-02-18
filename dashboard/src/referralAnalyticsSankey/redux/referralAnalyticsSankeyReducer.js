import {
    transformDataOrigin,getPageViews,getUsers,getSession,
    getOrigin,getMedium,getIndex,getFlowAndNodes
} from  '../utilityMethods/utilityMethod';

const initialState = {
    graphData:[],
    selectedMetricTab:"pageViews",
    isLoading: true
};
function referralAnalyticsSankeyData(state = initialState, action) {

    switch (action.type) {
        case "REFERRAL_ANALYTICS_SANKEY_DIMENSION_DATA_UPDATE":
        let transformData=transformDataOrigin(action.graphData,getOrigin,getMethodFromTabSelection(state.selectedMetricTab),getValueFromTabSelection(state.selectedMetricTab))
            return Object.assign({}, state, {
                graphData:action.graphData,
                graphNodes: transformData.distinctNodes,
                graphFlows: transformData.flows,
                isLoading: false,
            });
            break;
        case "REFERRAL_ANALYTICS_SANKEY_DIMENSION_DATA_FETCH":
            return Object.assign({}, state, {
                isLoading: true
            });
            break;
        case "REFERRAL_ANALYTICS_SANKEY_DIMENSION_DATA_FETCH_FAILED":
            return Object.assign({}, state, {
                isLoading: false
            });
            break;
        case 'REFERRAL_ANALYTICS_SANKEY_METRICS_TAB_SELECTION_UPDATE':
            let transformedDataOnTabSelection  = transformDataOrigin(state.graphData,getOrigin,getMethodFromTabSelection(action.selectedMetricTab.selectedMetricTab),getValueFromTabSelection(action.selectedMetricTab.selectedMetricTab));
            return Object.assign({}, state, {
                selectedMetricTab: action.selectedMetricTab.selectedMetricTab,
                graphNodes: transformedDataOnTabSelection.distinctNodes,
                graphFlows: transformedDataOnTabSelection.flows
            });
            break;
        default:
            return state
    }
}

function getMethodFromTabSelection(tabView){
    switch (tabView) {
        case "pageViews":
            return getPageViews;
        case "users":
            return getUsers;
        case "session":
            return getSession;
    }
}

function getValueFromTabSelection(tabView){
    switch (tabView) {
        case "pageViews":
            return "pageViews";
        case "users":
            return "users";
        case "session":
            return "session";
    }
}

module.exports = {
    referralAnalyticsSankeyData
};

