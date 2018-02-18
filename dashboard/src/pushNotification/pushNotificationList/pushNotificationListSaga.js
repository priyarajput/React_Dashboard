import {call,put,takeLatest} from "redux-saga/effects";
import {
    fetchPushNotificationList,fetchPushNotificationCTRData
} from "../../services/api";

function* getPushNotificationListData(action){
    try{
        yield put({type:"PUSH_NOTIFICATION_LIST_FETCH"});
        const pushNotificationListData = yield call(fetchPushNotificationList,action);
        if(!pushNotificationListData.error){
            yield put({type:"PUSH_NOTIFICATION_LIST_DATA_UPDATE",tableData:pushNotificationListData.response.data,
                        sortValue:action.sortValue,
                        sortDim:action.sortDim,
                        limit:action.limit,
                        offset:action.offset});
        }
        else{
            yield put({type:"PUSH_NOTIFICATION_LIST_FETCH_FAILED"});
        }
    }catch(error) {
        console.log(error);
        yield put({type:"PUSH_NOTIFICATION_LIST_FETCH_FAILED"});
    }
}

export function* pushNotificationListWatcher() {
    yield takeLatest('PUSH_NOTIFICATION_LIST_DATA_UPDATE_WATCHER',getPushNotificationListData);
}

function* getCTRData(action){
    try{
        yield put({type:"PUSH_NOTIFICATION_CTR_FETCH"});
        const pushNotificationCtrtData = yield call(fetchPushNotificationCTRData,action);
         
        if(!pushNotificationCtrtData.error){
            yield put({type:"PUSH_NOTIFICATION_CTR_DATA_UPDATE",CTRData:pushNotificationCtrtData.response,pnId:action.id});
        }
        else{
            yield put({type:"PUSH_NOTIFICATION_CTR_FETCH_FAILED"});
        }
    }catch(error) {
        console.log(error);
        yield put({type:"PUSH_NOTIFICATION_CTR_FETCH_FAILED"});
    }
}

export function* pushNotificationCTRWatcher() {
    yield takeLatest('PUSH_NOTIFICATION_CTR_DATA_UPDATE_WATCHER',getCTRData);
}
