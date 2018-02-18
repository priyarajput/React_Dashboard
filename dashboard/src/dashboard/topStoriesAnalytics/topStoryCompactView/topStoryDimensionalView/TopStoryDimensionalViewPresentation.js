import * as React from "react";
import {DropdownButton, MenuItem} from "@sketchpixy/rubix/lib/index";
import StackAreaGraph from "../../../../reusable/StackAreaGraph";
import Overlay from "../../../../common/Overlay.jsx";

export default class TopStoryDimensionalViewPresentation extends React.Component {

    render() {
        return (
            <div className="p-1 graph_detail">
                <Overlay isLoading={this.props.isLoadingGraph}>
                    <div>
                        <DropdownButton title={this.props.graphAggregatedOn.label}
                                        id='dropdown-success'
                                        onSelect={this.props.handleAggregationsDimensional}
                                        disabled={this.props.isLoadingGraph}>
                            <MenuItem eventKey="State">State</MenuItem>
                            <MenuItem eventKey="City">City</MenuItem>
                            <MenuItem eventKey="Country">Country</MenuItem>
                        </DropdownButton>
                    </div>


                    <div>

                        <StackAreaGraph chartId={this.props.articleId}
                                        graphPreferences={this.props.graphPreferences}
                                        selectedval={this.props.graphAggregatedOn.label}
                                        title="Page Views"
                                        keys={this.props.dimensionalData.graphData.keys}
                                        data={this.props.dimensionalData.graphData.data}/>
                    </div>
                </Overlay>


            </div>

        );
    }
}

TopStoryDimensionalViewPresentation.defaultProps = {
    graphPreferences: {
        xAxisKey: "currentTime",
        xAxisFormat: '%Y-%m-%d',
        xAxisType: 'datetime',
        xAxisLabel: 'Date',
        yAxisType: 'linear',
        yAxisTickCount: "5",
        xAxisTickCount: "12"
    }
};