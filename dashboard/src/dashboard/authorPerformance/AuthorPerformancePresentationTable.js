import * as React from "react";
import {BPanel, Icon, OverlayTrigger, Popover, Table} from "@sketchpixy/rubix/lib/index";
import AuthorPerformancePresentationTableRow from "./AuthorPerformancePresentationTableRow";
import Overlay from "../../common/Overlay.jsx";

export default class AuthorPerformancePresentationTable extends React.Component {

    render() {

        return (
            <Overlay isLoading={this.props.isLoading}>
                <BPanel style={{minHeight: "245px"}}>

                    <Table responsive className=" rounded collapsed" hover={false} bordered={false} radius="2px">
                        <thead className="tableHeadBackground">
                            <tr>
                                <th style={{borderBottom: "0px"}}><h4>Top Author</h4></th>
                                <th style={{borderBottom: "0px"}}>API</th>
                                <th><img className='imgIconAuthorPerformance' src='/imgs/common/story_published.png' /></th>
                                <th><img className='page_viewIconAuthorPerformance' src='/imgs/common/page_view.png' /></th>
                                <th style={{color: "#F0FFFF", borderBottom: "0px", textAlign: "right"}}>
                                    <OverlayTrigger  rootClose={false} delayHide={2000}  trigger={["hover", "focus"]} placement="left"
                                                     overlay={<Popover style={{ width: 400, maxWidth:1500 }} id='popover-top-1' title={this.props.JsonFile.dashborad.topAuthorTitle}>
                                                         <p> {this.props.JsonFile.dashborad.topAuthorInfo}
                                                             <b><a href={this.props.JsonFile.dashborad.topAuthorUrlLink} target="_blank" >{this.props.JsonFile.dashborad.topAuthorUrlText}</a></b></p>
                                                     </Popover>}>
                                        <Icon className='authorPerformanceInfoIcon'  glyph="glyphicon-info-sign rightIcon"/>
                                    </OverlayTrigger>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                        {this.props.data && this.props.data.length>0 &&
                            this.props.data.map((authorPerformance, index) => (
                                <AuthorPerformancePresentationTableRow
                                    data={authorPerformance} key={authorPerformance.dimension}
                                    color={this.props.colors[index]}
                                    authorPageViewsData={this.props.authorPageViewsData.authorPageViewsDataArray ? this.props.authorPageViewsData.authorPageViewsDataArray[authorPerformance.dimension] : []}
                                /> )
                            )}
                        {this.props.data.length===0 && <tr><td colSpan="5"><div style={{color:"black",textAlign:"center"}}><h2>No Data Found</h2></div></td></tr>}
                        </tbody>
                    </Table>
                </BPanel>
            </Overlay>


        );
    }

}
