import { changePasswordAPI ,savePasswordAPI} from "../services/api";
import { put, call, takeLatest } from 'redux-saga/effects';

function* ChangePasswordTokenSaga(action) {
    yield put({ type: "CHANGE_PASSWORD_TOKEN_DATA_FETCH" });
    try {
        const changePasswordToken = yield call(changePasswordAPI,action.token);
        let data = {};
        if (!changePasswordToken.error) {
            data = changePasswordToken.response;
            yield put({ type: "CHANGE_PASSWORD_TOKEN_DATA_UPDATE", data: data });
        }
        if (changePasswordToken.error)
            yield put({ type: "CHANGE_PASSWORD_TOKEN_DATA_FETCH_FAILED" });
    }
    catch (error) {
        console.log(error);
        yield put({ type: "CHANGE_PASSWORD_TOKEN_DATA_FETCH_FAILED" });
    }
}

export function* changePasswordTokenSagaWatch() {
    yield takeLatest("CHANGE_PASSWORD_TOKEN_WATCHER", ChangePasswordTokenSaga);
}

function* changePasswordSubmit(action) {
    yield put({ type: "CHANGE_PASSWORD_FETCH" });
    try {
        
        const ChangePassword = yield call(savePasswordAPI,action);
        let ChangePasswordData = {};
        if (!ChangePassword.error) {
            ChangePasswordData = ChangePassword.response;
        }
        yield put({ type: "CHANGE_PASSWORD_SUCCESS", ChangePasswordData: ChangePasswordData });

        if (ChangePassword.error)
        yield put({ type: "CHANGE_PASSWORD_FAILURE",error: "error....." });
    }
    catch (error) {
        console.log(error);
        yield put({ type: "CHANGE_PASSWORD_FAILURE" });
    }
}

export function* changePasswordSagaWatch() {
    yield takeLatest("CHANGE_PASSWORD_WATCHER", changePasswordSubmit);
}
