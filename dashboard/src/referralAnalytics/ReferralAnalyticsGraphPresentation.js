import * as React from "react";
import StackAreaGraph from "../reusable/StackAreaGraph";

export default class ReferralAnalyticsGraphPresentation extends React.Component {
    render() {
        let headerValue="Page Views";
        switch(this.props.selectedMetricTab){
            case "pageViews":headerValue="Page Views";
                break;
            case "users":headerValue="Users";
                break;
            case "sessions":headerValue="Sessions";
                break;
            default:headerValue="Page Views";
                break;
        }
        return (
            <div className='referralAnalyticsStackAreaGraph'>
                <div className="tablehead referralAnalyticstableheader">
                    <h4 className="pull-left">{headerValue}</h4>
                </div>
                <div style={{backgroundColor: "#465050",minHeight:'440px'}}>
                    <StackAreaGraph chartId="dimensionStackArea"
                                    graphPreferences={this.props.graphPreferences}
                                    keys={this.props.topFiveDimensions}
                                    data={this.props.graphData}/>
                </div>
            </div>
        )
    }
}

ReferralAnalyticsGraphPresentation.defaultProps = {
    graphPreferences: {
        xAxisKey: "currentTime",
        xAxisFormat: '%Y-%m-%d',
        xAxisType: 'datetime',
        xAxisLabel: 'Date',
        yAxisType: 'linear',
        yAxisTickCount: "5",
        xAxisTickCount: "12",
        graphHeight: "443"
    }
};