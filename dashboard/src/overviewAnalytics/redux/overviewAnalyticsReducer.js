const initialState = {
    usersViews: 0,
    optOutViews: 0,
    acquisitionViews: 0,
    sessionViews: 0,
    pageViews: 0,
    uninstallViews: 0,
    pageSessionViews: 0
};

function overviewAnalyticsData(state = initialState, action) {
    switch (action.type) {
        case "OVERVIEW_ANALYTICS_USERS_LIST_DATA_UPDATE":
            let usersViewsData = transformData(action.overviewAnalyticsData.overviewAnalyticsUsersViews, 'Users');
            return Object.assign({}, state, {
                isLoadingUsersView: false,
                usersViews: action.overviewAnalyticsData.overviewAnalyticsUsersViewsAll[0].result.distinctDevice,
                usersViewsGraphData: usersViewsData.graphData,
                usersViewsGraphKeys: usersViewsData.graphKey
            });
            break;
        case "OVERVIEW_ANALYTICS_USERS_LIST_DATA_FETCH":
            return Object.assign({}, state, {
                isLoadingUsersView: true
            });
            break;
        case "OVERVIEW_ANALYTICS_USERS_LIST_DATA_FETCH_FAILED":
            return Object.assign({}, state, {
                isLoadingUsersView: false,
                usersViews: 0
            });
            break;
        case "OVERVIEW_ANALYTICS_DEVICE_OPTOUT_LIST_DATA_UPDATE":
            let optOutViewsData = transformData(action.overviewAnalyticsData.overviewAnalyticsDevicesOptoutViews, 'OptOut');
            return Object.assign({}, state, {
                isLoadingOptOutView: false,
                optOutViews: optOutViewsData.totalCount ? optOutViewsData.totalCount : 0,
                optOutGraphData: optOutViewsData.graphData,
                optOutGraphKeys: optOutViewsData.graphKey
            });
            break;
        case "OVERVIEW_ANALYTICS_DEVICE_OPTOUT_LIST_DATA_FETCH":
            return Object.assign({}, state, {
                isLoadingOptOutView: true
            });
            break;
        case "OVERVIEW_ANALYTICS_DEVICE_OPTOUT_LIST_DATA_FETCH_FAILED":
            return Object.assign({}, state, {
                isLoadingOptOutView: false,
                optOutViews: 0
            });
            break;

        case "OVERVIEW_ANALYTICS_ACQUISITIONS_LIST_DATA_UPDATE":
            let acquisitionViewsData = transformData(action.overviewAnalyticsData.overviewAnalyticsAcquisitionsViews, 'Acquisition');
            return Object.assign({}, state, {
                isLoadingAcquisitionView: false,
                acquisitionViews: action.overviewAnalyticsData.overviewAnalyticsAcquisitionsViewsAll[0].result.newDevices,
                acquisitionGraphData: acquisitionViewsData.graphData,
                acquisitionGraphKeys: acquisitionViewsData.graphKey
            });
            break;
        case "OVERVIEW_ANALYTICS_ACQUISITIONS_LIST_DATA_FETCH":
            return Object.assign({}, state, {
                isLoadingAcquisitionView: true
            });
            break;
        case "OVERVIEW_ANALYTICS_ACQUISITIONS_LIST_DATA_FETCH_FAILED":
            return Object.assign({}, state, {
                isLoadingAcquisitionView: false,
                acquisitionViews: 0
            });
            break;
        case "OVERVIEW_ANALYTICS_SESSIONS_LIST_DATA_UPDATE":
            let sessionViewsData = transformData(action.overviewAnalyticsData.overviewAnalyticsSessionsViews, 'Sessions');
            return Object.assign({}, state, {
                isLoadingSessionView: false,
                sessionViews: action.overviewAnalyticsData.overviewAnalyticsSessionsViewsAll[0].result.distinctSession,
                sessionViewsGraphData: sessionViewsData.graphData,
                sessionViewsGraphKeys: sessionViewsData.graphKey
            });
            break;
        case "OVERVIEW_ANALYTICS_SESSIONS_LIST_DATA_FETCH":
            return Object.assign({}, state, {
                isLoadingSessionView: true
            });
            break;
        case "OVERVIEW_ANALYTICS_SESSIONS_LIST_DATA_FETCH_FAILED":
            return Object.assign({}, state, {
                isLoadingSessionView: false,
                sessionViews: 0
            });
            break;
        case "OVERVIEW_ANALYTICS_PAGEVIEWS_LIST_DATA_UPDATE":
            let pageViewsData = transformData(action.overviewAnalyticsData.overviewAnalyticsPageViews, 'PageViews');
            let pageSessionViewsData = transformData(action.overviewAnalyticsData.overviewAnalyticsPageViews, 'Page/Session');
            return Object.assign({}, state, {
                isModelOpen: false,
                isLoadingPageView: false,
                pageViews: pageViewsData.totalCount ? pageViewsData.totalCount : 0,
                pageViewsGraphData: pageViewsData.graphData,
                pageViewsGraphKeys: pageViewsData.graphKey,
                pageSessionViews: pageSessionViewsData.totalCount ? pageSessionViewsData.totalCount : 0,
                pageSessionViewsGraphData: pageSessionViewsData.graphData,
                pageSessionViewsGraphKeys: pageSessionViewsData.graphKey
            });
            break;


        case "OVERVIEW_ANALYTICS_PAGEVIEWS_LIST_DATA_FETCH":
            return Object.assign({}, state, {
                isLoadingPageView: true
            });
            break;
        case "OVERVIEW_ANALYTICS_PAGEVIEWS_LIST_DATA_FETCH_FAILED":
            return Object.assign({}, state, {
                isLoadingPageView: false,
                pageViews: 0,
                pageSessionViews: 0
            });
            break;

        case "OVERVIEW_ANALYTICS_UNINSTALL_LIST_DATA_UPDATE":
            let uninstallViewsData = transformData(action.overviewAnalyticsData.overviewAnalyticsUninstallsViews, 'Uninstall');
            return Object.assign({}, state, {
                isLoadingUninstallView: false,
                uninstallViews: uninstallViewsData.totalCount ? uninstallViewsData.totalCount : 0,
                uninstallViewsGraphData: uninstallViewsData.graphData,
                uninstallViewsGraphKeys: uninstallViewsData.graphKey
            });
            break;
        case "OVERVIEW_ANALYTICS_UNINSTALL_LIST_DATA_FETCH":
            return Object.assign({}, state, {
                isLoadingUninstallView: true
            });
            break;
        case "OVERVIEW_ANALYTICS_UNINSTALL_LIST_DATA_FETCH_FAILED":
            return Object.assign({}, state, {
                isLoadingUninstallView: false,
                uninstallViews: 0
            });
            break;
        default:
            return state
    }
}


