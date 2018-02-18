import * as React from "react";
import { Icon } from "@sketchpixy/rubix/lib/index";
import humanFormat from 'human-format';
import numeral from 'numeral';

export default class RegisteredVsActivePresentation extends React.Component {

    render() {
        return (
            <div className="text-center blockSpan">
                <div className="text-center">
                    <img className='imgIcons imgActiveDeviceIcons' src='/imgs/common/devices.png' /></div>
                <p className="textSize activeDeviceText">Active Devices</p>
                <p>{numeral(Math.floor(this.props.activeDevices)).format('0.00a')}</p>
            </div>
        );
    }

}