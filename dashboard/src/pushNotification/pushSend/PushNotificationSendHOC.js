import * as React from "react";
import PushNotificationSendZee from "./PushNotificationSendZee";
import PushNotificationSendAll from "./PushNotificationSendAll";
import PushNotificationSendABP from "./PushNotificationSendABP";

export default class PushNotificationSendHOC extends React.Component {
    render() {
        let user= localStorage.getItem('user');
        let parsedUser = JSON.parse(user);
        let propertyId = Object.keys(parsedUser.propertyRoleMap)[0];
        let renderComponent={};
        if(propertyId==='ZEE-ZMCL')
            renderComponent=<PushNotificationSendZee/>;
        else if(propertyId==='ABP-Live')
            renderComponent=<PushNotificationSendABP/>;
        else
            renderComponent=<PushNotificationSendAll/>;
        return (
            renderComponent
        )
    };
};
