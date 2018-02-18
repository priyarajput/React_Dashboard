import * as React from "react";
import Overlay from "../common/Overlay.jsx";
import {BPanel, Icon} from "@sketchpixy/rubix/lib/index";
import numeral from 'numeral';

export default class PushInfluencePresentation extends React.Component {

    render() {

        return (
            <Overlay isLoading={this.props.isLoading}>
                <BPanel className="PushInfluenceView published_view" style={{ minHeight: "270px" }}>
                    <div style={{
                        textAlign: "center",
                        borderBottom: "1px solid #1a2023",
                        paddingTop: 10,
                        paddingBottom: 10
                    }}>
                        <img className='PushInfluenceIcon' src='/imgs/common/piStats/pushNotificationPerformance/Group 258.png' alt=''
                             style={{marginBottom: "10px"}}/>
                        <div className="smallFont mobileBlock" style={{fontSize: "16px"}}>
                            Push Influence Views
                        </div>
                        <div className="bigFont WhiteColor" style={{fontSize: "26px"}}>
                            {this.props.pushViews > 0 ? (this.props.pushViews).toFixed(2) + "%" : ""}
                        </div>
                    </div>
                    <div className="flexBox" style={{textAlign: "center"}}>
                        <div className="flexItem graphView p-0 borderBox" style={{borderRight: "1px solid #1a2023"}}>
                            <div className="smallFont mobileBlock PushInfluenceText" style={{color: "#5ea0a0", fontSize: "16px"}}>
                                Page Views
                            </div>
                            <div className="bigFont WhiteColor" style={{fontSize: "26px"}}>
                                {numeral(Math.floor(this.props.pageViews)).format('0.00a')}
                            </div>
                        </div>
                        <div className="flexItem p-0">
                            <div className="smallFont mobileBlock PushInfluenceText" style={{color: "#a0a07b", fontSize: "16px"}}>
                                PIV
                            </div>
                            <div className="bigFont WhiteColor" style={{fontSize: "26px"}}>
                                {numeral(Math.floor(this.props.pviCount)).format('0.00a')}
                            </div>
                        </div>
                    </div>
                </BPanel>
            </Overlay>
        );
    }

}
