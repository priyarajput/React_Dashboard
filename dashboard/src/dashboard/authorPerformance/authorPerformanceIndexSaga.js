import {all, call, put, takeLatest} from "redux-saga/effects";
import {fetchAuthorPerformanceSparkLine, fetchAuthorPerformanceIndex, wait} from "../../services/api";

function* getAuthorPerformanceIndexAndSparkline(action){
    try{
        yield call(wait, action.timeInterval);
        yield put({type:"AUTHOR_PERFORMANCE_FETCH"});
        const authorPerformanceData = yield call(fetchAuthorPerformanceIndex,action);

        if(authorPerformanceData && !authorPerformanceData.error){
            let authorNameList = authorPerformanceData.response.map(author => author.dimension.replace(/['"]+/g, ''));
            const authorSparkLine = yield call(fetchAuthorPerformanceSparkLine,action,authorNameList.splice(0,5));
            yield all([put({type:"AUTHOR_PERFORMANCE_DATA_UPDATE",authorPerformanceData:authorPerformanceData.response.splice(0,5)}),
                put({type:"AUTHOR_PERFORMANCE_PAGEVIEWS_DATA_UPDATE",authorPageViewsData:authorSparkLine.response})]);
        }
        else{
            yield put({type:"AUTHOR_PERFORMANCE_FETCH_FAILED"});
        }
    }catch(error) {
        yield put({type:"AUTHOR_PERFORMANCE_FETCH_FAILED"});
    }
}

export function* authorPerformanceDataWatch() {
    yield takeLatest('AUTHOR_PERFORMANCE_DATA_UPDATE_WATCHER',getAuthorPerformanceIndexAndSparkline);
}
