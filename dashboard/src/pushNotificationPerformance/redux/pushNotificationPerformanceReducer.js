import {
    transformToTable
} from  '../utilityMethods/dataManipulation';

const initialState = {
    dimension: {dimensionKeyLabel: "State", dimensionKeyValue: "state"},
    isLoading:true,
    isLoadingTable:false,
    tableData:[],
    graphData:[],
    originalTableData:[],
    originalGraphData:[]
};
function pushNotificationPerformanceData(state = initialState, action) {
    switch (action.type) {

        case "PUSH_NOTIFICATION_PERFORMANCE_DATA_UPDATE":
            const totalOpen = action.pushPerformanceData.openRate && action.pushPerformanceData.openRate.length>0 ? action.pushPerformanceData.openRate.reduce(getSum) : 0;
            let value = action.pushPerformanceData.totalReach ? action.pushPerformanceData.totalReach.result.totalSent : 0;
            let pnSent = action.pushPerformanceData.totalReach ? action.pushPerformanceData.totalReach.result.totalNotiSent : 0;
            let totalReach = value < 0 ? value * -1 : value;
            let pushInfluencedView = action.pushPerformanceData.pushInfluencedViews ? (action.pushPerformanceData.pushInfluencedViews.result.pushInfluencedViews) * 100 : 0;
            let totalPageViews = action.pushPerformanceData.pushInfluencedViews ? action.pushPerformanceData.pushInfluencedViews.result.totalPageViews : 0;
            let sessionPageViews = action.pushPerformanceData.pushInfluencedViews ? action.pushPerformanceData.pushInfluencedViews.result.sessionPageViews : 0;
            return Object.assign({}, state, {
                pushViews: pushInfluencedView,
                activeDevices: action.pushPerformanceData.activeDevices && action.pushPerformanceData.activeDevices.length>0 ? action.pushPerformanceData.activeDevices.reduce(getSumActive).activeUsers : 0,
                totalReach: totalReach,
                totalOpen: totalOpen.count,
                pviCount: sessionPageViews,
                ctrCount: action.pushPerformanceData.activeDevices && action.pushPerformanceData.activeDevices.length>0 ? action.pushPerformanceData.activeDevices.reduce(getSumCTR).ctrCount : 0,
                pnSent:pnSent,
                pageViews: totalPageViews,
                isLoading: false,
                tableData: transformToTable(action.pushPerformanceData.pushInfluencedTableViews),
                originalTableData:action.pushPerformanceData.pushInfluencedTableViews
            });
            break;

        case "PUSH_NOTIFICATION_PERFORMANCE_DATA_FETCH":
            return Object.assign({}, state, {
                isLoading: true
            });
            break;

        case "PUSH_NOTIFICATION_PERFORMANCE_DATA_FETCH_FAILED":
            return Object.assign({}, state, {
                isLoading: false
            });
            break;
        case "PUSH_NOTIFICATION_PERFORMANCE_TABLE_DATA_UPDATE":
            return Object.assign({}, state, {
                isLoadingTable: false,
                tableData: transformToTable(action.pushPerformanceData.pushInfluencedTableViews),
                originalTableData:action.pushPerformanceData.pushInfluencedTableViews,
                dimension:action.dimension
            });
            break;

        case "PUSH_NOTIFICATION_PERFORMANCE_TABLE_DATA_FETCH":
            return Object.assign({}, state, {
                isLoadingTable: true
            });
            break;

        case "PUSH_NOTIFICATION_PERFORMANCE_TABLE_DATA_FETCH_FAILED":
            return Object.assign({}, state, {
                isLoadingTable: false
            });
            break;
        default:
            return state
    }
}

function getSum(timeSnap, data) {
    let sum = timeSnap.count + data.count;
    return { count: sum };
}

function getSumActive(timeSnap, data) {
    let sum = timeSnap.activeUsers + data.activeUsers;
    return { activeUsers: sum };
}

function getSumCTR(timeSnap, data) {
    let sum = timeSnap.ctrCount + data.ctrCount;
    return { ctrCount: sum };
}

module.exports = {
    pushNotificationPerformanceData
};

