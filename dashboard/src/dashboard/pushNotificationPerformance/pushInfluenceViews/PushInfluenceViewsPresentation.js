import * as React from "react";
import { Icon } from "@sketchpixy/rubix/lib/index";
export default class PushInfluenceViewsPresentation extends React.Component {

    render() {
        return (
            <div className="text-center blockSpan">
                <div className="text-center">
                    <img className='imgIcons imgPIVIcon' src='/imgs/common/PIV.png' /></div>
                <p className="textSize PIVText">PIV %</p>
                <p>{Math.floor(this.props.pushViews)}%</p>
            </div>
        );
    }

}