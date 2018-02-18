import * as React from "react";
import Overlay from "../common/Overlay.jsx";
import { BPanel, Icon } from "@sketchpixy/rubix/lib/index";
import ModalPresentation from "./ModalPresentation";
import { Row, Col, Button } from '@sketchpixy/rubix';

export default class PageSessionPresentation extends React.Component {

    render() {
        return (
            <div>
                <Overlay isLoading={this.props.isLoading}>
                    <BPanel className="p-0" style={{ minHeight: "260px" }}>
                        <div style={{ textAlign: "center", paddingTop: 41, paddingBottom: 41 }} >
                            <img src='/imgs/common/piStats/overviewScreen/PageSession.png' alt=''
                                style={{ marginBottom: "10px" }} />
                            <div className="smallFont mobileBlock" style={{ fontSize: "13px" }}>
                                <ModalPresentation
                                    user={this.props.user}
                                    language={this.props.language}
                                    headerFilter={this.props.headerFilter}
                                    rounded={true}
                                    count={this.props.pageSessionViews}
                                    graphData={this.props.pageSessionViewsGraphData}
                                    keys={this.props.pageSessionViewsGraphKeys}
                                    title="Page/Session" image="/imgs/common/piStats/overviewScreen/PageSession.png" />
                            </div>
                            <div className="bigFont WhiteColor" style={{ fontSize: "26px" }}>
                                {this.props.pageSessionViews > 0 ? (this.props.pageSessionViews) : "No Data"}
                            </div>
                        </div>
                    </BPanel>
                </Overlay>
            </div>
        );
    }
}