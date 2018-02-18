import * as React from "react";
import StackAreaGraph from "../reusable/StackAreaGraph";

export default class OverviewAnalyticsGraphPresentation extends React.Component {
    render() {        
        return (
            <div style={{margin: '15px'}}>
                <div>
                    <StackAreaGraph chartId="dimensionStackArea"
                                    graphPreferences={this.props.graphPreferences}
                                    keys={this.props.keys}
                                    data={this.props.graphData}
                                    rounded={this.props.rounded}/>
                </div>
            </div>
        )
    }
}

OverviewAnalyticsGraphPresentation.defaultProps = {
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