import {call,takeLatest,put} from "redux-saga/effects";

import {fetchReferralAnalyticsSankeyData} from "./../services/api";

function* getReferralAnalyticsSankeyDimensionPerformance(action){
    try{
        yield put({type:"REFERRAL_ANALYTICS_SANKEY_DIMENSION_DATA_FETCH"});
        const referralAnalyticsMetricsData = yield call(fetchReferralAnalyticsSankeyData,action);
       

    if(!referralAnalyticsMetricsData.error){
            yield put({type:"REFERRAL_ANALYTICS_SANKEY_DIMENSION_DATA_UPDATE",graphData:referralAnalyticsMetricsData.response});
        }
        else{
            yield put({type:"REFERRAL_ANALYTICS_SANKEY_DIMENSION_DATA_FETCH_FAILED"});
        }
    }catch(error) {
        console.log(error);
        yield put({type:"REFERRAL_ANALYTICS_SANKEY_DIMENSION_DATA_FETCH_FAILED"});
    }
}

export function* referralAnalyticsSankeyDataWatch() {
    yield takeLatest("REFERRAL_ANALYTICS_SANKEY_DIMENSION_DATA_UPDATE_WATCHER", getReferralAnalyticsSankeyDimensionPerformance);
}
