import { call, put, takeLatest, all } from "redux-saga/effects";
import {
    fetchOverviewAnalyticsUsersViews, fetchOverviewAnalyticsDevicesOptoutViews,
    fetchOverviewAnalyticsSessionsViews, fetchOverviewAnalyticsAcquisitionsViews,
    fetchOverviewAnalyticsPageViews, fetchOverviewAnalyticsUninstallsViews
} from "./../services/api";
import {
    fetchOverviewAnalyticsAcquisitionsViewsAll, fetchOverviewAnalyticsSessionsViewsAll,
    fetchOverviewAnalyticsUsersViewsAll
} from "../services/api";

function* getOverviewAnalyticsPageViewsData(action) {
    if (action.modelBox) {
        yield put({ type: "OVERVIEW_ANALYTICS_GRAPH_PAGEVIEWS_LIST_DATA_FETCH" });
        try {
            const overviewAnalyticsPageViews = yield call(fetchOverviewAnalyticsPageViews, action);
            let overviewAnalyticsGraphData = {};
            if (!overviewAnalyticsPageViews.error) {
                overviewAnalyticsGraphData["overviewAnalyticsPageViewsGraphData"] = overviewAnalyticsPageViews.response;
                overviewAnalyticsGraphData["title"] =  action.title;
            }
            yield put({ type: "OVERVIEW_ANALYTICS_GRAPH_PAGEVIEWS_LIST_DATA_UPDATE", overviewAnalyticsGraphData: overviewAnalyticsGraphData });
            if (overviewAnalyticsPageViews.error)
                yield put({ type: "OVERVIEW_ANALYTICS_GRAPH_PAGEVIEWS_LIST_DATA_FETCH_FAILED" });
        }
        catch (error) {
            console.log(error);
            yield put({ type: "OVERVIEW_ANALYTICS_GRAPH_PAGEVIEWS_LIST_DATA_FETCH_FAILED" });
        }
    } else {

        yield put({ type: "OVERVIEW_ANALYTICS_PAGEVIEWS_LIST_DATA_FETCH" });
        try {
            const overviewAnalyticsPageViews = yield call(fetchOverviewAnalyticsPageViews, action);
            let overviewAnalyticsData = {};
            if (!overviewAnalyticsPageViews.error) {
                overviewAnalyticsData["overviewAnalyticsPageViews"] = overviewAnalyticsPageViews.response;
            }
            yield put({ type: "OVERVIEW_ANALYTICS_PAGEVIEWS_LIST_DATA_UPDATE", overviewAnalyticsData: overviewAnalyticsData });

            if (overviewAnalyticsPageViews.error)
                yield put({ type: "OVERVIEW_ANALYTICS_PAGEVIEWS_LIST_DATA_FETCH_FAILED" });
        }
        catch (error) {
            console.log(error);
            yield put({ type: "OVERVIEW_ANALYTICS_PAGEVIEWS_LIST_DATA_FETCH_FAILED" });
        }
    }
}

export function* overviewAnalyticsPageViewsDataWatch() {
    yield takeLatest("OVERVIEW_ANALYTICS_PAGE_VIEWS_DATA_UPDATE_WATCHER", getOverviewAnalyticsPageViewsData);
}

