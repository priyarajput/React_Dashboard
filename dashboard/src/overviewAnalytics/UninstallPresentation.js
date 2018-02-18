
import * as React from "react";
import Overlay from "../common/Overlay.jsx";
import { BPanel, Icon } from "@sketchpixy/rubix/lib/index";
import ModalPresentation from "./ModalPresentation";
import { Row, Col, Button } from '@sketchpixy/rubix';
import numeral from "numeral";

export default class UninstallPresentation extends React.Component {

    render() {
        return (
            <div>
                <Overlay isLoading={this.props.isLoading}>
                    <BPanel className="p-0" style={{ minHeight: "260px" }}>
                        <div style={{ textAlign: "center", paddingTop: 41, paddingBottom: 41 }} >
                            <img src='/imgs/common/piStats/overviewScreen/Uninstall.png' alt=''
                                style={{ marginBottom: "10px" }} />
                            <div className="smallFont mobileBlock" style={{ fontSize: "13px" }}>
                                <ModalPresentation
                                    user={this.props.user}
                                    language={this.props.language}
                                    headerFilter={this.props.headerFilter}
                                    count={this.props.uninstallViews}
                                    graphData={this.props.uninstallViewsGraphData}
                                    keys={this.props.uninstallViewsGraphKeys}
                                    title="Uninstall" image="/imgs/common/piStats/overviewScreen/Uninstall.png" />
                            </div>
                            <div className="bigFont WhiteColor" style={{ fontSize: "26px" }}>
                                {this.props.uninstallViews > 0 ? numeral(Math.floor(this.props.uninstallViews)).format('0.00a') : "No Data"}
                            </div>
                        </div>
                    </BPanel>
                </Overlay>
            </div>
        );
    }
}