import { updateUserAPI } from "./../../services/api";
import { put, call, takeLatest, all } from 'redux-saga/effects';

function* editUserSaga(action) {
    yield put({ type: "EDIT_USER_DATA_FETCH" });
    try {
        const [editUserData, disableUserData] = yield all([call(updateUserAPI, action)]);
        let editUserDetail = {};
        if (!editUserData.error) {
            editUserDetail.editUserData = editUserData.response;
        }
        if (!editUserData.error)
            yield put({
                type: "EDIT_USER_DATA_UPDATE",
                editUserDetail: editUserDetail,
            });
            else
                yield put({ type: "EDIT_USER_DATA_FETCH_FAILED" });
    }
    catch (error) {
        console.log(error);
        yield put({ type: "EDIT_USER_DATA_FETCH_FAILED" });
    }
}

export function* editUserSagaWatch() {
    yield takeLatest("EDIT_USER_WATCHER", editUserSaga);
}
