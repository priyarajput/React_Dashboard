import 'isomorphic-fetch';
import moment from "moment-timezone";

const API_ROOT = 'http://localhost:8082/pistats/apiv1/';

function getApi(endpoint, requestHeader) {
    const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

    return fetch(fullUrl, {
        headers: requestHeader,
        method: "GET"
    })
        .then(response =>
            response.json().then(json => ({json, response}))
        ).then(({json, response}) => {
            if (!response.ok) {
                return Promise.reject(json)
            }
            return json;
        })
        .then(
            response => ({response}),
            error => ({error: error.message || 'Something bad happened'})
        )
}

function getApiWithoutHeader(endpoint) {
    const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

    return fetch(fullUrl, {
        method: "GET"
    })
        .then(response =>
            response.json().then(json => ({json, response}))
        ).then(({json, response}) => {
            if (!response.ok) {
                return Promise.reject(json)
            }
            return json;
        })
        .then(
            response => ({response}),
            error => ({error: error.message || 'Something bad happened'})
        )
}

export function filterOptions (options, filter, values) {
    if (!options) options = [];
    return options
}

export function getSearchResults(headerFilter,url){
    let rows = [];
    return calculateHeaderNonDashboardAndCallApi({
        headerFilter: headerFilter
    }, url);
}

function postAPI(endpoint, requestHeader,postData) {
    const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
    requestHeader['Content-Type']='application/json';
    return fetch(fullUrl, {
        headers: requestHeader,
        method: "POST",
        body: JSON.stringify(postData)
    })
        .then(response =>
            response.json().then(json => ({json, response}))
        ).then(({json, response}) => {
            if (!response.ok) {
                return Promise.reject(json)
            }
            return json;
        })
        .then(
            response => ({response}),
            error => ({error: error.message || 'Something bad happened'})
        )
}

export function wait(ms) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), ms)
    });
}

export function calculateHeaderAndCallApi(action,url){
    let user=JSON.parse(localStorage.getItem('user'));
    if(user) {
        let updatedRequestHeader = calculateHeader(action.headerFilter,user);
        return getApi(url, updatedRequestHeader);
    }
}

export function calculateHeaderNonDashboardAndCallApi(action,url){
    let user=JSON.parse(localStorage.getItem('user'));
    if(user) {
        let updatedRequestHeader=calculateHeaderNonDashboard(action.headerFilter,user);
        return getApi(url, updatedRequestHeader);
    }
}

export function getUserRoles(){
    let user=JSON.parse(localStorage.getItem('user'));
    if(user) {
        return user.propertyRoleMap[Object.keys(user.propertyRoleMap)[0]];
    }
    return [];
}

export function calculateHeaderAndCallPostApi(action,url,payload){
    let user=JSON.parse(localStorage.getItem('user'));
    if(user) {
        let updatedRequestHeader = calculateHeader(action.headerFilter,user);
        return postAPI(url, updatedRequestHeader,payload);
    }
}



export function calculateHeaderAndCallPostApiAlertModal(action, url, payload) {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        let updatedRequestHeader = calculateHeader(action.headerFilter, user);
        return AlertModalPostAPI(url, updatedRequestHeader, payload);
    }
}

function AlertModalPostAPI(endpoint, requestHeader, postData) {
    const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
    requestHeader['Content-Type'] = 'application/json';
    return fetch(fullUrl, {
        headers: requestHeader,
        method: "POST",
        body: JSON.stringify(postData)
    })
}


export function fetchActiveDevice(action){
    return calculateHeaderAndCallApi(action,"activeDevice");
}

export function fetchNewDevice(action){
    return calculateHeaderAndCallApi(action,"newDevice");
}

export function fetchActiveDeviceByDimension(action){
    return calculateHeaderAndCallApi(action,"activeDevice/dimension?limit="+action.limit+"&dimension="+action.dimension);
}

export function fetchReferralOrigin(action){
    return calculateHeaderAndCallApi(action,"topReferralOrigin?limit="+action.limit);
}

export function fetchCMSPerformanceIndex(action){
    return calculateHeaderNonDashboardAndCallApi(action,"cmsPerformanceIndex?limit="+action.limit+"&cmsDim="+action.dimension);
}

export function fetchPageviewsTimeseries(action){
    return calculateHeaderNonDashboardAndCallApi(action,"publishedVsPageview?grain="+action.headerFilter.grainNonDashboard+"&cmsDim="+action.cmsDimFilter+"&cmsFilter="+action.filter);
}

