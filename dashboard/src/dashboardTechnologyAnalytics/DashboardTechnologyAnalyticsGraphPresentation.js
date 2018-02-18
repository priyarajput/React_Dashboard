import * as React from "react";
import {Col,Row,Grid, Tab, Tabs, Button, ButtonGroup} from "@sketchpixy/rubix/lib/index";
import {BPanel, Icon,DropdownButton, MenuItem} from "@sketchpixy/rubix/lib/index";
import StackAreaGraph from "../reusable/StackAreaGraph";
import Overlay from "../common/Overlay.jsx";





export default class DashboardTechnologyAnalyticsGraphPresentation extends React.Component {

    render() {
        let keyName=this.props.graphData[0]?Object.keys(this.props.graphData[0])[1]:"No Data";
        let graphName=(keyName==="pageViews"?"Page Views":(keyName==="users"?"Users":(keyName==="session"?"Session":"")));
        return (
            <div>
            
                <Row>
                        <Tabs style={{marginLeft:"15px",width:"97%",float:"left"}} activeKey={this.props.selectedGraphTab} id="dashboardTechnologyGraphTab"
                              onSelect={this.props.handleGraphMetricChange}>
                            <Tab title="Page Views" eventKey="pageViews" disabled={this.props.isLoading}/>
                            <Tab title="Users" eventKey="users" disabled={this.props.isLoading}/>
                            <Tab title="Session" eventKey="session" disabled={this.props.isLoading}/>
                        </Tabs>
                </Row>

                        <Overlay isLoading={this.props.isLoading}>
                <div style={{minHeight: '425px',marginTop:10}}>
                    <div className="tablehead" style={{backgroundColor:"#0A0D0E"}}>
                        <h4 className="pull-left">{graphName} Graph</h4>
                        <div className="pull-right" style={{minWidth:"30%"}} disabled={this.props.isLoading}>
                            
                        </div>
                    </div>
                    <div style={{height:400,backgroundColor:"#465050"}}>
                        <StackAreaGraph chartId="dimensionStackArea"
                                        graphPreferences={this.props.graphPreferences}
                                        title={graphName}
                                        keys={[keyName]}
                                        data={this.props.graphData}
                                        />
                    </div>

                </div>
            </Overlay>
            </div>

        )
    }
}

DashboardTechnologyAnalyticsGraphPresentation.defaultProps = {
    graphPreferences: {
        xAxisKey: "currentTime",
        xAxisFormat: '%Y-%m-%d',
        xAxisType: 'datetime',
        xAxisLabel: 'Date',
        yAxisType: 'linear',
        yAxisTickCount: "5",
        xAxisTickCount: "6"
    }
};