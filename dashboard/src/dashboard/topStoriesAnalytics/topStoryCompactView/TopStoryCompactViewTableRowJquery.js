import * as React from "react";
import {Button, Icon, Panel} from "@sketchpixy/rubix/lib/index";
import moment from 'moment-timezone';
import numeral from 'numeral';
import TopStoryDetailedViewPresentation from "./topStoryDetailedView/TopStoryDetailedViewPresentation";
import TopStoryDimensionalViewContainer from "./topStoryDimensionalView/TopStoryDimensionalViewContainer";
import TopStoryDetailedViewContainer from "./topStoryDetailedView/TopStoryDetailedViewContainer";

export default class TopStoryCompactViewTableRowJquery extends React.Component {

    constructor(props) {
        super(props);
    }

    handleClick() {
        this.props.handleDetailViewOpen(this.props.index);
    }

    render() {
         return (
            <tr>
                <td colSpan={3}>
                    <div>
                     <span className="ellip_text storyTitle">{this.props.content ? this.props.content["title"] : this.props.data.articleId}</span>
                    <span style={{ color: this.props.color }} className="ellip_text authorName"> <Icon glyph="glyphicon glyphicon-user" /> {this.props.content ? this.props.content["authorName"] : 'Unknown'}</span>
                    </div>
                    <div className="flexBox">
                        <span className="flexItem smallFont">
                            <Icon glyph="icon-fontello-clock-4"/>
                            &nbsp;{this.props.content ? moment(new Date(this.props.content["publicationDate"])).format("Do MMM YY, h:mm a") : '--'}&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                        <span className="flexItem smallFont smallFontEyeIconsAndValue">
                            <Icon glyph="glyphicon glyphicon-eye-open" />&nbsp;
                            PageViews {numeral(this.props.data.totalPageViews).format('0,0')}
                            &nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                        <span className="flexItem smallFont text-right">
                            {this.props.pushNotification && <Icon
                                glyph="glyphicon glyphicon-send"/>}&nbsp;
                            {this.props.pushNotification ? moment(new Date(this.props.pushNotification["dateOfSending"])).format("Do MMM YY, h:mm a") : 'Unsent'}
                            &nbsp;&nbsp;
                            <Button xs onClick={::this.handleClick} className="moreIcon">
                                    {this.props.expandedChild.index !== this.props.index &&
                                    <Icon glyph="glyphicon glyphicon glyphicon-menu-down"/>
                                    }
                                {
                                    this.props.expandedChild.index === this.props.index &&
                                    <Icon glyph="glyphicon glyphicon glyphicon-menu-up"/>
                                }
                            </Button>
                        </span>
                    </div>
                    {
                        this.props.expandedChild.index === this.props.index &&
                        <div>
                            <div className="dropdownBox">
                                <TopStoryDetailedViewContainer    headerFilter={this.props.headerFilter}
                                                                  content={this.props.content}
                                                                  pushNotification={this.props.pushNotification}
                                                                  pushInfluencedViews={this.props.data.pushInfluencedViews}/>
                                <Panel>
                                    <TopStoryDimensionalViewContainer
                                        articleId={this.props.data.articleId}
                                        language={this.props.data.language}
                                        isLoadingGraph={this.props.isLoadingGraph}
                                        headerFilter={this.props.headerFilter}
                                        user={this.props.user}
                                        key={this.props.data.articleId}/>
                                </Panel>
                            </div>
                        </div>
                    }
                </td>
            </tr>
        );
    }
}