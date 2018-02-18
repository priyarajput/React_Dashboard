import { call, put, takeLatest, all } from "redux-saga/effects";
import {
    fetchUserList,disableUserAPI
} from "./../../services/api";

function* userListSaga(action) {
        yield put({ type: "USER_LIST_DATA_FETCH" });
        try {
            const data = yield call(fetchUserList, action);
            let userListData = {};
            if (!data.error) {
                userListData = data.response;
            }
            yield put({ type: "USER_LIST_DATA_UPDATE", userListData: userListData });
            if (data.error)
                yield put({ type: "USER_LIST_DATA_FETCH_FAILED" });
        }
        catch (error) {
            console.log(error);
            yield put({ type: "USER_LIST_DATA_FETCH_FAILED" });
        }
    
}

export function* userListDataWatch() {
    yield takeLatest("USER_LIST_DATA_UPDATE_WATCHER", userListSaga);
}

