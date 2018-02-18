/**
 * Created by bluepi12 on 7/9/17.
 */
import {call,put,takeLatest,all} from "redux-saga/effects";
import {
    fetchPublishedByAuthor, fetchContentListByCategory, fetchPublishedByType,
    fetchPageviewsTimeseries,fetchPublishedTimeseries
} from "../../../services/api";

function* getCategoryDetailViewData(action){

    try{
        yield put({type:"CATEGORY_ANALYTICS_DETAIL_VIEW_FETCH"});
        const [pageviews,publishedViews,publishedByAuthor,publishedByType,contentList] = yield all([call(fetchPageviewsTimeseries,action),
            call(fetchPublishedTimeseries,action),
            call(fetchPublishedByAuthor,action),
            call(fetchPublishedByType,action),
            call(fetchContentListByCategory,action)]);
        let categoryDetailData={pageviews:[],publishedViews:[],publishedByAuthor:[],publishedByType:[],contentList:[]};
        if(!pageviews.error){
            categoryDetailData.pageviews=pageviews.response;
        }
        if(!publishedViews.error){
            categoryDetailData.publishedViews=publishedViews.response;
        }
        if(!publishedByAuthor.error){
            categoryDetailData.publishedByAuthor=publishedByAuthor.response;
        }
        if(!publishedByType.error){
            categoryDetailData.publishedByType=publishedByType.response;
        }
        if(!contentList.error){
            categoryDetailData.contentList=contentList.response;
        }

        if(pageviews.error && publishedViews.error && publishedByAuthor.error && publishedByType.error && contentList.error)
            yield put({type:"CATEGORY_ANALYTICS_DETAIL_VIEW_FETCH_FAILED"});
        else
            yield put({type:"CATEGORY_ANALYTICS_DETAIL_VIEW_DATA_UPDATE",
                categoryDetailData:categoryDetailData});
    }catch(error) {
        console.log(error);
        yield put({type:"CATEGORY_ANALYTICS_DETAIL_VIEW_FETCH_FAILED"});
    }
}

export function* categoryDetailViewWatcher() {
    yield takeLatest('CATEGORY_ANALYTICS_DETAIL_VIEW_DATA_UPDATE_WATCHER',getCategoryDetailViewData);
}
