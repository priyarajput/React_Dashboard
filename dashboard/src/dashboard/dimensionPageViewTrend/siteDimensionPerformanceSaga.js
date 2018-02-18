import {call,put,takeLatest} from "redux-saga/effects";
import {
    fetchDimensionPageviews, wait
} from "../../services/api";

function* getDimensionPageviews(action){
    try{
        yield call(wait, action.timeInterval);
        yield put({type:"DEVICE_DIMENSION_FETCH"});
        const dimensionpageviews = yield call(fetchDimensionPageviews,action);
        if(dimensionpageviews && !dimensionpageviews.error){
            yield put({type:"DEVICE_DIMENSION_PAGEVIEWS_DATA_UPDATE",dimensionPageviews:dimensionpageviews.response});
        }
        else
            yield put({type:"DEVICE_DIMENSION_FETCH_FAILED"});
    }catch(error) {
        console.log(error);
        yield put({type:"DEVICE_DIMENSION_FETCH_FAILED"});
    }
}


export function* dimensionPageviewsDataWatch() {
    yield takeLatest("DEVICE_DIMENSION_PAGEVIEWS_DATA_UPDATE_WATCHER", getDimensionPageviews);
}
