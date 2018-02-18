import * as React from "react";
import {BPanel,OverlayTrigger, Popover, DropdownButton, Icon, MenuItem, Table} from "@sketchpixy/rubix/lib/index";
import SingleCMSDimensionViewsPresentation from "./SingleCMSDimensionViewsPresentation";
import Overlay from "../../common/Overlay.jsx";

export default class TopLevelCMSDimensionPresentation extends React.Component {

    render() {
        if (!TopLevelCMSDimensionPresentation) return null;

        return (
            <Overlay isLoading={this.props.isLoading}>
                <BPanel style={{minHeight: "200px"}}>

                    <Table className="rounded collapsed"
                           style={{borderBottom: "0px solid black"}}>
                        <thead className="tableHeadBackground">
                        <tr>
                            <th><h4>Content published by</h4></th>
                            <th className="text-right">
                        <span className="topLevelCMSDimensionPresentationDropDown dropdown-autoWidth">
                        <DropdownButton bsStyle='darkcyan' title={this.props.dimension}
                                        id='dropdown-success' onSelect={this.props.changeDimension}>
                            <MenuItem eventKey="categoryList">Category</MenuItem>
                            <MenuItem eventKey="format">Type</MenuItem>
                            <MenuItem eventKey="tagList">Tags</MenuItem>
                        </DropdownButton>&nbsp;&nbsp;
                        </span>
                                <OverlayTrigger trigger={["hover", "focus"]} placement="left"  delayHide={1000}
                                                overlay={<Popover   style={{ width: 400, maxWidth:1500 }} id='popover-top-1' title={this.props.JsonFile.dashborad.cmsTopDimensionViewTitle}>

                                                    <p>{this.props.JsonFile.dashborad.cmsTopDimensionViewInfo}</p>
                                                </Popover>}>
                                    <Icon className='topLevelCMSDimensionInfoIcon' glyph="glyphicon-info-sign rightIcon"/>
                                </OverlayTrigger></th>
                        </tr>
                        </thead>

                        <tbody>

                        {this.props.dimensionData.length>0?this.props.dimensionData.map(
                            (eachDimension, index) =>
                                <tr>
                                    <td colSpan={2} style={{borderBottom: "0px", borderTop: "0px", borderLeft: "0px"}}>
                                        <SingleCMSDimensionViewsPresentation fontcolor={this.props.colors[index]}
                                                                             dimension={eachDimension}
                                                                             dimensionTotal={this.props.dimensionTotal}/>
                                    </td>
                                </tr>
                        ):<tr><td colSpan={2} style={{color:"black",textAlign:"center"}}><h2>No Data Found</h2></td></tr>}

                        </tbody>
                    </Table>

                </BPanel>
            </Overlay>
        );
    }

}