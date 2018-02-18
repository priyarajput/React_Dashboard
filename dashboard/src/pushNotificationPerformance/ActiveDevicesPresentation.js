import * as React from "react";
import Overlay from "../common/Overlay.jsx";
import {BPanel, Icon} from "@sketchpixy/rubix/lib/index";
import numeral from 'numeral';

export default class ActiveDevicesPresentation extends React.Component {

    render() {

        return (
            <Overlay isLoading={this.props.isLoading}>
                <BPanel className="activeDevicesView published_view" style={{ minHeight: "270px" }}>
                    <div style={{textAlign: "center", paddingTop: 41, paddingBottom: 41}}>
                        <img className='activeDevicesIcon' src='/imgs/common/piStats/pushNotificationPerformance/Group 255.png' alt=''
                             style={{marginBottom: "10px"}}/>
                        <div className="smallFont mobileBlock" style={{fontSize: "16px"}}>
                            Active Devices
                        </div>
                        <div className="bigFont WhiteColor" style={{fontSize: "26px"}}>

                            {this.props.activeDevices > 0 ? numeral(Math.floor(this.props.activeDevices)).format('0.00a') : ""}
                        </div>
                    </div>
                </BPanel>
            </Overlay>

        );
    }

}
