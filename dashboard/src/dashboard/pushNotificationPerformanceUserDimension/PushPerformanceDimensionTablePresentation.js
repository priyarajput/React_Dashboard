import * as React from "react";
import PushPerformanceDimensionTableRowPresentation from "./PushPerformanceDimensionTableRowPresentation";
import { BPanel, OverlayTrigger, Popover, DropdownButton, Icon, MenuItem, Table } from "@sketchpixy/rubix/lib/index";
import Overlay from "../../common/Overlay.jsx";
import ReactScrollbar from 'react-scrollbar-js';

export default class PushPerformanceDimensionTablePresentation extends React.Component {

    render() {
        let context = this.props;
        const myScrollbar = {

        };
        return (
            <Overlay isLoading={this.props.isLoading}>
                <BPanel className=' pushPerformanceDimensionTablePresentation'>
                    <div className="tablehead">
                        <h4 className="pull-left">Push Notification
                            By {this.props.dimensionSelection.dimensionKeyLabel}</h4>
                        <div className="pushPerformanceDimensionTablePresentationDropDown pull-right">
                            <span className=" dropdown-autoWidth">
                                <DropdownButton bsStyle='darkcyan' title={this.props.dimensionSelection.dimensionKeyLabel}
                                    id='dropdown-success' onSelect={this.props.selectAggregator}>
                                    <MenuItem eventKey="City">City</MenuItem>
                                    <MenuItem eventKey="State">State</MenuItem>
                                    <MenuItem eventKey="Country">Country</MenuItem>
                                </DropdownButton>
                            </span>
                            <OverlayTrigger trigger={["hover", "focus"]} placement="left" delayHide={1000}
                                overlay={<Popover style={{ width: 400, maxWidth: 1500 }} id='popover-top-1' title={this.props.JsonFile.dashborad.pushNotificationPerformanceUserDimensionTitle}>

                                    <p>{this.props.JsonFile.dashborad.pushNotificationPerformanceUserDimensionInfo}</p>
                                </Popover>}>
                                <Icon className='pushPerformanceDimensionInfoIcon' glyph="glyphicon-info-sign rightIcon" />
                            </OverlayTrigger>
                        </div>
                    </div>
                    <ReactScrollbar >
                        <Table className='horizontalScroll' hover={false} bordered={false}>
                            <tbody>

                                {this.props.dimensionPerformance && this.props.dimensionPerformance.length > 0 && <tr>
                                    {
                                        this.props.dimensionPerformance.map(function (data, index) {
                                            return <PushPerformanceDimensionTableRowPresentation cellData={data}
                                                color={context.colors[index]} />
                                        })
                                    }
                                </tr>}
                                {this.props.dimensionPerformance && this.props.dimensionPerformance.length === 0 &&
                                    <div style={{ color: "black", textAlign: "center" }}><h2>No Data Found</h2></div>
                                }

                            </tbody>
                        </Table>
                    </ReactScrollbar>
                </BPanel>
            </Overlay>
        );
    }
}