import {call,put,all,takeLatest} from "redux-saga/effects";
import {
    fetchContentMetaData, fetchPageviews, fetchPNMetaData, fetchSelectedContentDimension, fetchSelectedContentPIV,
    fetchTopContentAnalyticsByPageviews,
    fetchTopContentAnalyticsByPublication,
    fetchTopContentAnalyticsByPushNotification, wait
} from "../../services/api";

export function* getTopContentByPageviews(action){
    try{
        yield call(wait, action.timeInterval);
        yield put({type:"TOP_STORY_TABLE_DATA_FETCH"});
        const topContentPageviews = yield call(fetchTopContentAnalyticsByPageviews,action);
        if(topContentPageviews && !topContentPageviews.error){
            let contentStore=action.contentMetadata?action.contentMetadata:{};
            let pushNotificationStore=action.pushNotificationMetaData?action.pushNotificationMetaData:{};

            let contentLanguageMapForContent = topContentPageviews.response.filter(pageView=>!contentStore[pageView.language+"~"+pageView.articleId] && pageView.articleId!=="1").
                                                                                map(pageView => {
                                                                                    return {language:pageView.language,articleId:pageView.articleId};
                                                                                });
            let contentLanguageMapForPN = topContentPageviews.response.filter(pageView=>!pushNotificationStore[pageView.language+"~"+pageView.articleId] && pageView.articleId!=="1").
                                                                                map(pageView => {
                                                                                    return {language:pageView.language,articleId:pageView.articleId};
                                                                                });
            const [contentData,pushNotificationData] = yield all([call(fetchContentMetaData,action,contentLanguageMapForContent),
                                                                call(fetchPNMetaData,action,contentLanguageMapForPN)]);

            let mergedContent = Object.assign(contentData.response, contentStore);
            let mergedPushNotification = Object.assign(pushNotificationData.response, pushNotificationStore);

            yield [put({type:"CONTENT_METADATA_REFRESH_DATA",content:mergedContent}),
                put({type:"PUSH_NOTIFICATION_METADATA_REFRESH_DATA",pushNotification:mergedPushNotification}),
                put({type:"TOP_STORY_TABLE_DATA_UPDATE",topStory:topContentPageviews.response})];

        }
        else
            yield put({type:"TOP_STORY_TABLE_DATA_FETCH_FAILED"});
    }catch(error) {
        console.log(error);
        yield put({type:"TOP_STORY_TABLE_DATA_FETCH_FAILED"});
    }
}

export function* getTopContentByPublicationDate(action){
    try{
        yield call(wait, action.timeInterval);
        yield put({type:"TOP_STORY_TABLE_DATA_FETCH"});
        const topContentPublicationDate = yield call(fetchTopContentAnalyticsByPublication,action,"articles/language?limit="+action.limit);
        let contentStore=action.contentMetadata?action.contentMetadata:{};
        let pushNotificationStore=action.pushNotificationMetaData?action.pushNotificationMetaData:{};

        let apiContentData={};
        if(topContentPublicationDate && !topContentPublicationDate.error){
            let contentLanguageMap = topContentPublicationDate.response.map(content => {return {language:content.language,articleId:content.articleId}});
            let contentLanguageMapForPN = topContentPublicationDate.response.filter(pageView=>!pushNotificationStore[pageView.language+"~"+pageView.articleId]).
                                                                        map(pageView => {
                                                                            return {language:pageView.language,articleId:pageView.articleId};
                                                                        });
            apiContentData = topContentPublicationDate.response.reduce(function(returnObj,currentObj,index)  {
                                    let contentObj={};
                                    contentObj[currentObj.language+"~"+currentObj.articleId]=currentObj;
                                    return Object.assign(returnObj,contentObj)},{});
            const [pageViewsData,pushNotificationData] = yield all([call(fetchPageviews,action,contentLanguageMap),call(fetchPNMetaData,action,contentLanguageMapForPN)]);
            let mergedContent = Object.assign(apiContentData, contentStore);
            let mergedPushNotification = Object.assign(pushNotificationData.response, pushNotificationStore);
            yield [put({type:"CONTENT_METADATA_REFRESH_DATA",content:mergedContent}),
                put({type:"PUSH_NOTIFICATION_METADATA_REFRESH_DATA",pushNotification:mergedPushNotification}),
                put({type:"TOP_STORY_TABLE_DATA_UPDATE",topStory:pageViewsData.response})];
        }
        else
            yield put({type:"TOP_STORY_TABLE_DATA_FETCH_FAILED"});
    }catch(error) {
        console.log(error);
        yield put({type:"TOP_STORY_TABLE_DATA_FETCH_FAILED"});
    }
}

