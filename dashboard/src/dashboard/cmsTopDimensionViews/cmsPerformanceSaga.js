import {call,put,takeLatest} from "redux-saga/effects";
import {fetchCMSDimensionPerformance, wait} from "../../services/api";

function* getCMSDimensionPerformance(action){
    if(action.actionType != 'fetch'){
        yield call(wait, action.timeInterval);
    }
    yield put({type:"CMS_TOP_DIMENSION_FETCH"});
    try{
        const cmsDimensionPerformanceData = yield call(fetchCMSDimensionPerformance,action);
        if(cmsDimensionPerformanceData && !cmsDimensionPerformanceData.error){
            yield put({type:"CMS_TOP_DIMENSION_DATA_UPDATE",dimensionData:cmsDimensionPerformanceData.response,dimension:action.dimensionSelection});
        }
        if(cmsDimensionPerformanceData && cmsDimensionPerformanceData.error)
            yield put({type:"CMS_TOP_DIMENSION_FETCH_FAILED",isLoading:false});
    }catch(error) {
        console.log(error);
        yield put({type:"CMS_TOP_DIMENSION_FETCH_FAILED",isLoading:false});
    }
}

export function* cmsDimensionPerformanceDataWatch() {
    yield takeLatest("CMS_DIMENSION_PERFORMANCE_DATA_UPDATE_WATCHER", getCMSDimensionPerformance);
}
