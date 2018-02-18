import React from 'react';
import {Route} from 'react-router';
import DashboardComponent from "./dashboard/DashboardComponent";
import AuthenticationContainer from "./login/AuthenticationContainer";
import AuthenticationWithDatePickerFilter from "./login/AuthenticationWithDatePickerFilter";
import Login from "./login/Login";
import iText from "../src/common/iText.json"
import PushNotificationListContainer from "./pushNotification/pushNotificationList/PushNotificationListContainer";
import Unauthorized from "./common/Unauthorized";
import ReferralAnalyticsContainer from "./referralAnalytics/ReferralAnalyticsContainer";
import AuthorAnalyticsListContainer from "./cmsAnalytics/authorAnalytics/authorAnalyticsList/AuthorAnalyticsListContainer";
import ContentTypeListContainer from "./cmsAnalytics/contentType/contentTypeList/ContentTypeListContainer";
import CategoryAnalyticsListContainer from "./cmsAnalytics/categoryAnalytics/categoryAnalyticsList/CategoryAnalyticsListContainer";
import AuthorAnalyticsDetailViewContainer from "./cmsAnalytics/authorAnalytics/authorAnalyticsDetail/AuthorAnalyticsDetailViewContainer";
import PushNotificationPerformanceContainer from "./pushNotificationPerformance/PushNotificationPerformanceContainer";
import OverviewAnalyticsContainer from "./overviewAnalytics/OverviewAnalyticsContainer";

import CategoryAnalyticsDetailViewContainer from "./cmsAnalytics/categoryAnalytics/categoryAnalyticsDetail/CategoryAnalyticsDetailViewContainer";
import ContentTypeDetailViewContainer from "./cmsAnalytics/contentType/contentTypeDetail/ContentTypeDetailViewContainer";
import GeographyAnalyticsContainer from "./geographyAnalytics/GeographyAnalyticsContainer";
import DashboardTechnologyAnalyticsContainer from "./dashboardTechnologyAnalytics/DashboardTechnologyAnalyticsContainer";
import ReferralAnalyticsSankeyContainer from "./referralAnalyticsSankey/ReferralAnalyticsSankeyContainer";

import PushNotificationSendHOC from "./pushNotification/pushSend/PushNotificationSendHOC";

import ForgotPassword from "./forgotPassword/ForgotPassword";
import ChangePassword from "./changePassword/ChangePassword";

import PageNotFound from "./common/PageNotFound";

import UserListContainer from "./userManagement/users/UserListContainer";
import AddUserForm from "./userManagement/addUser/AddUserForm";
import EditUserForm from "./userManagement/editUser/EditUserForm";

import UserRegistrationForm from "./userManagement/userRegistration/UserRegistrationForm";




const routeWithSidebar = (
    <Route component={AuthenticationContainer}>
        <Route path="/" authorize={['performanceManager']} component={DashboardComponent} iText={iText} />
        <Route path="/dashboard" authorize={['performanceManager']} component={DashboardComponent} iText={iText} />
    </Route>
);

const routeWithoutSidebarAndHeader = (
    <Route>
        <Route path="/login" component={Login} />
        <Route path="/forgotPassword" component={ForgotPassword} />
        <Route path="/changePassword" component={ChangePassword} />
        <Route path="/register" component={UserRegistrationForm}/>
    </Route>
);

const routesWithoutHeaderFilter = (
    <Route component={AuthenticationWithDatePickerFilter}>
        <Route path="/piStats/pushNotifications/send" authorize={['notificationManager']} component={PushNotificationSendHOC}/>
        <Route path="/audience/referralAnalytics" authorize={['performanceManager']} component={ReferralAnalyticsContainer}/>
        <Route path="/audience/referralAnalyticsSankey" authorize={['performanceManager']} component={ReferralAnalyticsSankeyContainer}/>
        <Route path="/pushnotificationperformance" authorize={['performanceManager']} component={PushNotificationPerformanceContainer}/>
        <Route path="/cmsAnalytics/authors" authorize={['cmsAnalyst']} component={AuthorAnalyticsListContainer}/>
        <Route path="/cmsAnalytics/authors/:author" authorize={['cmsAnalyst']} component={AuthorAnalyticsDetailViewContainer}/>
        <Route path="/cmsAnalytics/content" authorize={['cmsAnalyst']} component={ContentTypeListContainer}/>
        <Route path="/cmsAnalytics/content/:content" authorize={['cmsAnalyst']} component={ContentTypeDetailViewContainer}/>
        <Route path="/cmsAnalytics/categories" authorize={['cmsAnalyst']} component={CategoryAnalyticsListContainer}/>
        <Route path="/cmsAnalytics/categories/:category" authorize={['cmsAnalyst']} component={CategoryAnalyticsDetailViewContainer}/>
        <Route path="/piStats/pushNotifications/list" authorize={['notificationManager']} component={PushNotificationListContainer}/>
        <Route path="/audience/Technology" authorize={['performanceManager']} component={DashboardTechnologyAnalyticsContainer}/>
        <Route path="/overviewAnalytics" authorize={['performanceManager']} component={OverviewAnalyticsContainer}/>
        <Route path="/notAuthorized" component={Unauthorized}/>
        <Route path="/audience/geographyAnalytics" authorize={['admin']} component={GeographyAnalyticsContainer} />

        <Route path="/userManagement" component={UserListContainer}/>
        <Route path="/addUser" component={AddUserForm}/>
        <Route path="/editUser/:id" component={EditUserForm}/>
        <Route path='*' component={PageNotFound} />

    </Route>
);




const combinedRoutes = (
    <Route>
        <Route>
            {routeWithoutSidebarAndHeader}
        </Route>
        <Route>
            {routeWithSidebar}
        </Route>
        <Route>
            {routesWithoutHeaderFilter}
        </Route>
    </Route>
);

export default (
    <Route>
        <Route>
            {combinedRoutes}
        </Route>
    </Route>
);
