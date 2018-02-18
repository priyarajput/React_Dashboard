import * as React from "react";
import { BPanel, DropdownButton, OverlayTrigger, Popover, Icon, MenuItem, Table } from "@sketchpixy/rubix/lib/index";

import TopStoryCompactViewTableRowJquery from "./TopStoryCompactViewTableRowJquery";
import Overlay from "../../../common/Overlay.jsx";

import ReactScrollbar from 'react-scrollbar-js';
export default class TopStoryCompactViewTableJquery extends React.Component {

    render() {
        const myScrollbar = {

            height: 400,
        };
        let context = this.props;
        return (
            <Overlay isLoading={this.props.isLoadingTable}>
                <BPanel >
                    <div id="compactTopStoryView" className="topStoriesTableView">
                        <div className="tablehead">
                            <h4 className="pull-left">Top content by</h4>
                            <div className="pull-right compactTopStoryViewDropDownButton">
                                <DropdownButton title={context.sortByLabel} id='dropdown-success'
                                    onSelect={context.sortByValueSelection} className="pull-left">
                                    <MenuItem eventKey="pageViews">Page Views</MenuItem>
                                    <MenuItem eventKey="pushNotification">Push Notification</MenuItem>
                                    <MenuItem eventKey="publicationDate">Publication Date</MenuItem>
                                </DropdownButton>
                                <OverlayTrigger trigger={["hover", "focus"]} placement="left" delayHide={1000}
                                    overlay={<Popover style={{ width: 400, maxWidth: 1500 }} id='popover-top-1' title={this.props.JsonFile.topStoryTitle.toString()}>

                                        <p>{this.props.JsonFile.topStoryInfo1.toString()}</p>
                                        <p>{this.props.JsonFile.topStoryInfo2.toString()}</p>
                                    </Popover>}>
                                    <Icon className='TopStoryCompactViewSignIcons' glyph="glyphicon-info-sign rightIcon" />
                                </OverlayTrigger>
                            </div>
                        </div>
                        <ReactScrollbar style={{ minHeight: "565px", height: "20px", overflow: "auto" }}>
                                <Table hover={false} bordered={false}>

                                    {context.data.length > 0 &&
                                        <tbody>
                                            {
                                                context.data.filter(rowData => rowData.articleId !== '1').map(function (rowData, index) {
                                                    return <TopStoryCompactViewTableRowJquery
                                                        data={rowData} index={index} color={context.colors[index]}
                                                        content={context.contentMetadata[rowData.language + "~" + rowData.articleId]}
                                                        pushNotification={context.pushNotificationMetaData[rowData.language + "~" + rowData.articleId]}
                                                        key={rowData.articleId}
                                                        expandedChild={context.expandedChild}
                                                        handleDetailViewOpen={context.handleDetailViewOpen}
                                                        headerFilter={context.headerFilter}
                                                        user={context.user} />
                                                })
                                            }
                                        </tbody>
                                    }
                                    {context.data.length === 0 &&
                                        <div style={{ color: "black", textAlign: "center" }}><h2>No Data Found</h2></div>
                                    }

                                </Table>
                        </ReactScrollbar>
                    </div>
                </BPanel>
            </Overlay>
        );
    }
}