function* getOverviewAnalyticsUsersViewsData(action) {
    if (action.modelBox) {
        yield put({ type: "OVERVIEW_ANALYTICS_USERS_LIST_GRAPH_DATA_FETCH" });
        try {
            const overviewAnalyticsUsersViews = yield call(fetchOverviewAnalyticsUsersViews, action);
            let overviewAnalyticsGraphData = {};
            if (!overviewAnalyticsUsersViews.error) {
                overviewAnalyticsGraphData["overviewAnalyticsUsersViewsGraphData"] = overviewAnalyticsUsersViews.response;
            }

            yield put({ type: "OVERVIEW_ANALYTICS_USERS_LIST_GRAPH_DATA_UPDATE", overviewAnalyticsGraphData: overviewAnalyticsGraphData });
            if (overviewAnalyticsUsersViews.error)
                yield put({ type: "OVERVIEW_ANALYTICS_USERS_LIST_GRAPH_DATA_FETCH_FAILED" });
        }
        catch (error) {
            console.log(error);
            yield put({ type: "OVERVIEW_ANALYTICS_USERS_LIST_GRAPH_DATA_FETCH_FAILED" });
        }
    } else {
        yield put({ type: "OVERVIEW_ANALYTICS_USERS_LIST_DATA_FETCH" });
        try {
            const [overviewAnalyticsUsersViews,overviewAnalyticsUsersViewsAll] = yield all([call(fetchOverviewAnalyticsUsersViews, action),
                                                            call(fetchOverviewAnalyticsUsersViewsAll,action)]);
            let overviewAnalyticsData = {};
            if (!overviewAnalyticsUsersViews.error) {
                overviewAnalyticsData["overviewAnalyticsUsersViews"] = overviewAnalyticsUsersViews.response;
            }
            if(!overviewAnalyticsUsersViewsAll.error){
                overviewAnalyticsData["overviewAnalyticsUsersViewsAll"] = overviewAnalyticsUsersViewsAll.response;
            }
            yield put({ type: "OVERVIEW_ANALYTICS_USERS_LIST_DATA_UPDATE", overviewAnalyticsData: overviewAnalyticsData });
            if (overviewAnalyticsUsersViews.error)
                yield put({ type: "OVERVIEW_ANALYTICS_USERS_LIST_DATA_FETCH_FAILED" });
        }
        catch (error) {
            console.log(error);
            yield put({ type: "OVERVIEW_ANALYTICS_USERS_LIST_DATA_FETCH_FAILED" });
        }
    }

}

export function* overviewAnalyticsUsersViewsDataWatch() {
    yield takeLatest("OVERVIEW_ANALYTICS_USERS_VIEWS_DATA_UPDATE_WATCHER", getOverviewAnalyticsUsersViewsData);
}

function* getOverviewAnalyticsDevicesOptoutData(action) {
    if (action.modelBox) {
        // fetch Overview Analytics Devices OptoutViews Graph Data
        yield put({ type: "OVERVIEW_ANALYTICS_DEVICE_OPTOUT_LIST_GRAPH_DATA_FETCH" });
        try {
            const overviewAnalyticsDevicesOptoutViews = yield call(fetchOverviewAnalyticsDevicesOptoutViews, action);
            let overviewAnalyticsGraphData = {};
            if (!overviewAnalyticsDevicesOptoutViews.error) {
                overviewAnalyticsGraphData["overviewAnalyticsDevicesOptoutViewsGraphData"] = overviewAnalyticsDevicesOptoutViews.response;
            }

            yield put({ type: "OVERVIEW_ANALYTICS_DEVICE_OPTOUT_LIST_GRAPH_DATA_UPDATE", overviewAnalyticsGraphData: overviewAnalyticsGraphData });
            if (overviewAnalyticsDevicesOptoutViews.error)
                yield put({ type: "OVERVIEW_ANALYTICS_DEVICE_OPTOUT_LIST_GRAPH_DATA_FETCH_FAILED" });
        }
        catch (error) {
            console.log(error);
            yield put({ type: "OVERVIEW_ANALYTICS_DEVICE_OPTOUT_LIST_GRAPH_DATA_FETCH_FAILED" });
        }
    } else {
        // fetch Overview Analytics Devices OptoutViews Data
        yield put({ type: "OVERVIEW_ANALYTICS_DEVICE_OPTOUT_LIST_DATA_FETCH" });
        try {
            const overviewAnalyticsDevicesOptoutViews = yield call(fetchOverviewAnalyticsDevicesOptoutViews, action);
            let overviewAnalyticsData = {};
            if (!overviewAnalyticsDevicesOptoutViews.error) {
                overviewAnalyticsData["overviewAnalyticsDevicesOptoutViews"] = overviewAnalyticsDevicesOptoutViews.response;
            }

            yield put({ type: "OVERVIEW_ANALYTICS_DEVICE_OPTOUT_LIST_DATA_UPDATE", overviewAnalyticsData: overviewAnalyticsData });
            if (overviewAnalyticsDevicesOptoutViews.error)
                yield put({ type: "OVERVIEW_ANALYTICS_DEVICE_OPTOUT_LIST_DATA_FETCH_FAILED" });
        }
        catch (error) {
            console.log(error);
            yield put({ type: "OVERVIEW_ANALYTICS_DEVICE_OPTOUT_LIST_DATA_FETCH_FAILED" });
        }
    }


}

export function* overviewAnalyticsDevicesOptoutDataWatch() {
    yield takeLatest("OVERVIEW_ANALYTICS_DEVICE_OPTOUT_DATA_UPDATE_WATCHER", getOverviewAnalyticsDevicesOptoutData);
}

