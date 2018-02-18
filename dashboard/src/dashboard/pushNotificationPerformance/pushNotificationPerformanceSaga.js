import {call,put,takeLatest,all} from "redux-saga/effects";
import {
    fetchActiveDevices, fetchOpenRate, fetchPushInfluencedViews, fetchReach, wait
} from "../../services/api";

function* getPushPerformance(action){
    yield call(wait, action.timeInterval);
    yield put({type:"PUSH_PERFORMANCE_FETCH"});
    try {
        const [openRate,totalReach,activeDevices,pushInfluencedViews] = yield all([call(fetchOpenRate,action),call(fetchReach,action),call(fetchActiveDevices,action),call(fetchPushInfluencedViews,action)]);
        let pushPerformanceData={};
        if(openRate && !openRate.error){
            pushPerformanceData["openRate"]=openRate.response;
        }
        if(totalReach && !totalReach.error){
            pushPerformanceData["totalReach"]=totalReach.response;
        }
        if(activeDevices && !activeDevices.error){
            pushPerformanceData["activeDevices"]=activeDevices.response;
        }
        if(pushInfluencedViews && !pushInfluencedViews.error){
            pushPerformanceData["pushInfluencedViews"]=pushInfluencedViews.response;
        }
        yield put({type:"PUSH_PERFORMANCE_DATA_UPDATE",pushPerformanceData:pushPerformanceData});
        if(openRate &&  openRate.error || totalReach && totalReach.error || activeDevices && activeDevices.error ||pushInfluencedViews && pushInfluencedViews.error)
            yield put({type:"PUSH_PERFORMANCE_FETCH_FAILED"});
    }
    catch(error) {
        console.log(error);
        yield put({type:"PUSH_PERFORMANCE_FETCH_FAILED"});
    }
}

export function* pushNotificationPerformanceDataWatch() {
    yield takeLatest("PUSH_PERFORMANCE_OPEN_RATE_DATA_UPDATE_WATCHER", getPushPerformance);
}