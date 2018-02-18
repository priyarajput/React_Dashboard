import {takeLatest} from 'redux-saga/effects';
import {authenticationSaga, loginAttemptSaga} from "../login/loginAndAuthSaga";

export function* loginAttemptWatch() {
    yield takeLatest("LOGIN_ATTEMPT", loginAttemptSaga);
}

export function* isLoggedInWatch() {
    yield takeLatest("IS_LOGGED_IN", authenticationSaga);
}