function* getOverviewAnalyticsAcquisitionsData(action) {
    if (action.modelBox) {
        // fetch Overview Analytics Acquisitions Views Graph Data
        yield put({ type: "OVERVIEW_ANALYTICS_ACQUISITIONS_LIST_GRAPH_DATA_FETCH" });
        try {
            const overviewAnalyticsAcquisitionsViews = yield call(fetchOverviewAnalyticsAcquisitionsViews, action);
            let overviewAnalyticsGraphData = {};
            if (!overviewAnalyticsAcquisitionsViews.error) {
                overviewAnalyticsGraphData["overviewAnalyticsAcquisitionsViewsGraphData"] = overviewAnalyticsAcquisitionsViews.response;
            }

            yield put({ type: "OVERVIEW_ANALYTICS_ACQUISITIONS_LIST_GRAPH_DATA_UPDATE", overviewAnalyticsGraphData: overviewAnalyticsGraphData });
            if (overviewAnalyticsAcquisitionsViews.error)
                yield put({ type: "OVERVIEW_ANALYTICS_ACQUISITIONS_LIST_GRAPH_DATA_FETCH_FAILED" });
        }
        catch (error) {
            console.log(error);
            yield put({ type: "OVERVIEW_ANALYTICS_ACQUISITIONS_LIST_GRAPH_DATA_FETCH_FAILED" });
        }
    } else {
        // fetch Overview Analytics Acquisitions Views Data
        yield put({ type: "OVERVIEW_ANALYTICS_ACQUISITIONS_LIST_DATA_FETCH" });
        try {
            const [overviewAnalyticsAcquisitionsViews,overviewAnalyticsAcquisitionsViewsAll] = yield all([call(fetchOverviewAnalyticsAcquisitionsViews, action),
                                                                call(fetchOverviewAnalyticsAcquisitionsViewsAll, action)]);
            let overviewAnalyticsData = {};
            if (!overviewAnalyticsAcquisitionsViews.error) {
                overviewAnalyticsData["overviewAnalyticsAcquisitionsViews"] = overviewAnalyticsAcquisitionsViews.response;
            }

            if (!overviewAnalyticsAcquisitionsViewsAll.error) {
                overviewAnalyticsData["overviewAnalyticsAcquisitionsViewsAll"] = overviewAnalyticsAcquisitionsViewsAll.response;
            }

            yield put({ type: "OVERVIEW_ANALYTICS_ACQUISITIONS_LIST_DATA_UPDATE", overviewAnalyticsData: overviewAnalyticsData });
            if (overviewAnalyticsAcquisitionsViews.error)
                yield put({ type: "OVERVIEW_ANALYTICS_ACQUISITIONS_LIST_DATA_FETCH_FAILED" });
        }
        catch (error) {
            console.log(error);
            yield put({ type: "OVERVIEW_ANALYTICS_ACQUISITIONS_LIST_DATA_FETCH_FAILED" });
        }
    }


}

export function* overviewAnalyticsAcquisitionsDataWatch() {
    yield takeLatest("OVERVIEW_ANALYTICS_ACQUISITIONS_VIEWS_DATA_UPDATE_WATCHER", getOverviewAnalyticsAcquisitionsData);
}

