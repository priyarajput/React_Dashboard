import {call,put,takeLatest,all} from "redux-saga/effects";
import {
    fetchContentListByAuthor, fetchPublishedByCategory, fetchPublishedByType,
    fetchPageviewsTimeseries,fetchPublishedTimeseries
} from "../../../services/api";

function* getAuthorDetailViewData(action){
    try{
        yield put({type:"AUTHOR_ANALYTICS_DETAIL_VIEW_FETCH"});
        const [pageviews,publishedViews,publishedByCategory,publishedByType,contentList] = yield all([call(fetchPageviewsTimeseries,action),
                                                                                        call(fetchPublishedTimeseries,action),
                                                                                        call(fetchPublishedByCategory,action),
                                                                                        call(fetchPublishedByType,action),
                                                                                        call(fetchContentListByAuthor,action)]);
        let authorDetailData={pageviews:[],publishedViews:[],publishedByCategory:[],publishedByType:[],contentList:[]};
        if(!pageviews.error){
            authorDetailData.pageviews=pageviews.response;
        }
        if(!publishedViews.error){
            authorDetailData.publishedViews=publishedViews.response;
        }
        if(!publishedByCategory.error){
            authorDetailData.publishedByCategory=publishedByCategory.response;
        }
        if(!publishedByType.error){
            authorDetailData.publishedByType=publishedByType.response;
        }
        if(!contentList.error){
            authorDetailData.contentList=contentList.response;
        }

        if(pageviews.error && publishedViews.error && publishedByCategory.error && publishedByType.error && contentList.error)
            yield put({type:"AUTHOR_ANALYTICS_DETAIL_VIEW_FETCH_FAILED"});
        else
            yield put({type:"AUTHOR_ANALYTICS_DETAIL_VIEW_DATA_UPDATE",
                authorDetailData:authorDetailData});
    }catch(error) {
        console.log(error);
        yield put({type:"AUTHOR_ANALYTICS_DETAIL_VIEW_FETCH_FAILED"});
    }
}

export function* authorDetailViewWatcher() {
    yield takeLatest('AUTHOR_ANALYTICS_DETAIL_VIEW_DATA_UPDATE_WATCHER',getAuthorDetailViewData);
}