export function fetchPublishedTimeseries(action){
    return calculateHeaderNonDashboardAndCallApi(action,"published?grain="+action.headerFilter.grainNonDashboard+"&cmsDim="+action.cmsDim+"&cmsFilter="+action.filter);
}

export function fetchPublishedByCategory(action){
    return calculateHeaderNonDashboardAndCallApi(action,"publishedByDimension?limit="+action.limit+"&cmsDim="+action.cmsDim+"&cmsFilter="+action.filter+"&dimension=categoryList");
}

export function fetchPublishedByAuthor(action){
    return calculateHeaderNonDashboardAndCallApi(action,"publishedByDimension?limit="+action.limit+"&cmsDim="+action.cmsDim+"&cmsFilter="+action.filter+"&dimension=authorList");
}

export function fetchPublishedByType(action){
    return calculateHeaderNonDashboardAndCallApi(action,"publishedByDimension?limit="+action.limit+"&cmsDim="+action.cmsDim+"&cmsFilter="+action.filter+"&dimension=format");
}

export function fetchContentListByAuthor(action){
    return calculateHeaderNonDashboardAndCallApi(action,"content/author?author="+action.filter);
}

export function fetchContentListByType(action){
    return calculateHeaderNonDashboardAndCallApi(action,"content/type?type="+action.filter);
}

export function fetchContentListByCategory(action){
    return calculateHeaderNonDashboardAndCallApi(action,"content/category?category="+action.filter);
}

export function fetchAuthorPerformanceIndex(action){
    return calculateHeaderAndCallApi(action,"cmsPerformanceIndex?limit="+action.limit+"&cmsDim="+action.dimension);
}

export function fetchPushNotificationList(action){
    return calculateHeaderNonDashboardAndCallApi(action,"pushNotification/list?limit="+action.limit+"&sv="+action.sortValue+"&sd="+action.sortDim+"&offset="+action.offset);
}

export function fetchPushNotificationCTRData(action){
    return calculateHeaderAndCallApi(action,"openrate/campaign?pushId="+action.id);
}

export function fetchCMSDimensionPerformance(action) {
    return calculateHeaderAndCallApi(action,"publishedContentByDimension?dimension="+action.dimensionSelection+"&limit="+action.limit)
}

export function fetchDimensionPageviews(action) {
    return calculateHeaderAndCallApi(action,"hourlyDimension?limit=" + action.limit + "&ad=" + action.dimensionSelection)
}

export function fetchGraphPushInfluencedViews(action) {
    return calculateHeaderAndCallApi(action,"pageViews/pushInfluencedViews/time/dimension?dimension=" + action.dimension.dimensionKeyValue + "&dimensionFilter=" + action.dimensionFilter.dimensionFilterKeyValue)
}

export function fetchGraphPushInfluencedTablePieViews(action) {
    return calculateHeaderNonDashboardAndCallApi(action,"pageViews/pushInfluencedViews/dimension?dimension=" + action.dimension.dimensionKeyValue + "&limit=" + action.limit)
}


export function fetchPublishedVsPageviews(action) {
    return calculateHeaderAndCallApi(action,"publishedVsPageViews")
}

export function fetchOpenRate(action) {
    return calculateHeaderAndCallApi(action,"openrate?grain="+action.headerFilter.grain)
}

export function fetchReach(action) {
    return calculateHeaderAndCallApi(action,"pushNotification/reach")
}

export function fetchActiveDevices(action) {
    return calculateHeaderAndCallApi(action,"activeDevices/language")
}

export function fetchPushInfluencedViews(action) {
    return calculateHeaderAndCallApi(action,"pageViews/pushInfluencedViews")
}

export function fetchOpenRateNonDashboard(action) {
    return calculateHeaderNonDashboardAndCallApi(action,"openrate?grain="+action.headerFilter.grain)
}

export function fetchReachNonDashboard(action) {
    return calculateHeaderNonDashboardAndCallApi(action,"pushNotification/reach")
}

export function fetchActiveDevicesNonDashboard(action) {
    return calculateHeaderNonDashboardAndCallApi(action,"activeDevices/language")
}

export function fetchPushInfluencedViewsNonDashboard(action) {
    return calculateHeaderNonDashboardAndCallApi(action,"pageViews/pushInfluencedViews")
}

export function fetchPushPerformanceDimension(action){
    return calculateHeaderAndCallApi(action,"pushNotification/performance/dimension?limit="+action.limit+"&ad="+action.dimensionSelection)
}

