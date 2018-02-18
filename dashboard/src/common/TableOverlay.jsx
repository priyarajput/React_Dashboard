import * as React from "react";
import Overlay from "./Overlay.jsx";

export default class TableOverlay extends React.Component {

    render() {
        {
            return this.props.loading ?
                <div className="-loading -active"><Overlay style={{visibility: "visible"}}  isLoading={this.props.loading}/></div>
                : null;
        }

    }
}