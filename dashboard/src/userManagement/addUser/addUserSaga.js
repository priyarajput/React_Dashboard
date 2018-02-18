import { addUserAPI } from "./../../services/api";
import { put, call, takeLatest } from 'redux-saga/effects';

function* addUserSaga(action) {
    yield put({ type: "ADD_USER_DATA_FETCH" });
    try {
        const addUser = yield call(addUserAPI, action);
        let addUserData = {};
        if (!addUser.error) {
            yield put({ type: "ADD_USER_DATA_UPDATE" });
        }
        if (addUser.error) {
            yield put({ type: "ADD_USER_DATA_FETCH_FAILED",error:addUser.error });
        }
    }
    catch (error) {
        console.log(error);
        yield put({ type: "ADD_USER_DATA_FETCH_FAILED" });
    }
}

export function* addUserSagaWatch() {
    yield takeLatest("ADD_USER_WATCHER", addUserSaga);
}