export function fetchTopContentAnalyticsByPageviews(action) {
    return calculateHeaderAndCallApi(action,"topArticle/pageViews?limit="+action.limit)
}

export function fetchTopContentAnalyticsByPushNotification(action) {
    return calculateHeaderAndCallApi(action,"pushNotification/language?limit="+action.limit)
}

export function fetchTopContentAnalyticsByPublication(action) {
    return calculateHeaderAndCallApi(action,"articles/language?limit="+action.limit)
}

export function fetchSelectedContentDimension(action) {
    return calculateHeaderAndCallApi(action,"topArticle/dimension?grain="+action.headerFilter.grain+"&ad="+action.dimensionSelection+"&id="+action.articleId+"&language="+action.language+"&limit="+action.limit)
}

export function fetchSelectedContentPIV(action) {
    return calculateHeaderAndCallApi(action,"pushInfluencedViews/campaign?articleId="+action.articleId+"&campaignId="+action.campaignId+"&language="+action.language)
}

export function fetchAuthorPerformanceSparkLine(action,authorList) {
    return calculateHeaderAndCallPostApi(action,'pageViewsByAuthorList?grain='+action.headerFilter.grain,{"authorList": authorList});
}

export function fetchContentMetaData(action,articleLanguageMap) {
    return calculateHeaderAndCallPostApi(action,'articles/language/Ids',articleLanguageMap);
}

export function fetchPNMetaData(action,articleLanguageMap) {
    return calculateHeaderAndCallPostApi(action,"pushNotification/language/Ids",articleLanguageMap);
}

export function fetchPageviews(action,articleLanguageMap) {
    return calculateHeaderAndCallPostApi(action,"pageViews/pushInfluencedViews/articles",articleLanguageMap);
}


export function fetchReferralAnalyticsData(action) {
    return calculateHeaderNonDashboardAndCallApi(action,"referralMetrics?level="+action.level+"&filter="+action.filter+"&grain="+action.headerFilter.grainNonDashboard);
}


export function fetchReferralAnalyticsPieChartData(action) {
    return calculateHeaderNonDashboardAndCallApi(action,"referralMetricsDimension?level="+action.level+"&aggregate="+action.aggregate+"&grain="+action.headerFilter.grainNonDashboard+"&referralVal="+action.filter);
}


export function fetchReferralAnalyticsSankeyData(action) {
    return calculateHeaderNonDashboardAndCallApi(action,"referralAnalytics/grain");
}
export function fetchGeographyAnalyticsCountriesData(action) {
    return calculateHeaderNonDashboardAndCallApi(action,"geographyMetrics?dimension="+action.dimension+"&city="+action.city+"&country="+action.country+"&state="+action.state+"&limit="+action.limit);
}

export function fetchGeographyAnalyticsPagesViewsData(action) {
    return calculateHeaderNonDashboardAndCallApi(action,"geographyMetrics/topContent?country="+action.country+"&state="+action.state+"&cmsDim="+action.pageDim+"&limit="+action.limit);
}

export function fetchGeographyAnalyticsTopContentData(action) {
    return calculateHeaderNonDashboardAndCallApi(action,"geographyMetrics/topContent?country="+action.country+"&state="+action.state+"&cmsDim="+action.cmsDim+"&limit="+action.limit);

}

export function fetchDashboardTechnologyGraphViews(action) {
    return calculateHeaderNonDashboardAndCallApi(action,"pageViewsHistorical");
}

export function fetchDashboardTechnologyTableViews(action) {
    return calculateHeaderNonDashboardAndCallApi(action,"dimension?dimension="+action.selectedTableTab);
}

export function fetchOverviewAnalyticsUsersViews(action) {
    return calculateHeaderNonDashboardAndCallApi(action,"users");
}

export function fetchOverviewAnalyticsUsersViewsAll(action) {
    return calculateHeaderNonDashboardAndCallApi(action,"usersAll");
}

export function fetchOverviewAnalyticsAcquisitionsViews(action) {
    return calculateHeaderNonDashboardAndCallApi(action,"acquisitions");
}

export function fetchOverviewAnalyticsAcquisitionsViewsAll(action) {
    return calculateHeaderNonDashboardAndCallApi(action,"acquisitionsAll");
}

export function fetchOverviewAnalyticsSessionsViews(action) {
    return calculateHeaderNonDashboardAndCallApi(action,"sessions");
}

