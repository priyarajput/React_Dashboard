import {
    transformToGraph, uniqueBy,transformToTable
} from  '../utilityMethods/dataManipulation';

const initialState = {
    isLoading:true,
    isTableLoading:false,
    selectedGraphTab:"pageViews",
    selectedTableTab:"distribution",
    tableData:[],
    graphData:[],
    originalTableData:[],
    originalGraphData:[]
};
function dashboardTechnologyAnalyticsData(state = initialState, action) {
    switch (action.type) {

        case "DASHBOARD_TECHNOLOGY_ANALYTICS_GRAPH_LIST_DATA_UPDATE":
            return Object.assign({}, state, {
                isLoading: false,
                graphData: transformToGraph(action.dashboardTechnologyAnalyticsData.dashboardTechnologyGraphViews,getMethodFromGraphTabSelection(state.selectedGraphTab)),
                originalGraphData:action.dashboardTechnologyAnalyticsData.dashboardTechnologyGraphViews,
            });
            break;

        case "DASHBOARD_TECHNOLOGY_ANALYTICS_GRAPH_LIST_FETCH":
            return Object.assign({}, state, {
                isLoading: true
            });
            break;

        case "DASHBOARD_TECHNOLOGY_ANALYTICS_GRAPH_LIST_FETCH_FAILED":
            return Object.assign({}, state, {
                isLoading: false
            });
            break;
        case "DASHBOARD_TECHNOLOGY_ANALYTICS_TABLE_LIST_DATA_UPDATE":
            return Object.assign({}, state, {
                isTableLoading: false,
                tableData: transformToTable(action.dashboardTechnologyAnalyticsData.dashboardTechnologyTableViews),
                originalTableData:action.dashboardTechnologyAnalyticsData.dashboardTechnologyTableViews,
            });
            break;

        case "DASHBOARD_TECHNOLOGY_ANALYTICS_TABLE_LIST_FETCH":
            return Object.assign({}, state, {
                isTableLoading: true
            });
            break;

        case "DASHBOARD_TECHNOLOGY_ANALYTICS_TABLE_LIST_FETCH_FAILED":
            return Object.assign({}, state, {
                isTableLoading: false
            });
            break;    
        case "DASHBOARD_TECHNOLOGY_TABLE_LIST_DATA_UPDATE":
            return Object.assign({}, state, {
                selectedTableTab:action.dashboardTechnologyTableData.selectedTableTab,
                isTableLoading: false,
                tableData: transformToTable(action.dashboardTechnologyTableData.dashboardTechnologyTableViews),
                originalTableData:action.dashboardTechnologyTableData.dashboardTechnologyTableViews,
            });
            break;

        case "DASHBOARD_TECHNOLOGY_TABLE_LIST_FETCH":
            return Object.assign({}, state, {
                isTableLoading: true
            });
            break;

        case "DASHBOARD_TECHNOLOGY_TABLE_LIST_FETCH_FAILED":
            return Object.assign({}, state, {
                isTableLoading: false
            });
            break;
        case 'TECHNOLOGY_ANALYTICS_GRAPH_TAB_SELECTION_UPDATE':
            return Object.assign({}, state, {
                selectedGraphTab: action.selectedGraphTab.selectedGraphTab,
                graphData: transformToGraph(state.originalGraphData,getMethodFromGraphTabSelection(action.selectedGraphTab.selectedGraphTab)),
            });
            break;
        case 'TECHNOLOGY_ANALYTICS_TABLE_TAB_SELECTION_UPDATE':
            return Object.assign({}, state, {
                selectedTableTab: action.selectedTableTab.selectedTableTab,
            });
            break;    
        
        default:
            return state
    }
}


function getMethodFromGraphTabSelection(graphTabView){
    switch (graphTabView) {
        case "pageViews":
            return "pageViews";
        case "users":
            return "users";
        case "session":
            return "session";            
    }
}

module.exports = {
    dashboardTechnologyAnalyticsData
};

