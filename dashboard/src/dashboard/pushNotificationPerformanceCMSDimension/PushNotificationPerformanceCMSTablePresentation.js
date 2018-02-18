import * as React from "react";
import PushNotificationPerformanceCMSRowPresentation from "./PushNotificationPerformanceCMSRowPresentation";
import {BPanel} from "@sketchpixy/rubix/lib/index";
export default class PushNotificationPerformanceCMSTablePresentation extends React.Component{

    render(){
        return(
            <BPanel>
                <div className="p-0">
                <PushNotificationPerformanceCMSRowPresentation />
                <PushNotificationPerformanceCMSRowPresentation />
                <PushNotificationPerformanceCMSRowPresentation />
                <PushNotificationPerformanceCMSRowPresentation />
                <PushNotificationPerformanceCMSRowPresentation />
                <PushNotificationPerformanceCMSRowPresentation />
                </div>
            </BPanel>
        );
    }

}