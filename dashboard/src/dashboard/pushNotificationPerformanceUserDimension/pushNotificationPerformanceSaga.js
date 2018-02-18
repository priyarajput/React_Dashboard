import {call,put,takeLatest} from "redux-saga/effects";
import {
    fetchPushPerformanceDimension, wait
} from "../../services/api";

function* getPushPerformanceDimension(action){
    try{
        yield call(wait, action.timeInterval);
        yield put({type:"DIMENSION_PERFORMANCE_FETCH"});
        const pushPerformanceDimension = yield call(fetchPushPerformanceDimension,action);

        if(pushPerformanceDimension  && !pushPerformanceDimension.error){
            yield put({type:"DIMENSION_PERFORMANCE_DATA_UPDATE",dimensionPerformance:pushPerformanceDimension.response});
        }else{
            yield put({type:"DIMENSION_PERFORMANCE_FETCH_FAILED"});
        }
    }catch(error) {
        console.log(error);
        yield put({type:"DIMENSION_PERFORMANCE_FETCH_FAILED"});
    }
}

export function* pushNotificationPerformanceDimensionDataWatch() {
    yield takeLatest("PUSH_NOTIFICATION_PERFORMANCE_DIMENSION_DATA_UPDATE_WATCHER", getPushPerformanceDimension);
}

