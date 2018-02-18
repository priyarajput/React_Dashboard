import authorPerformanceData from "../dashboard/authorPerformance/redux/authorPerformanceReducer";
import headerCreateReducer from "../header/redux/headerCreateReducer";

import topStoryReducer from "../dashboard/topStoriesAnalytics/redux/topStoryReducer";
import dimensionPerformanceReducer from "../dashboard/pushNotificationPerformanceUserDimension/redux/dimensionPerformanceReducer";
import publishedVsPageViews from "../dashboard/publishedVsViewed/redux/publishedVsPageViewsReducer";
import cmsTopContentByDimension from "../dashboard/cmsTopDimensionViews/redux/cmsTopContentByDimension";
import pushNotificationPerformanceReducer from "../dashboard/pushNotificationPerformance/redux/pushNotificationPerformanceReducer"
import loginReducer from "../login/redux/loginReducer"
import contentMasterData from "../common/reducers/contentMasterData";
import pushNotificationMasterData from "../common/reducers/pushNotificationMasterData";
import dimensionPageviewTrend from "../dashboard/dimensionPageViewTrend/redux/dimensionPageViewTrendReducer";
import pushNotificationReducer from "../pushNotification/pushNotificationList/redux/pushNotificationListReducer";
import referralAnalyticsData from "../referralAnalytics/redux/referralAnalyticsReducer";
import authorAnalyticsListReducer from "../cmsAnalytics/authorAnalytics/authorAnalyticsList/redux/authorAnalyticsListReducer";
import pushNotificationPerformanceGraphReducer from "../pushNotificationPerformance/redux/pushNotificationPerformanceReducer";

import contentTypeListReducer from "../cmsAnalytics/contentType/contentTypeList/redux/contentTypeListReducer";
import categoryAnalyticsListReducer from "../cmsAnalytics/categoryAnalytics/categoryAnalyticsList/redux/categoryAnalyticsListReducer";
import authorAnalyticsDetailViewData from "../cmsAnalytics/authorAnalytics/authorAnalyticsDetail/redux/authorAnalyticsDetailViewReducer";
import categoryAnalyticsDetailViewData from "../cmsAnalytics/categoryAnalytics/categoryAnalyticsDetail/redux/categoryAnalyticsDetailViewReducer";
import contentTypeDetailViewData from "../cmsAnalytics/contentType/contentTypeDetail/redux/contentTypeDetailViewReducer";

import geographyAnalyticsData from "../geographyAnalytics/redux/geographyAnalyticsReducer";
import dashboardTechnologyAnalyticsReducer from "../dashboardTechnologyAnalytics/redux/dashboardTechnologyAnalyticsReducer";
import referralAnalyticsSankeyReducer from "../referralAnalyticsSankey/redux/referralAnalyticsSankeyReducer";
import overviewAnalyticsData from "../overviewAnalytics/redux/overviewAnalyticsReducer";

import userListData from "../userManagement/users/redux/userListReducer";
import addUserData from "../userManagement/addUser/redux/addUserReducer";
import userRegistrationData from "../userManagement/userRegistration/redux/userRegistrationReducer";
import forgotPasswordData from "../forgotPassword/redux/forgotPasswordReducer";
import changePasswordData from "../changePassword/redux/changePasswordReducer";
import editUserData from "../userManagement/editUser/redux/editUserReducer";

module.exports = {
    ...authorPerformanceData,
    ...headerCreateReducer,
    ...dimensionPerformanceReducer,
    ...publishedVsPageViews,
    ...topStoryReducer,
    ...cmsTopContentByDimension,
    ...pushNotificationPerformanceReducer,
    ...pushNotificationReducer,
    ...loginReducer,
    ...contentMasterData,
    ...pushNotificationMasterData,
    ...dimensionPageviewTrend,
    ...referralAnalyticsData,
    ...authorAnalyticsListReducer,
    ...pushNotificationPerformanceGraphReducer,
    ...authorAnalyticsDetailViewData,
    ...contentTypeListReducer,
    ...categoryAnalyticsListReducer,
    ...categoryAnalyticsDetailViewData,
    ...contentTypeDetailViewData,
    ...dashboardTechnologyAnalyticsReducer,
    ...referralAnalyticsSankeyReducer,
    ...geographyAnalyticsData,
    ...dashboardTechnologyAnalyticsReducer,
    ...overviewAnalyticsData,
    ...forgotPasswordData,
    ...changePasswordData,
    ...userListData,
    ...addUserData,
    ...userRegistrationData,
    ...editUserData

};