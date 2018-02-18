import * as React from "react";
import Overlay from "../common/Overlay.jsx";
import {BPanel, Icon} from "@sketchpixy/rubix/lib/index";
import numeral from 'numeral';

export default class CTRPresentation extends React.Component {

    render() {

        return (
            <Overlay isLoading={this.props.isLoading}>
                <BPanel className="CTRPresentationView  published_view" style={{ minHeight: "270px" }}>

                    <div style={{
                        textAlign: "center",
                        borderBottom: "1px solid #1a2023",
                        paddingTop: 10,
                        paddingBottom: 10
                    }}>

                        <img className='CTRPresentationIcon' src='/imgs/common/piStats/pushNotificationPerformance/Group 254.png' alt=''
                             style={{marginBottom: "10px"}}/>
                        <div className="smallFont mobileBlock" style={{fontSize: "16px"}}>
                            CTR
                        </div>
                        <div className="bigFont WhiteColor" style={{fontSize: "26px"}}>
                            {this.props.ctrCount > 0 ? (this.props.ctrCount).toFixed(2) + "%" : ""}
                        </div>
                    </div>
                    <div className="flexBox" style={{textAlign: "center"}}>
                        <div className="flexItem graphView p-0 borderBox" style={{borderRight: "1px solid #1a2023"}}>
                            <div className="smallFont mobileBlock CTRText" style={{fontSize: "16px", color: "#5ea0a0"}}>
                                Reach
                            </div>
                            <div className="bigFont WhiteColor" style={{fontSize: "26px"}}>

                                {numeral(Math.floor(this.props.totalReach)).format('0.00a')}
                            </div>
                        </div>
                        <div className="flexItem p-0">
                            <div className="smallFont mobileBlock CTRText" style={{color: "#a0a07b", fontSize: "16px"}}>
                                PN Open
                            </div>
                            <div className="bigFont WhiteColor" style={{fontSize: "26px"}}>
                                {numeral(Math.floor(this.props.totalOpen)).format('0.00a')}
                            </div>
                        </div>
                    </div>
                </BPanel>
            </Overlay>

        );
    }

}
