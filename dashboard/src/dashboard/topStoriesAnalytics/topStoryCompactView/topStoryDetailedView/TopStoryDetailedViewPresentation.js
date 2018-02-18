import * as React from "react";
import {Col, Icon, Image, Label, Table} from "@sketchpixy/rubix/lib/index";

import Overlay from "../../../../common/Overlay.jsx";

export default class TopStoryDetailedViewPresentation extends React.Component {

    render() {
        let props = this.props;
        return (
                <div id="detailedTopStoryView" className="p-1">
                    <Overlay isLoading={this.props.isLoadingViews}>
                    <div className="flexBox">
                        <div className="flexItem">
                            <Image src={props.content ? props.content["thumbnail"] : '--'} width={120} height={60}/>
                        </div>
                        <div className="flexItem" style={{flex: "2"}}>
                            <p><Icon glyph=""/> Type: <span className="WhiteColor">{props.content ? props.content["format"] : '--'}</span> <span className="pl-1 pr-1">|</span> <Icon glyph="glyphicon glyphicon-sms"/> Push Influenced Views: <span className="WhiteColor">{this.props.pushNotification || this.props.pushNotification===0?Math.round(props.pushInfluencedViews)+'%':'NA'}</span></p>
                            <span>{props.content && props.content["categoryList"] ? props.content["categoryList"].map(function (key, index) {
                                  return <Label bsStyle="warning">{key}</Label> }) : '--'}</span>
                        </div>
                    </div>
                    <p className="pt-1">
                        {props.content && props.content["tagList"] ? props.content["tagList"].join(', ') : '--'}
                    </p> </Overlay>
                </div>
        );
    }
}