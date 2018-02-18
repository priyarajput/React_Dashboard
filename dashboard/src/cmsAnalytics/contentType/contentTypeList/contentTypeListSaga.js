import {call,put,takeLatest} from "redux-saga/effects";
import {
    fetchCMSPerformanceIndex
} from "../../../services/api";

function* getCMSContentTypeListData(action){
    try{
        yield put({type:"CONTENT_TYPE_LIST_FETCH"});
        const authorListData = yield call(fetchCMSPerformanceIndex,action);

        if(!authorListData.error){
            yield put({type:"CONTENT_TYPE_LIST_DATA_UPDATE",tableData:authorListData.response});
        }
        else{
            yield put({type:"CONTENT_TYPE_LIST_FETCH_FAILED"});
        }
    }catch(error) {
        console.log(error);
        yield put({type:"CONTENT_TYPE_LIST_FETCH_FAILED"});
    }
}

export function* cmsContentTypeListWatcher() {
    yield takeLatest('CONTENT_TYPE_LIST_DATA_UPDATE_WATCHER',getCMSContentTypeListData);
}
