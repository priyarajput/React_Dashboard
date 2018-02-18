import {call,put,takeLatest} from "redux-saga/effects";
import {
    fetchCMSPerformanceIndex
} from "../../../services/api";

function* getCMSCategoryListData(action){
    try{
        yield put({type:"CATEGORY_ANALYTICS_LIST_FETCH"});
        const categoryListData = yield call(fetchCMSPerformanceIndex,action);

        if(!categoryListData.error){
            yield put({type:"CATEGORY_ANALYTICS_LIST_DATA_UPDATE",tableData:categoryListData.response});
        }
        else{
            yield put({type:"CATEGORY_ANALYTICS_LIST_FETCH_FAILED"});
        }
    }catch(error) {
        console.log(error);
        yield put({type:"CATEGORY_ANALYTICS_LIST_FETCH_FAILED"});
    }
}

export function* cmsCategoryListWatcher() {
    yield takeLatest('CATEGORY_ANALYTICS_LIST_DATA_UPDATE_WATCHER',getCMSCategoryListData);
}
