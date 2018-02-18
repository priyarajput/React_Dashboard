import {call,takeLatest,put,all} from "redux-saga/effects";

import {fetchReferralAnalyticsData,fetchReferralAnalyticsPieChartData} from "./../services/api";

function* getReferralAnalyticsDimensionPerformance(action){
    try{
        yield put({type:"REFERRAL_ANALYTICS_DIMENSION_DATA_FETCH"});
        const [referralAnalyticsMetricsData,referralAnalyticsPieChartData] = yield all([call(fetchReferralAnalyticsData,action),call(fetchReferralAnalyticsPieChartData,action)]);
        let referralData={dimensionReferralData:[],cmsReferralOriginalData:[]};
        if(!referralAnalyticsMetricsData.error){
            referralData.dimensionReferralData=referralAnalyticsMetricsData.response;
        }
        if(!referralAnalyticsPieChartData.error){
            referralData.cmsReferralOriginalData=referralAnalyticsPieChartData.response;
        }
        if(referralAnalyticsMetricsData.error && referralAnalyticsPieChartData.error)
            yield put({type:"REFERRAL_ANALYTICS_DIMENSION_DATA_FETCH_FAILED"});
        else
            yield put({type:"REFERRAL_ANALYTICS_DIMENSION_DATA_UPDATE",
                referralData:referralData,
                referralLevelAndValue:action.referralLevelAndValue,
                referralDropDownSelection:action.referralDropDownSelection});

    }catch(error) {
        console.log(error);
        yield put({type:"REFERRAL_ANALYTICS_DIMENSION_DATA_FETCH_FAILED"});
    }
}

export function* referralAnalyticsDataWatch() {
    yield takeLatest("REFERRAL_ANALYTICS_DIMENSION_DATA_UPDATE_WATCHER", getReferralAnalyticsDimensionPerformance);
}


function* getReferralAnalyticsPieChartDimensionPerformance(action){
    try{
        yield put({type:"REFERRAL_ANALYTICS_DIMENSION_PIE_CHART_DATA_FETCH"});
        const referralAnalyticsPieChartDimensionPerformance = yield call(fetchReferralAnalyticsPieChartData,action);
        if(!referralAnalyticsPieChartDimensionPerformance.error){
            yield put({type:"REFERRAL_ANALYTICS_DIMENSION_PIE_CHART_DATA_UPDATE",
                cmsReferralOriginalData:referralAnalyticsPieChartDimensionPerformance.response,cmsDimensionDropDownSelection:action.cmsDimensionDropDownSelection});
        }
        else
            yield put({type:"REFERRAL_ANALYTICS_DIMENSION_PIE_CHART_DATA_FETCH_FAILED"});
    }catch(error) {
        console.log(error);
        yield put({type:"REFERRAL_ANALYTICS_DIMENSION_PIE_CHART_DATA_FETCH_FAILED"});
    }
}

export function* referralAnalyticsPieChartDataWatch() {
    yield takeLatest("REFERRAL_ANALYTICS_DIMENSION_PIE_CHART_DATA_UPDATE_WATCHER", getReferralAnalyticsPieChartDimensionPerformance);
}