export function fetchOverviewAnalyticsSessionsViewsAll(action) {
    return calculateHeaderNonDashboardAndCallApi(action,"sessionsAll");
}

export function fetchOverviewAnalyticsDevicesOptoutViews(action) {
    return calculateHeaderNonDashboardAndCallApi(action,"devices/optout");
}

export function fetchOverviewAnalyticsPageViews(action) {
    return calculateHeaderNonDashboardAndCallApi(action,"pageViews/granular");
}

export function fetchOverviewAnalyticsUninstallsViews(action) {
    return calculateHeaderNonDashboardAndCallApi(action,"uninstalls");
}

export function fetchUserList(action) {
    return calculateHeaderNonDashboardAndCallApi(action,"list/user");
}

export function addUserAPI(action) {
    return calculateHeaderAndCallPostApi(action,"newuser/add",action.data);
}

export function updateUserAPI(action) {
    return calculateHeaderAndCallPostApi(action,"user/editUserInfo",action.data);
}
    
export function loginAPI(payload) {
    let headerWithAuth={};
    headerWithAuth["Authorization"]=payload.authHash;
    return getApi("login",headerWithAuth);
}

export function getPageviews(){
    return getApiWithoutHeader("pageViews");
}

export function forgotPasswordAPI(action) {
    return getApi("user/resetPassword?email="+action.email);
}

export function changePasswordAPI(token) {
    return getApi("user/changePassword?token="+token);
}
export function savePasswordAPI(action) {
    return postAPI("user/savePassword",{},action.requestBody);
}


export function calculateHeader(headerFilter,user) {
    let requestHeader = {};
    requestHeader["Authorization"] = document.cookie.replace(/(?:(?:^|.*;\s*)Auth\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    requestHeader["propertyId"] = Object.keys(user.propertyRoleMap)[0];
    requestHeader["grain"] = headerFilter.grain;
    requestHeader["channel"]=headerFilter.distribution.levelOneFilter;
    requestHeader["subLevelDimension"]=headerFilter.distribution.levelTwoValue;
    requestHeader["subLevelValue"]=headerFilter.distribution.levelTwoFilter;
    if (headerFilter.language)
        requestHeader["language"] = headerFilter.language;
    switch (headerFilter.keyVal) {
        case "last30Minutes":
            requestHeader['fromDate'] = moment().utc().subtract(30, 'minute').format("YYYY-MM-DDTHH:mm:00.sssZ");
            requestHeader['toDate'] = moment().utc().format("YYYY-MM-DDTHH:mm:00.sssZ");
            return requestHeader;
        case "last24Hours":
            requestHeader['fromDate'] = moment().utc().subtract(24, 'hour').format("YYYY-MM-DDTHH:mm:00.sssZ");
            requestHeader['toDate'] = moment().utc().format("YYYY-MM-DDTHH:mm:00.sssZ");
            return requestHeader;
        case "today":
            requestHeader['fromDate'] = moment().utc().startOf('day').format("YYYY-MM-DDTHH:mm:00.sssZ");
            requestHeader['toDate'] = moment().utc().format("YYYY-MM-DDTHH:mm:00.sssZ");
            return requestHeader;
        default:
            requestHeader['fromDate'] = headerFilter.fromDate;
            requestHeader['toDate'] = headerFilter.toDate;
            return requestHeader;
    }
}

export function calculateHeaderNonDashboard(headerFilter,user) {
    let requestHeader = {};
    requestHeader["Authorization"] = document.cookie.replace(/(?:(?:^|.*;\s*)Auth\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    requestHeader["propertyId"] = Object.keys(user.propertyRoleMap)[0];
    requestHeader["grain"] = headerFilter.grainNonDashboard;
    requestHeader["channel"]=headerFilter.distribution.levelOneFilter;
    requestHeader["subLevelDimension"]=headerFilter.distribution.levelTwoValue;
    requestHeader["subLevelValue"]=headerFilter.distribution.levelTwoFilter;
    if (headerFilter.language)
        requestHeader["language"] = headerFilter.language;
    requestHeader['fromDate'] = moment(headerFilter.dateNonDashboard.startDate).utc().startOf('day').format("YYYY-MM-DDTHH:mm:00.sssZ");
    requestHeader['toDate'] = moment(headerFilter.dateNonDashboard.endDate).utc().endOf('day').format("YYYY-MM-DDTHH:mm:00.sssZ");
    return requestHeader;
}


