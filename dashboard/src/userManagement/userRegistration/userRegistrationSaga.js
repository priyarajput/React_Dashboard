import { savePasswordAPI,changePasswordAPI } from "./../../services/api";
import { put, call, takeLatest } from 'redux-saga/effects';


function* userRegistrationTokenSaga(action) {
    yield put({ type: "USER_REGISTRATION_TOKEN_DATA_FETCH" });
    try {
        const userRegistrationToken = yield call(changePasswordAPI,action.token);
        let data = {};
        if (!userRegistrationToken.error) {
            data = userRegistrationToken.response;
            yield put({ type: "USER_REGISTRATION_TOKEN_DATA_UPDATE", data: data });
        }
        if (userRegistrationToken.error)
            yield put({ type: "USER_REGISTRATION_TOKEN_DATA_FETCH_FAILED" });
    }
    catch (error) {
        console.log(error);
        yield put({ type: "USER_REGISTRATION_TOKEN_DATA_FETCH_FAILED" });
    }
}


export function* userRegistrationTokenSagaWatch() {
    yield takeLatest("USER_REGISTRATION_TOKEN_WATCHER", userRegistrationTokenSaga);
}


function* userRegistrationSaga(action) {
    yield put({ type: "USER_REGISTRATION_DATA_FETCH" });
    try {
        const userRegistration = yield call(savePasswordAPI, action);
        let userRegistrationData = {};
        if (!userRegistration.error) {
            yield put({ type: "USER_REGISTRATION_DATA_UPDATE" });
        }
        if (userRegistration.error) {
            yield put({ type: "USER_REGISTRATION_DATA_FETCH_FAILED" });
        }
    }
    catch (error) {
        console.log(error);
        yield put({ type: "USER_REGISTRATION_DATA_FETCH_FAILED" });
    }
}

export function* userRegistrationSagaWatch() {
    yield takeLatest("USER_REGISTRATION_WATCHER", userRegistrationSaga);
}
