import {call,put,takeLatest,all} from "redux-saga/effects";
import {
    fetchDashboardTechnologyGraphViews,fetchDashboardTechnologyTableViews,wait
} from "../services/api";

function* getDashboardTechnologyAnalytics(action){
    
    yield put({type:"DASHBOARD_TECHNOLOGY_ANALYTICS_GRAPH_LIST_FETCH"});
    try {
        const dashboardTechnologyGraphViews = yield call(fetchDashboardTechnologyGraphViews,action);
        let dashboardTechnologyAnalyticsData={};
        if(!dashboardTechnologyGraphViews.error){
            dashboardTechnologyAnalyticsData["dashboardTechnologyGraphViews"]=dashboardTechnologyGraphViews.response;
        }
        
        yield put({type:"DASHBOARD_TECHNOLOGY_ANALYTICS_GRAPH_LIST_DATA_UPDATE",dashboardTechnologyAnalyticsData:dashboardTechnologyAnalyticsData});
        if(dashboardTechnologyGraphViews.error)
            yield put({type:"DASHBOARD_TECHNOLOGY_ANALYTICS_GRAPH_LIST_FETCH_FAILED"});
    }
    catch(error) {
        console.log(error);
        yield put({type:"DASHBOARD_TECHNOLOGY_ANALYTICS_GRAPH_LIST_FETCH_FAILED"});
    }

    yield put({type:"DASHBOARD_TECHNOLOGY_ANALYTICS_TABLE_LIST_FETCH"});
    try {
        const dashboardTechnologyTableViews = yield call(fetchDashboardTechnologyTableViews,action);
        let dashboardTechnologyAnalyticsData={};
        
        if(!dashboardTechnologyTableViews.error){
            dashboardTechnologyAnalyticsData["dashboardTechnologyTableViews"]=dashboardTechnologyTableViews.response;
        }
        yield put({type:"DASHBOARD_TECHNOLOGY_ANALYTICS_TABLE_LIST_DATA_UPDATE",dashboardTechnologyAnalyticsData:dashboardTechnologyAnalyticsData});
        if(dashboardTechnologyTableViews.error)
            yield put({type:"DASHBOARD_TECHNOLOGY_ANALYTICS_TABLE_LIST_FETCH_FAILED"});
    }
    catch(error) {
        console.log(error);
        yield put({type:"DASHBOARD_TECHNOLOGY_ANALYTICS_TABLE_LIST_FETCH_FAILED"});
    }
}

export function* dashboardTechnologyAnalyticsDataWatch() {
    yield takeLatest("DASHBOARD_TECHNOLOGY_ANALYTICS_DATA_UPDATE_WATCHER", getDashboardTechnologyAnalytics);
}


function* getDashboardTechnologyTable(action){
   
    yield put({type:"DASHBOARD_TECHNOLOGY_TABLE_LIST_FETCH"});
    try {
        const dashboardTechnologyTableViews = yield call(fetchDashboardTechnologyTableViews,action);
        let dashboardTechnologyTableData={};
        if(!dashboardTechnologyTableViews.error){
            dashboardTechnologyTableData["dashboardTechnologyTableViews"]=dashboardTechnologyTableViews.response;
            dashboardTechnologyTableData["selectedTableTab"]=action.selectedTableTab;
        }
        yield put({type:"DASHBOARD_TECHNOLOGY_TABLE_LIST_DATA_UPDATE",dashboardTechnologyTableData:dashboardTechnologyTableData});
        if(dashboardTechnologyTableViews.error)
            yield put({type:"DASHBOARD_TECHNOLOGY_TABLE_LIST_FETCH_FAILED"});
    }
    catch(error) {
        console.log(error);
        yield put({type:"DASHBOARD_TECHNOLOGY_TABLE_LIST_FETCH_FAILED"});
    }
}

export function* dashboardTechnologyTableDataWatch() {
    yield takeLatest("DASHBOARD_TECHNOLOGY_TABLE_DATA_UPDATE_WATCHER", getDashboardTechnologyTable);
}