export function* getTopContentByPushSendDate(action){
    try{
        yield call(wait, action.timeInterval);
        yield put({type:"TOP_STORY_TABLE_DATA_FETCH"});
        const topContentPushSendDate = yield call(fetchTopContentAnalyticsByPushNotification,action,"pushNotification/language?limit="+action.limit);
        let contentStore=action.contentMetadata?action.contentMetadata:{};
        let pushNotificationStore=action.pushNotificationMetaData?action.pushNotificationMetaData:{};

        let apiPNData={};
        if(topContentPushSendDate && !topContentPushSendDate.error) {
            let contentLanguageMap = topContentPushSendDate.response.map(content => {
                return {language: content.pushNotification.language, articleId: content.pushNotification.contentId}
            });
            let contentLanguageMapForContent = topContentPushSendDate.response.filter(pageView=>!contentStore[pageView.pushNotification.language+"~"+pageView.pushNotification.contentId]).
                                                                                map(pageView => {
                                                                                    return {language:pageView.pushNotification.language,articleId:pageView.pushNotification.contentId};
                                                                                });
            apiPNData = topContentPushSendDate.response.reduce(function (returnObj, currentObj, index) {
                let contentObj = {};
                contentObj[currentObj.pushNotification.language + "~" + currentObj.pushNotification.contentId] = currentObj;
                return Object.assign(returnObj, contentObj)
            }, {});
            const [pageViewsData, contentData] = yield all([call(fetchPageviews, action, contentLanguageMap), call(fetchContentMetaData, action, contentLanguageMapForContent)]);
            let mergedContent = Object.assign(contentData.response, contentStore);
            let mergedPushNotification = Object.assign(apiPNData, pushNotificationStore);
            yield [put({type: "CONTENT_METADATA_REFRESH_DATA", content: mergedContent}),
                put({type: "PUSH_NOTIFICATION_METADATA_REFRESH_DATA", pushNotification: mergedPushNotification}),
                put({type: "TOP_STORY_TABLE_DATA_UPDATE", topStory: pageViewsData.response})];
        }
        else
            yield put({type:"TOP_STORY_TABLE_DATA_FETCH_FAILED"});
    }catch(error) {
        console.log(error);
        yield put({type:"TOP_STORY_TABLE_DATA_FETCH_FAILED"});
    }
}

export function* getSelectedContentDimensional(action){
    try{
        yield call(wait, action.timeInterval);
        yield put({type:"TOP_STORY_TABLE_GRAPH_DIMENSIONAL_DATA_FETCH"});
        const dimensionGraphData = yield call(fetchSelectedContentDimension,action,"topArticle/dimension?grain="+action.headerFilter.grain+"&ad="+action.dimensionSelection+"&id="+action.articleId+"&language="+action.language+"&limit="+action.limit);

        if(!dimensionGraphData.error) {
            yield put({type: "TOP_STORY_TABLE_GRAPH_DIMENSIONAL_DATA_UPDATE", data: dimensionGraphData.response});
        }
        else
            yield put({type:"TOP_STORY_TABLE_GRAPH_DIMENSIONAL_DATA_FETCH_FAILED"});
    }catch(error) {
        console.log(error);
        yield put({type:"TOP_STORY_TABLE_GRAPH_DIMENSIONAL_DATA_FETCH_FAILED"});
    }
}

export function* getSelectedContentPIV(action){
    try{
        yield call(wait, action.timeInterval);
        yield put({type:"TOP_STORY_PIV_DATA_FETCH"});
        const contentPIV = yield call(fetchSelectedContentPIV,action);

        if(!contentPIV.error) {
            yield put({type: "TOP_STORY_PIV_DATA_UPDATE", data: contentPIV.response});
        }
        else
            yield put({type:"TOP_STORY_PIV_DATA_FETCH_FAILED"});
    }catch(error) {
        console.log(error);
        yield put({type:"TOP_STORY_PIV_DATA_FETCH_FAILED"});
    }
}

function* splitApiCall(action){
    switch(action.type){
        case 'TOP_CONTENT_ANALYTICS_PAGEVIEWS_DATA_UPDATE_WATCHER':
            yield call(getTopContentByPageviews,action);
            break;
        case 'TOP_CONTENT_ANALYTICS_PUBLICATIONDATE_DATA_UPDATE_WATCHER':
            yield call(getTopContentByPublicationDate,action);
            break;
        case 'TOP_CONTENT_ANALYTICS_PUSHSENDDATE_DATA_UPDATE_WATCHER':
            yield call(getTopContentByPushSendDate,action);
            break;
    }
}

export function* topContentDataWatch() {
    yield takeLatest(action => /^TOP_CONTENT_ANALYTICS_/.test(action.type), splitApiCall);
}

export function* contentWiseDimensionDataWatch() {
    yield takeLatest("SELECTED_CONTENT_DIMENSIONAL_DATA_DATA_UPDATE_WATCHER", getSelectedContentDimensional);
}

export function* pivPerStory() {
    yield takeLatest("SELECTED_CONTENT_PIV_UPDATE_WATCHER", getSelectedContentPIV);
}