const initialStateFilter = {
    isLoading: false,
    isLoadingPageViewsGraphData: false,
    isLoadingUsersViewsGraphData: false,
    isLoadingOptOutViewsGraphData: false,
    isLoadingUninstallViewsGraphData: false,
    isLoadingAcquisitionViewsGraphData: false,
    isLoadingSessionViewsGraphData: false,
    
};
function overviewAnalyticsGraphData(state = initialStateFilter, action) {

    switch (action.type) {
        
        case "CLOSE_MODEL_BOX":
            return Object.assign({}, state, {
                model: false
            });
            break;
        case "OVERVIEW_ANALYTICS_GRAPH_PAGEVIEWS_LIST_DATA_FETCH":
            return Object.assign({}, state, {
                isLoadingPageViewsGraphData: true
            });
            break;
        case "OVERVIEW_ANALYTICS_GRAPH_PAGEVIEWS_LIST_DATA_FETCH_FAILED":
            return Object.assign({}, state, {
                isLoadingPageViewsGraphData: false
            });
            break;
        case "OVERVIEW_ANALYTICS_GRAPH_PAGEVIEWS_LIST_DATA_UPDATE":
        let pageViewsGraphData;
        if(action.overviewAnalyticsGraphData.title=== "Pageviews"){
            pageViewsGraphData = transformData(action.overviewAnalyticsGraphData.overviewAnalyticsPageViewsGraphData, 'PageViews');
        }else{
            pageViewsGraphData = transformData(action.overviewAnalyticsGraphData.overviewAnalyticsPageViewsGraphData, 'Page/Session');            
        }
            return Object.assign({}, state, {
                isLoadingPageViewsGraphData: false,
                graphData: pageViewsGraphData.graphData,
                graphKeys: pageViewsGraphData.graphKey,
                model: true
            });
            break;
        case "OVERVIEW_ANALYTICS_USERS_LIST_GRAPH_DATA_FETCH":
            return Object.assign({}, state, {
                isLoadingUsersViewsGraphData: true
            });
            break;
        case "OVERVIEW_ANALYTICS_USERS_LIST_GRAPH_DATA_FETCH_FAILED":
            return Object.assign({}, state, {
                isLoadingUsersViewsGraphData: false
            });
            break;
        case "OVERVIEW_ANALYTICS_USERS_LIST_GRAPH_DATA_UPDATE":
            let usersViewsGraphData = transformData(action.overviewAnalyticsGraphData.overviewAnalyticsUsersViewsGraphData, 'Users');
            return Object.assign({}, state, {
                isLoadingUsersViewsGraphData: false,
                graphData: usersViewsGraphData.graphData,
                graphKeys: usersViewsGraphData.graphKey,
                model: true
            });
            break;
        case "OVERVIEW_ANALYTICS_UNINSTALL_LIST_GRAPH_DATA_UPDATE":
            let uninstallViewsGraphData = transformData(action.overviewAnalyticsGraphData.overviewAnalyticsUninstallsViewsGraphData, 'Uninstall');
            return Object.assign({}, state, {
                isLoadingUninstallViewsGraphData: false,
                graphData: uninstallViewsGraphData.graphData,
                graphKeys: uninstallViewsGraphData.graphKey,
                model: true
            });
            break;
        case "OVERVIEW_ANALYTICS_UNINSTALL_LIST_GRAPH_DATA_FETCH":
            return Object.assign({}, state, {
                isLoadingUninstallViewsGraphData: true
            });
            break;
        case "OVERVIEW_ANALYTICS_UNINSTALL_LIST_GRAPH_DATA_FETCH_FAILED":
            return Object.assign({}, state, {
                isLoadingUninstallViewsGraphData: false
            });
            break;
            case "OVERVIEW_ANALYTICS_DEVICE_OPTOUT_LIST_GRAPH_DATA_UPDATE":
            let optOutViewsGraphData = transformData(action.overviewAnalyticsGraphData.overviewAnalyticsDevicesOptoutViewsGraphData, 'OptOut');
            
            return Object.assign({}, state, {
                isLoadingOptOutViewsGraphData: false,
                graphData: optOutViewsGraphData.graphData,
                graphKeys: optOutViewsGraphData.graphKey,
                model: true
            });
            break;
        case "OVERVIEW_ANALYTICS_DEVICE_OPTOUT_LIST_GRAPH_DATA_FETCH":
            return Object.assign({}, state, {
                isLoadingOptOutViewsGraphData: true
            });
            break;
        case "OVERVIEW_ANALYTICS_DEVICE_OPTOUT_LIST_GRAPH_DATA_FETCH_FAILED":
            return Object.assign({}, state, {
                isLoadingOptOutViewsGraphData: false
            });
            break;

        case "OVERVIEW_ANALYTICS_ACQUISITIONS_LIST_GRAPH_DATA_UPDATE":
            let acquisitionViewsGraphData = transformData(action.overviewAnalyticsGraphData.overviewAnalyticsAcquisitionsViewsGraphData, 'Acquisition');
            return Object.assign({}, state, {
                isLoadingAcquisitionViewsGraphData: false,
                graphData: acquisitionViewsGraphData.graphData,
                graphKeys: acquisitionViewsGraphData.graphKey,
                model: true
            });
            break;
        case "OVERVIEW_ANALYTICS_ACQUISITIONS_LIST_GRAPH_DATA_FETCH":
            return Object.assign({}, state, {
                isLoadingAcquisitionViewsGraphData: true
            });
            break;
        case "OVERVIEW_ANALYTICS_ACQUISITIONS_LIST_GRAPH_DATA_FETCH_FAILED":
            return Object.assign({}, state, {
                isLoadingAcquisitionViewsGraphData: false
            });
            break;
        case "OVERVIEW_ANALYTICS_SESSIONS_LIST_GRAPH_DATA_UPDATE":
            let sessionViewsGraphData = transformData(action.overviewAnalyticsGraphData.overviewAnalyticsSessionsViewsGraphData, 'Sessions');
            return Object.assign({}, state, {
                isLoadingSessionViewsGraphData: false,
                graphData: sessionViewsGraphData.graphData,
                graphKeys: sessionViewsGraphData.graphKey,
                model: true
            });
            break;
        case "OVERVIEW_ANALYTICS_SESSIONS_LIST_GRAPH_DATA_FETCH":
            return Object.assign({}, state, {
                isLoadingSessionViewsGraphData: true
            });
            break;
        case "OVERVIEW_ANALYTICS_SESSIONS_LIST_GRAPH_DATA_FETCH_FAILED":
            return Object.assign({}, state, {
                isLoadingSessionViewsGraphData: false
            });
            break;
        default:
            return state
    }
}

module.exports = {
    overviewAnalyticsData, overviewAnalyticsGraphData
};

export function transformData(data, type) {
    let graphData = [], graphKey = [], totalCount = 0, totalSession = 0, totalPageViews = 0;
    data.map(dimension => {
        let tableRow = {};
        if (type === 'Page/Session') {
            totalPageViews += getCounts((dimension.result.count));
            totalSession += getCounts((dimension.result.distinctSession));
            tableRow[type] = ((dimension.result.count) / (dimension.result.distinctSession));
        } else {
            let key = Object.keys(dimension.result)[0];
            totalCount += getCounts(dimension.result[key]);
            tableRow[type] = dimension.result[key];
        }
        tableRow["dt"] = dimension.timestamp;
        graphData.push(tableRow);
    });
    graphKey.push(type);
    if (type === 'Page/Session') {
        totalCount = (totalPageViews/totalSession).toFixed(2);
    }
    return { totalCount, graphData, graphKey };
}

export function getCounts(item) {
    return Math.round(item)
}