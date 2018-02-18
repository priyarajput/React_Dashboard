import { forgotPasswordAPI } from "../services/api";
import { put, call, takeLatest } from 'redux-saga/effects';

function* forgotPasswordSaga(action) {
    yield put({ type: "FORGOT_PASSWORD_DATA_FETCH" });
    try {
        const forgotPassword = yield call(forgotPasswordAPI, action);
        let forgotPasswordData = {};
        if (!forgotPassword.error) {
            yield put({ type: "FORGOT_PASSWORD_DATA_UPDATE" });
        }
        if (forgotPassword.error) {
            yield put({ type: "FORGOT_PASSWORD_DATA_FETCH_FAILED" });
        }
    }
    catch (error) {
        console.log(error);
        yield put({ type: "FORGOT_PASSWORD_DATA_FETCH_FAILED" });
    }
}

export function* forgotPasswordSagaWatch() {
    yield takeLatest("FORGOT_PASSWORD_WATCHER", forgotPasswordSaga);
}