import * as React from "react";
import {BPanel, Icon,OverlayTrigger,Popover} from "@sketchpixy/rubix/lib/index";
import PushNotificationOpenVsSentPresentation from "./pushNotificationOpenVsSent/PushNotificationOpenVsSentPresentation";
import RegisteredVsActivePresentation from "./registeredVsActive/RegisteredVsActivePresentation";
import PushInfluenceViewsPresentation from "./pushInfluenceViews/PushInfluenceViewsPresentation";
import Overlay from "../../common/Overlay.jsx";

export default class PushNotificationPerformancePresentation extends React.Component {

    render() {
        return (
            <Overlay isLoading={this.props.isLoading}>
                { this.props.isLoading === true &&
                <BPanel className="pushNotification_view pushNotificationPageView">

                <OverlayTrigger trigger={["hover", "focus"]} placement="left" delayHide={2000}
                                overlay={<Popover  style={{ width: 400, maxWidth:1500 }} id='popover-top-1' title={this.props.JsonFile.dashborad.pushNotificationPerformanceTitle}>

                                    <p>{this.props.JsonFile.dashborad.pushNotificationPerformanceInfo_1}
                                        <a href={this.props.JsonFile.dashborad.pushNotificationPerformanceUrl_1Link} target="_blank" >
                                            <b>{this.props.JsonFile.dashborad.pushNotificationPerformanceUrl_1Text}</b></a>
                                         {this.props.JsonFile.dashborad.pushNotificationPerformanceInfo_2}</p>
                                    <p>Second section shows Active users in the given time period.</p>
                                        <p> {this.props.JsonFile.dashborad.pushNotificationPerformanceInfo_5}</p>

                                </Popover>}>
                    <Icon glyph="glyphicon-info-sign rightIcon"/>
                </OverlayTrigger>
                    <div className="flexBox">
                        <div className="flexItem graphView p-0 borderBox">
                            <PushNotificationOpenVsSentPresentation
                                openRateArray={this.props.openRateArray}
                                totalOpen={this.props.totalOpen}
                                totalReach={this.props.totalReach}
                                ctrCount={this.props.ctrCount}
                                style={{verticalAlign: 'top'}}/>
                        </div>
                        <div className="flexItem p-0 borderBox">
                            <RegisteredVsActivePresentation
                                activeDevices={this.props.activeDevices} style={{verticalAlign: 'center'}}/>
                        </div>
                        <div className="flexItem p-0">
                            <PushInfluenceViewsPresentation pushViews={this.props.pushViews}
                                                            style={{verticalAlign: 'center'}}/>
                        </div>
                    </div>

                </BPanel>
                }
                 { this.props.isLoading === false &&
                <BPanel className="pushNotification_view ">

                <OverlayTrigger trigger={["hover", "focus"]} placement="left" delayHide={2000}
                                overlay={<Popover  style={{ width: 400, maxWidth:1500 }} id='popover-top-1' title={this.props.JsonFile.dashborad.pushNotificationPerformanceTitle}>

                                    <p>{this.props.JsonFile.dashborad.pushNotificationPerformanceInfo_1}
                                        <a href={this.props.JsonFile.dashborad.pushNotificationPerformanceUrl_1Link} target="_blank" >
                                            <b>{this.props.JsonFile.dashborad.pushNotificationPerformanceUrl_1Text}</b></a>
                                         {this.props.JsonFile.dashborad.pushNotificationPerformanceInfo_2}</p>
                                    <p>Second section shows Active users in the given time period.</p>
                                        <p> {this.props.JsonFile.dashborad.pushNotificationPerformanceInfo_5}</p>

                                </Popover>}>
                    <Icon glyph="glyphicon-info-sign rightIcon"/>
                </OverlayTrigger>
                    <div className="flexBox">
                        <div className="flexItem graphView p-0 borderBox">
                            <PushNotificationOpenVsSentPresentation
                                openRateArray={this.props.openRateArray}
                                totalOpen={this.props.totalOpen}
                                totalReach={this.props.totalReach}
                                ctrCount={this.props.ctrCount}
                                style={{verticalAlign: 'top'}}/>
                        </div>
                        <div className="flexItem p-0 borderBox">
                            <RegisteredVsActivePresentation
                                activeDevices={this.props.activeDevices} style={{verticalAlign: 'center'}}/>
                        </div>
                        <div className="flexItem p-0">
                            <PushInfluenceViewsPresentation pushViews={this.props.pushViews}
                                                            style={{verticalAlign: 'center'}}/>
                        </div>
                    </div>

                </BPanel>
                }
            </Overlay>
        );
    }
}
