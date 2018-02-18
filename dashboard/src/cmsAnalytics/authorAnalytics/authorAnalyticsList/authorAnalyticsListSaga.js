import {call,put,takeLatest} from "redux-saga/effects";
import {
    fetchCMSPerformanceIndex
} from "../../../services/api";

function* getCMSListData(action){
    try{
        yield put({type:"AUTHOR_ANALYTICS_LIST_FETCH"});
        const authorListData = yield call(fetchCMSPerformanceIndex,action);

        if(!authorListData.error){
            yield put({type:"AUTHOR_ANALYTICS_LIST_DATA_UPDATE",tableData:authorListData.response});
        }
        else{
            yield put({type:"AUTHOR_ANALYTICS_LIST_FETCH_FAILED"});
        }
    }catch(error) {
        console.log(error);
        yield put({type:"AUTHOR_ANALYTICS_LIST_FETCH_FAILED"});
    }
}

export function* cmsListWatcher() {
    yield takeLatest('AUTHOR_ANALYTICS_LIST_DATA_UPDATE_WATCHER',getCMSListData);
}
