import {
    transformToTableAndDropDown, getPageViews, transformToGraph, transformForPieChart, getUsers,
    getSession
} from  '../utilityMethods/utils';

const initialState = {
    referralDropDownList:[],
    referralDropDownSelection:{value:"",label:""},
    referralLevelAndValue:[],
    selectedMetricTab:"pageViews",
    cmsDimensionDropDownSelection:{value:"articleCategory",label:"Category"},
    isLoadingReferral: true,
    isLoadingPie: false,
    referralOriginalData:[],
    cmsReferralOriginalData:[],
    graphData:[],
    tableData:[],
    pieChartData:[],
    topFiveDimension:[],
};
function referralAnalyticsData(state = initialState, action) {

    switch (action.type) {
        case "REFERRAL_ANALYTICS_DIMENSION_DATA_UPDATE":
            let referralData  = action.referralData.dimensionReferralData;
            let transformedData  = transformToTableAndDropDown(referralData, getMethodFromTabSelection(state.selectedMetricTab));
            return Object.assign({}, state, {
                referralDropDownList : transformedData.uniqueDimensions,
                tableData: transformedData.tableResult,
                topFiveDimensions:transformedData.topFiveDimensions,
                referralLevelAndValue:action.referralLevelAndValue,
                referralDropDownSelection:action.referralDropDownSelection,
                graphData: transformToGraph(referralData,transformedData.topFiveDimensions,getMethodFromTabSelection(state.selectedMetricTab)),
                pieChartData:transformForPieChart(action.referralData.cmsReferralOriginalData,getMethodFromTabSelection(state.selectedMetricTab)),
                isLoadingReferral: false,
                referralOriginalData:action.referralData.dimensionReferralData,
                cmsReferralOriginalData:action.referralData.cmsReferralOriginalData
            });
            break;
        case "REFERRAL_ANALYTICS_DIMENSION_DATA_FETCH":
            return Object.assign({}, state, {
                isLoadingReferral: true
            });
            break;
        case "REFERRAL_ANALYTICS_DIMENSION_DATA_FETCH_FAILED":
            return Object.assign({}, state, {
                isLoadingReferral: false
            });
            break;
        case "REFERRAL_ANALYTICS_DIMENSION_PIE_CHART_DATA_UPDATE":
            return Object.assign({}, state, {
                cmsReferralOriginalData:action.cmsReferralOriginalData,
                pieChartData:transformForPieChart(action.cmsReferralOriginalData,getMethodFromTabSelection(state.selectedMetricTab)),
                cmsDimensionDropDownSelection: {value:action.cmsDimensionDropDownSelection.value,label:action.cmsDimensionDropDownSelection.label},
                isLoadingPie: false
            });
            break;
        case "REFERRAL_ANALYTICS_DIMENSION_PIE_CHART_DATA_FETCH":
            return Object.assign({}, state, {
                isLoadingPie: true
            });
            break;
        case "REFERRAL_ANALYTICS_DIMENSION_PIE_CHART_DATA_FETCH_FAILED":
            return Object.assign({}, state, {
                isLoadingPie: false
            });
            break;

        case 'REFERRAL_ANALYTICS_METRICS_TAB_SELECTION_UPDATE':
            let transformedDataOnTabSelection  = transformToTableAndDropDown(state.referralOriginalData, getMethodFromTabSelection(action.selectedMetricTab.selectedMetricTab));
            return Object.assign({}, state, {
                selectedMetricTab: action.selectedMetricTab.selectedMetricTab,
                topFiveDimensions:transformedDataOnTabSelection.topFiveDimensions,
                graphData: transformToGraph(state.referralOriginalData,transformedDataOnTabSelection.topFiveDimensions,getMethodFromTabSelection(action.selectedMetricTab.selectedMetricTab)),
                pieChartData:transformForPieChart(state.cmsReferralOriginalData,getMethodFromTabSelection(action.selectedMetricTab.selectedMetricTab))
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
        case "sessions":
            return getSession;
    }
}


module.exports = {
    referralAnalyticsData
};

