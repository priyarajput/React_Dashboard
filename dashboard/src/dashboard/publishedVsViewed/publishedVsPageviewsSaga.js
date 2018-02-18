import { call, put, takeLatest } from "redux-saga/effects";
import {
    fetchPublishedVsPageviews, wait
} from "../../services/api";

function* getPublishedVsPageviews(action) {
    if(action.actionType != 'fetch'){
        yield call(wait, action.timeInterval);
    }
    yield put({ type: "PUBLISHED_VS_PAGEVIEWS_FETCH" });
    try {
        const publishedVsPageviews = yield call(fetchPublishedVsPageviews, action);
        if (publishedVsPageviews && !publishedVsPageviews.error) {
            yield put({ type: "PUBLISHED_VS_PAGEVIEWS_DATA_UPDATE", publishedVsPageViewsData: publishedVsPageviews.response });
        }
        if (publishedVsPageviews && publishedVsPageviews.error)
            yield put({ type: "PUBLISHED_VS_PAGEVIEWS_FETCH_FAILED" });
    }
    catch (error) {
        console.log(error);
        yield put({ type: "PUBLISHED_VS_PAGEVIEWS_FETCH_FAILED" });
    }
}

export function* publishedVsPageviewsDataWatch() {
    yield takeLatest("PUBLISHED_PAGEVIEWS_DATA_UPDATE_WATCHER", getPublishedVsPageviews);
}