function* getOverviewAnalyticsSessionsViewsData(action) {
    if (action.modelBox) {
        // fetch Overview Analytics Sessions Views  Graph Data
        yield put({ type: "OVERVIEW_ANALYTICS_SESSIONS_LIST_GRAPH_DATA_FETCH" });
        try {
            const overviewAnalyticsSessionsViews = yield call(fetchOverviewAnalyticsSessionsViews, action);
            let overviewAnalyticsGraphData = {};
            if (!overviewAnalyticsSessionsViews.error) {
                overviewAnalyticsGraphData["overviewAnalyticsSessionsViewsGraphData"] = overviewAnalyticsSessionsViews.response;
            }
            yield put({ type: "OVERVIEW_ANALYTICS_SESSIONS_LIST_GRAPH_DATA_UPDATE", overviewAnalyticsGraphData: overviewAnalyticsGraphData });
            if (overviewAnalyticsSessionsViews.error)
                yield put({ type: "OVERVIEW_ANALYTICS_SESSIONS_LIST_GRAPH_DATA_FETCH_FAILED" });
        }
        catch (error) {
            console.log(error);
            yield put({ type: "OVERVIEW_ANALYTICS_SESSIONS_LIST_GRAPH_DATA_FETCH_FAILED" });
        }
    } else {
        // fetch Overview Analytics Sessions Views Data
        yield put({ type: "OVERVIEW_ANALYTICS_SESSIONS_LIST_DATA_FETCH" });
        try {
            const [overviewAnalyticsSessionsViews,overviewAnalyticsSessionsViewsAll] = yield all([call(fetchOverviewAnalyticsSessionsViews, action),
                                                            call(fetchOverviewAnalyticsSessionsViewsAll, action)]);
            let overviewAnalyticsData = {};
            if (!overviewAnalyticsSessionsViews.error) {
                overviewAnalyticsData["overviewAnalyticsSessionsViews"] = overviewAnalyticsSessionsViews.response;
            }

            if (!overviewAnalyticsSessionsViewsAll.error) {
                overviewAnalyticsData["overviewAnalyticsSessionsViewsAll"] = overviewAnalyticsSessionsViewsAll.response;
            }

            yield put({ type: "OVERVIEW_ANALYTICS_SESSIONS_LIST_DATA_UPDATE", overviewAnalyticsData: overviewAnalyticsData });
            if (overviewAnalyticsSessionsViews.error)
                yield put({ type: "OVERVIEW_ANALYTICS_SESSIONS_LIST_DATA_FETCH_FAILED" });
        }
        catch (error) {
            console.log(error);
            yield put({ type: "OVERVIEW_ANALYTICS_SESSIONS_LIST_DATA_FETCH_FAILED" });
        }
    }
}

export function* overviewAnalyticsSessionsViewsDataWatch() {
    yield takeLatest("OVERVIEW_ANALYTICS_SESSIONS_VIEWS_DATA_UPDATE_WATCHER", getOverviewAnalyticsSessionsViewsData);
}


function* getOverviewAnalyticsUninstallsData(action) {
    if (action.modelBox) {
        //fetchOverview Analytics Uninstalls Views  Graph Data
        yield put({ type: "OVERVIEW_ANALYTICS_UNINSTALL_LIST_GRAPH_DATA_FETCH" });
        try {
            const overviewAnalyticsUninstallsViews = yield call(fetchOverviewAnalyticsUninstallsViews, action);
            let overviewAnalyticsGraphData = {};
            if (!overviewAnalyticsUninstallsViews.error) {
                overviewAnalyticsGraphData["overviewAnalyticsUninstallsViewsGraphData"] = overviewAnalyticsUninstallsViews.response;
            }

            yield put({ type: "OVERVIEW_ANALYTICS_UNINSTALL_LIST_GRAPH_DATA_UPDATE", overviewAnalyticsGraphData: overviewAnalyticsGraphData });
            if (overviewAnalyticsUninstallsViews.error)
                yield put({ type: "OVERVIEW_ANALYTICS_UNINSTALL_LIST_GRAPH_DATA_FETCH_FAILED" });
        }
        catch (error) {
            console.log(error);
            yield put({ type: "OVERVIEW_ANALYTICS_UNINSTALL_LIST_GRAPH_DATA_FETCH_FAILED" });
        }
    } else {
        //fetchOverview Analytics Uninstalls Views
        yield put({ type: "OVERVIEW_ANALYTICS_UNINSTALL_LIST_DATA_FETCH" });
        try {
            const overviewAnalyticsUninstallsViews = yield call(fetchOverviewAnalyticsUninstallsViews, action);
            let overviewAnalyticsData = {};
            if (!overviewAnalyticsUninstallsViews.error) {
                overviewAnalyticsData["overviewAnalyticsUninstallsViews"] = overviewAnalyticsUninstallsViews.response;
            }

            yield put({ type: "OVERVIEW_ANALYTICS_UNINSTALL_LIST_DATA_UPDATE", overviewAnalyticsData: overviewAnalyticsData });
            if (overviewAnalyticsUninstallsViews.error)
                yield put({ type: "OVERVIEW_ANALYTICS_UNINSTALL_LIST_DATA_FETCH_FAILED" });
        }
        catch (error) {
            console.log(error);
            yield put({ type: "OVERVIEW_ANALYTICS_UNINSTALL_LIST_DATA_FETCH_FAILED" });
        }
    }

}

export function* overviewAnalyticsUninstallsDataWatch() {
    yield takeLatest("OVERVIEW_ANALYTICS_UNINSTALL_VIEWS_DATA_UPDATE_WATCHER", getOverviewAnalyticsUninstallsData);
}



