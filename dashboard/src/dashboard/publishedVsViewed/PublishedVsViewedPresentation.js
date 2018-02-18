import * as React from "react";
import { BPanel, OverlayTrigger, Popover, Icon } from "@sketchpixy/rubix/lib/index";
import humanFormat from "human-format";
import Overlay from "../../common/Overlay.jsx";
import numeral from 'numeral';

export default class PublishedVsViewedPresentation extends React.Component {

    render() {
        return (
            <BPanel className="p-0 published_view">
                <Overlay isLoading={this.props.isLoading}>
                    <OverlayTrigger trigger={["hover", "focus"]} placement="left" delayHide={1000}
                        overlay={<Popover style={{ width: 400, maxWidth: 1500 }} id='popover-top-1' title={this.props.JsonFile.dashborad.pushVsViewTitle}>

                            <p>{this.props.JsonFile.dashborad.pushVsViewInfo}</p>
                        </Popover>}>
                        <Icon glyph="glyphicon-info-sign rightIcon" className="pull-right" />

                    </OverlayTrigger>
                    <div className="pt-2 pb-1 p-1">
                        <div className="flexBox">

                            <div className="flexItem bigFontIcon">

                                <img className='imgIcons' src='/imgs/common/story_published.png' />
                                <span
                                    className="bigFont storiesPublishedTextBigFont WhiteColor"> <span className="smallFont mobileBlock storiesPublishedText"> Stories Published</span> {this.props.data.published ? numeral(Math.round(this.props.data.published)).format('0.00a') : 'No Data'}</span>

                            </div>
                            <div className="flexItem bigFontIcon">

                                <img className='imgIcons' src='/imgs/common/page_view.png' />
                                <span
                                    className="bigFont pageViewsTextBigFont WhiteColor">  <span className="smallFont mobileBlock pageViewsText"> Page Views</span>{this.props.data.pageViews ? numeral(this.props.data.pageViews).format('0.00a') : 'No Data'}</span>

                            </div>

                        </div>

                    </div>

                </Overlay>
            </BPanel>

        )
            ;
    }


}
