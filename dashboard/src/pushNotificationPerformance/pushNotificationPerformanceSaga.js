import {call, put, takeLatest, all} from "redux-saga/effects";
import {
    fetchGraphPushInfluencedTablePieViews, fetchOpenRateNonDashboard, fetchReachNonDashboard, fetchActiveDevicesNonDashboard,
    fetchPushInfluencedViewsNonDashboard
} from "../services/api";


function* getPushNotificationPerformance(action) {
    yield put({type: "PUSH_NOTIFICATION_PERFORMANCE_DATA_FETCH"});
    try {
        const [openRate, totalReach, activeDevices, pushInfluencedViews, pushInfluencedTableViews] =
            yield all([call(fetchOpenRateNonDashboard, action),
                call(fetchReachNonDashboard, action),
                call(fetchActiveDevicesNonDashboard, action),
                call(fetchPushInfluencedViewsNonDashboard, action),
                call(fetchGraphPushInfluencedTablePieViews, action)]);
        let pushPerformanceData = {};
        if (!openRate.error) {
            pushPerformanceData["openRate"] = openRate.response;
        }
        if (!totalReach.error) {
            pushPerformanceData["totalReach"] = totalReach.response;
        }
        if (!activeDevices.error) {
            pushPerformanceData["activeDevices"] = activeDevices.response;
        }
        if (!pushInfluencedViews.error) {
            pushPerformanceData["pushInfluencedViews"] = pushInfluencedViews.response;
        }
        if (!pushInfluencedTableViews.error) {
            pushPerformanceData["pushInfluencedTableViews"] = pushInfluencedTableViews.response;
        }
        if (openRate.error && totalReach.error && activeDevices.error && activeDevices.error && pushInfluencedTableViews.error )
            yield put({type: "PUSH_NOTIFICATION_PERFORMANCE_DATA_FETCH_FAILED"});
        else{
            yield put({type: "PUSH_NOTIFICATION_PERFORMANCE_DATA_UPDATE", pushPerformanceData: pushPerformanceData});
        }
    }
    catch (error) {
        console.log(error);
        yield put({type: "PUSH_NOTIFICATION_PERFORMANCE_DATA_FETCH_FAILED"});
    }
}

function* getPushNotificationPerformanceTable(action) {
    yield put({type: "PUSH_NOTIFICATION_PERFORMANCE_TABLE_DATA_FETCH"});
    try {
        const pushInfluencedTableViews = yield call(fetchGraphPushInfluencedTablePieViews, action);
        let pushPerformanceData = {};
        if (!pushInfluencedTableViews.error) {
            pushPerformanceData["pushInfluencedTableViews"] = pushInfluencedTableViews.response;
        }
        if (pushInfluencedTableViews.error )
            yield put({type: "PUSH_NOTIFICATION_PERFORMANCE_TABLE_DATA_FETCH_FAILED"});
        else{
            yield put({type: "PUSH_NOTIFICATION_PERFORMANCE_TABLE_DATA_UPDATE", pushPerformanceData: pushPerformanceData,dimension:action.dimension});
        }
    }
    catch (error) {
        console.log(error);
        yield put({type: "PUSH_NOTIFICATION_PERFORMANCE_TABLE_DATA_FETCH_FAILED"});
    }
}

export function* pushNotificationPerformanceAnalyticsDataWatch() {
    yield takeLatest("PUSH_NOTIFICATION_PERFORMANCE_DATA_UPDATE_WATCHER", getPushNotificationPerformance);
}

export function* pushNotificationPerformanceTableDataWatch() {
    yield takeLatest("PUSH_NOTIFICATION_PERFORMANCE_TABLE_DATA_UPDATE_WATCHER", getPushNotificationPerformanceTable);
}