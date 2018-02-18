import {getPageviews, loginAPI} from "../services/api";
import { put, call,takeLatest } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { push } from 'react-router-redux';

export function* loginAttemptSaga (action) {
    try{
        const userObject = yield call(loginAPI,action.authHash);
        if(!userObject.error) {
            document.cookie = "Auth=" + action.authHash.authHash;
            localStorage.setItem('user', JSON.stringify(userObject.response));
            yield put({type: "LOGGED_SUCCESSFULLY", user: userObject.response});
            
            let array = userObject.response.propertyRoleMap[Object.keys(userObject.response.propertyRoleMap)[0]];
            if(array.indexOf("performanceManager")!==-1){
                action.authHash.history.router.push('/dashboard');
            }
            else if(array.indexOf("cmsAnalyst")!==-1){
                action.authHash.history.router.push('/cmsAnalytics/authors');
            }
            else if(array.indexOf("notificationManager")!==-1){
                action.authHash.history.router.push('/piStats/pushNotifications/list');
            }
             else if(array.indexOf("userManager")!==-1){
                action.authHash.history.router.push('/userManagement');
            }
            else{
                action.authHash.history.router.push('/notAuthorized');
            }

        }
        else{
            yield put({type:"LOGGED_FAILED",error:error});
            action.authHash.history.router.push('/login');
        }
    }catch (error){
        yield put({type:"LOGGED_FAILED",error:"Login Failed. Please verify the username and password"});
        action.authHash.history.router.push('/login');
    }
}

export function* authenticationSaga(action){
    try{
        const userObject = yield call(loginAPI,action.loginData);
        if(!userObject.error){
            localStorage.setItem('user', JSON.stringify(userObject.response));
            yield [put({type:"IS_AUTHENTICATED",isAuthenticated:true}),
                put({type:"LOGGED_SUCCESSFULLY",user:userObject.response})];
        }
        else{
            yield put({type:"IS_AUTHENTICATED",isAuthenticated:false});
            action.loginData.history.router.push('/login');
        }

    }catch (error){
        yield put({type:"IS_AUTHENTICATED",isAuthenticated:false});
        action.loginData.history.router.push('/login');
    }
}

function* getAllPageviews(){
    try{
        const pageViews=yield call(getPageviews);
        if(!pageViews.error){
            yield put({type:"PAGEVIEWS_PISTATS",pageViews:pageViews.response[0].result.count});
        }
    }
    catch (error){
        console.log("Error occurred",error);
    }
}

export function* pageViewsNumbers() {
    yield takeLatest('PAGE_VIEWS_ALL_NUMBERS',getAllPageviews);
}