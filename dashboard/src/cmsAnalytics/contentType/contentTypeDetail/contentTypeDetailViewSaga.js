/**
 * Created by bluepi12 on 8/9/17.
 */
import {call,put,takeLatest,all} from "redux-saga/effects";
import {
    fetchPublishedByAuthor, fetchContentListByType, fetchPublishedByCategory,
    fetchPageviewsTimeseries,fetchPublishedTimeseries

} from "../../../services/api";


function* getContentTypeDetailViewData(action){

    try{
        yield put({type:"CONTENT_TYPE_DETAIL_VIEW_FETCH"});
        const [pageviews,publishedViews,publishedByAuthor,publishedByCategory,contentList] = yield all([call(fetchPageviewsTimeseries,action),
            call(fetchPublishedTimeseries,action),
            call(fetchPublishedByAuthor,action),
            call(fetchPublishedByCategory,action),
            call(fetchContentListByType,action)]);
        console.log('publishedByAuthor,publishedByCategory',publishedByAuthor,publishedByCategory);
        let contentTypeDetailData={pageviews:[],publishedViews:[],publishedByAuthor:[],publishedByCategory:[],contentList:[]};
        if(!pageviews.error){
            contentTypeDetailData.pageviews=pageviews.response;
        }
        if(!publishedViews.error){
            contentTypeDetailData.publishedViews=publishedViews.response;
        }
        if(!publishedByAuthor.error){
            contentTypeDetailData.publishedByAuthor=publishedByAuthor.response;
        }
        if(!publishedByCategory.error){
            contentTypeDetailData.publishedByCategory=publishedByCategory.response;
        }
        if(!contentList.error){
            contentTypeDetailData.contentList=contentList.response;
        }

        if(pageviews.error && publishedViews.error && publishedByAuthor.error && publishedByCategory.error && contentList.error)
            yield put({type:"CONTENT_TYPE_DETAIL_VIEW_FETCH_FAILED"});
        else
            yield put({type:"CONTENT_TYPE_DETAIL_VIEW_DATA_UPDATE",
                contentTypeDetailData:contentTypeDetailData});
    }catch(error) {
        console.log(error);
        yield put({type:"CONTENT_TYPE_DETAIL_VIEW_FETCH_FAILED"});
    }
}

export function* contentTypeDetailViewWatcher() {
    yield takeLatest('CONTENT_TYPE_DETAIL_VIEW_DATA_UPDATE_WATCHER',getContentTypeDetailViewData);
}
