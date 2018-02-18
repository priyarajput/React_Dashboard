import { all } from 'redux-saga/effects';
import {
    isLoggedInWatch,
    loginAttemptWatch
} from "./watcherSaga";
import { authorPerformanceDataWatch } from "../dashboard/authorPerformance/authorPerformanceIndexSaga";
import { publishedVsPageviewsDataWatch } from "../dashboard/publishedVsViewed/publishedVsPageviewsSaga";
import { pushNotificationPerformanceDataWatch } from "../dashboard/pushNotificationPerformance/pushNotificationPerformanceSaga";
import { pushNotificationPerformanceDimensionDataWatch } from "../dashboard/pushNotificationPerformanceUserDimension/pushNotificationPerformanceSaga";
import { cmsDimensionPerformanceDataWatch } from "../dashboard/cmsTopDimensionViews/cmsPerformanceSaga";
import { dimensionPageviewsDataWatch } from "../dashboard/dimensionPageViewTrend/siteDimensionPerformanceSaga";
import {
    contentWiseDimensionDataWatch,
    topContentDataWatch,pivPerStory
} from "../dashboard/topStoriesAnalytics/topStoryAnalyticsSaga";

import {pushNotificationListWatcher} from "../pushNotification/pushNotificationList/pushNotificationListSaga";
import {pushNotificationCTRWatcher} from "../pushNotification/pushNotificationList/pushNotificationListSaga";
import {
    referralAnalyticsDataWatch,
    referralAnalyticsPieChartDataWatch
} from "../referralAnalytics/referralAnalyticsSaga";

import {referralAnalyticsSankeyDataWatch} from "../referralAnalyticsSankey/referralAnalyticsSankeySaga";
import {cmsListWatcher} from "../cmsAnalytics/authorAnalytics/authorAnalyticsList/authorAnalyticsListSaga";
import {cmsContentTypeListWatcher} from "../cmsAnalytics/contentType/contentTypeList/contentTypeListSaga";
import {cmsCategoryListWatcher} from "../cmsAnalytics/categoryAnalytics/categoryAnalyticsList/categoryAnalyticsListSaga";
import {authorDetailViewWatcher} from "../cmsAnalytics/authorAnalytics/authorAnalyticsDetail/authorAnalyticsDetailViewSaga";
import {categoryDetailViewWatcher} from "../cmsAnalytics/categoryAnalytics/categoryAnalyticsDetail/categoryAnalyticsDetailViewSaga";
import  {contentTypeDetailViewWatcher} from  "../cmsAnalytics/contentType/contentTypeDetail/contentTypeDetailViewSaga"


import {
    pushNotificationPerformanceAnalyticsDataWatch,
    pushNotificationPerformanceTableDataWatch
} from "../pushNotificationPerformance/pushNotificationPerformanceSaga";
import { pageViewsNumbers } from "../login/loginAndAuthSaga";
import { dashboardTechnologyAnalyticsDataWatch } from "../dashboardTechnologyAnalytics/dashboardTechnologyAnalyticsSaga";
import { dashboardTechnologyTableDataWatch } from "../dashboardTechnologyAnalytics/dashboardTechnologyAnalyticsSaga";
import {geographyAnalyticsDataWatch,geographyAnalyticsPageViewsDataWatch} from "../geographyAnalytics/geographyAnalyticsSaga";

import {
    
    overviewAnalyticsPageViewsDataWatch, overviewAnalyticsUsersViewsDataWatch,
    overviewAnalyticsDevicesOptoutDataWatch,overviewAnalyticsAcquisitionsDataWatch,
    overviewAnalyticsSessionsViewsDataWatch,overviewAnalyticsUninstallsDataWatch
} from "../overviewAnalytics/overviewAnalyticsSaga";


import { forgotPasswordSagaWatch } from "../forgotPassword/forgotPasswordSaga";

import { changePasswordSagaWatch,changePasswordTokenSagaWatch} from "../changePassword/changePasswordSaga";

import { userListDataWatch } from "../userManagement/users/userListSaga";
import { addUserSagaWatch } from "../userManagement/addUser/addUserSaga";
import {userRegistrationSagaWatch,userRegistrationTokenSagaWatch} from "../userManagement/userRegistration/userRegistrationSaga";
import { editUserSagaWatch } from "../userManagement/editUser/editUserSaga";

export default function* startSagaWithWatchers() {
    yield all([loginAttemptWatch(),

        isLoggedInWatch(),
        authorPerformanceDataWatch(),
        publishedVsPageviewsDataWatch(),
        pushNotificationPerformanceDataWatch(),
        pushNotificationPerformanceDimensionDataWatch(),
        cmsDimensionPerformanceDataWatch(),
        topContentDataWatch(),
        pivPerStory(),
        contentWiseDimensionDataWatch(),
        dimensionPageviewsDataWatch(),
        pushNotificationListWatcher(),
        referralAnalyticsDataWatch(),
        referralAnalyticsPieChartDataWatch(),
        authorDetailViewWatcher(),
        cmsListWatcher(),
        cmsContentTypeListWatcher(),
        cmsCategoryListWatcher(),
        categoryDetailViewWatcher(),
        contentTypeDetailViewWatcher(),
        pageViewsNumbers(),
        pushNotificationPerformanceAnalyticsDataWatch(),
        pushNotificationPerformanceTableDataWatch(),
        dashboardTechnologyAnalyticsDataWatch(),
        dashboardTechnologyTableDataWatch(),
        referralAnalyticsSankeyDataWatch(),
        overviewAnalyticsPageViewsDataWatch(),
        overviewAnalyticsUsersViewsDataWatch(),
        overviewAnalyticsDevicesOptoutDataWatch(),
        overviewAnalyticsAcquisitionsDataWatch(),
        overviewAnalyticsSessionsViewsDataWatch(),
        overviewAnalyticsUninstallsDataWatch(),
        pushNotificationCTRWatcher(),
        geographyAnalyticsDataWatch(),
        geographyAnalyticsPageViewsDataWatch(),
        userListDataWatch(),
        addUserSagaWatch(),userRegistrationSagaWatch(),
        userRegistrationTokenSagaWatch(),
        forgotPasswordSagaWatch(),
        changePasswordSagaWatch(),
        changePasswordTokenSagaWatch(),
        editUserSagaWatch()

    ]);
}
