import {BPanel, DropdownButton, OverlayTrigger,Icon,MenuItem,Popover} from "@sketchpixy/rubix/lib/index";
import * as React from "react";
import StackAreaGraph from "../../reusable/StackAreaGraph";
import Overlay from "../../common/Overlay.jsx";


export default class DimensionPageviewTrendPresentation extends React.Component {

    render() {
        return (
            <BPanel>
                <Overlay isLoading={this.props.isLoading}>
                    <div className="tablehead">
                        <h4 className="pull-left">Top &nbsp; Dimension &nbsp; Pageviews</h4>
                        <span className="pull-right dimensionPageviewTrendPresentationDropDownButton" style={{textAlign: 'right'}}>


                            <DropdownButton bsStyle='success' title={this.props.dimensionSelection.dimensionKeyLabel}
                                            id='dropdown-success'
                                            onSelect={this.props.aggByValueSelection}>
                                <MenuItem eventKey="State">State</MenuItem>
                                <MenuItem eventKey="City">City</MenuItem>
                                <MenuItem eventKey="Country">Country</MenuItem>
                                <MenuItem eventKey="Distribution">Distribution</MenuItem>
                            </DropdownButton><OverlayTrigger trigger={["hover", "focus"]} placement="left" delayHide={1000}
                                                             overlay={<Popover  style={{ width: 400, maxWidth:1500 }} id='popover-top-1' title={this.props.JsonFile.dashborad.dimensionPageViewTitle}>
                                                                 <p>{this.props.JsonFile.dashborad.dimensionPageViewInfo}</p>
                                                             </Popover>}>
                            <Icon glyph="dimensionPageviewTrendPresentationInfoIcon glyphicon-info-sign rightIcon"/>
                        </OverlayTrigger>
                        </span>
                    </div>
                    <div style={{minHeight:"350px"}}>
                        {this.props.dimensionPageviews.graphData && this.props.dimensionPageviews.graphData.data.length > 0 &&
                        < StackAreaGraph chartId="dimensionStackArea"
                                         graphPreferences={this.props.graphPreferences}
                                         selectedval={this.props.dimensionSelection.dimensionKeyLabel}
                                         title="Page Views"
                                         keys={this.props.dimensionPageviews.graphData.keys}
                                         data={this.props.dimensionPageviews.graphData.data}/>
                        }
                        {(!this.props.dimensionPageviews.graphData || this.props.dimensionPageviews.graphData.data.length === 0) &&
                        <div style={{color:"black",textAlign:"center"}}><h2>No Data Found</h2></div>
                        }
                    </div>
                </Overlay>
            </BPanel>
        );
    }
}

DimensionPageviewTrendPresentation.defaultProps = {
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