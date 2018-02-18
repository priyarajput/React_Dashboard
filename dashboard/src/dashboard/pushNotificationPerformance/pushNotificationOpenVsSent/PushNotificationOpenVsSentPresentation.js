import * as React from "react";
import { Icon } from "@sketchpixy/rubix/lib/index";
import PushNotificationOpenRateSparkline from "./PushNotificationOpenRateSparkline";
import humanFormat from 'human-format';
import numeral from 'numeral';

export default class PushNotificationOpenVsSentPresentation extends React.Component {

    render() {
        return (
            <div className='col-8 '>
                <div className="flexBox ">
                    <div className="flexItem sendTextAndValue">
                        <div className="text-center">
                            <img className='imgIcons imgSend' src='/imgs/common/pn_send.png' /></div>
                        <p className="text-center smallFont">  {numeral(Math.floor(this.props.totalReach)).format('0.00a')}</p>
                    </div>

                    <div className="flexItem openTextAndValue">
                        <div className="text-center">
                            <img className='imgIcons imgOpen' src='/imgs/common/pn_open.png' /></div>
                        <p className="text-center smallFont">{numeral(Math.floor(this.props.totalOpen)).format('0.00a')}</p>
                    </div>
                    
                    <div className="flexItem ctrFontandValue ">
                        <div className="text-center" style={{ fontSize: '17px' }}> <img className='imgIcons imgCTR' src='/imgs/common/CTR.png' /></div>
                        <p className="text-center smallFont">{(parseFloat(this.props.ctrCount).toFixed(2))}%</p>
                    </div>
                </div>
                <div>
                    <PushNotificationOpenRateSparkline data={this.props.openRateArray} />
                </div>
            </div>
        );
    }

}