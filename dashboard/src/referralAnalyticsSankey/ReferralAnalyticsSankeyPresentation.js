import * as React from "react";
import {Col, DropdownButton, Grid, MenuItem, Row, Tab, Tabs, Button, ButtonGroup,Icon} from "@sketchpixy/rubix/lib/index";
import Overlay from "../common/Overlay.jsx";
import ReferralAnalyticsSankeyGraphPresentation from "./ReferralAnalyticsSankeyGraphPresentation";


export default class ReferralAnalyticsPresentation extends React.Component {

    render() {
        return (
                <div className="tablehead" style={{padding:'0px'}}>
                    <Overlay isLoading={this.props.isLoading}>
                        <Row>
                            <Col sm={12}>
                                <h3><img src='/imgs/common/piStats/ReferralAnalytics_icon2.png' alt=''/> Referral
                                    Analytics
                                </h3>
                            </Col>
                        </Row>
                        <Tabs style={{marginLeft: "30px",marginRight:"30px"}} activeKey={this.props.selectedMetricTab}
                              id="referralAnalyticsTab"
                              onSelect={this.props.handleMetricChange}>
                            <Tab title="Page views" eventKey="pageViews" disabled={this.props.isLoading}/>
                            <Tab title="Users" eventKey="users" disabled={this.props.isLoading}/>
                            <Tab title="Sessions" eventKey="session" disabled={this.props.isLoading}/>
                        </Tabs>
                        <Grid style={{backgroundColor: "#1a2023"}}>
                            <Row>
                                <Col sm={12} style={{minHeight:450}}>
                                {this.props.isLoading?"":
                                    <ReferralAnalyticsSankeyGraphPresentation
                                    graphFlows={this.props.graphFlows}
                                    graphNodes={this.props.graphNodes}
                                    selectedMetricTab={this.props.selectedMetricTab}
                                    />}
                                </Col>
                            </Row>
                        </Grid>
                    </Overlay>
                </div>
        );
    }

}
