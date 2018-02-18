function pushPerformance(state = {isLoading: true}, action) {
    switch (action.type) {
        case "PUSH_PERFORMANCE_DATA_UPDATE":
            const totalOpen = action.pushPerformanceData.openRate?action.pushPerformanceData.openRate.reduce(getSum):0;
            let openRateArray = action.pushPerformanceData.openRate?action.pushPerformanceData.openRate.map(timeSnap=>timeSnap.count):[];
            const pushViews = action.pushPerformanceData.pushInfluencedViews? (action.pushPerformanceData.pushInfluencedViews.result.pushInfluencedViews)*100:0;
            let value = action.pushPerformanceData.totalReach?action.pushPerformanceData.totalReach.result.totalSent:0;
            return Object.assign({}, state, {
                pushViews: pushViews,
                activeDevices: action.pushPerformanceData.activeDevices && action.pushPerformanceData.activeDevices.length>0 ? action.pushPerformanceData.activeDevices.reduce(getSumActive).activeUsers : 0,
                ctrCount: action.pushPerformanceData.activeDevices && action.pushPerformanceData.activeDevices.length>0 ? action.pushPerformanceData.activeDevices.reduce(getSumCTR).ctrCount : 0,
                totalReach: value<0?value*-1:value,
                openRateArray: openRateArray,
                totalOpen: totalOpen.count,
                isLoading: false
            });
            break;    

        case "PUSH_PERFORMANCE_FETCH":
            return Object.assign({}, state, {
                isLoading: true
            });
            break;

        case "PUSH_PERFORMANCE_FETCH_FAILED":
            return Object.assign({}, state, {
                isLoading: false
            });
            break;

        case "PUSH_PERFORMANCE_FETCH_SUCCESS":
            return Object.assign({}, state, {
                isLoading: false
            });
            break;

        default:
            return state
    }
}

function getSum(timeSnap, data) {
    let sum = timeSnap.count + data.count;
    return {count:sum};
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
    pushPerformance
};