import * as React from "react";
import { push } from 'react-router-redux';
import {

    Modal, MenuItem,
    Button, Navbar, Nav, Row, NavItem, Icon
} from '@sketchpixy/rubix';

export default class ModalPresentation extends React.Component {


    render() {
        return (
            <div>
                <Modal show={this.props.showModal} onHide={this.props.close} id="modalBox" >
                    <Modal.Body style={{ textAlign: "center", fontSize: "20px" }}>
                        {this.props.isRedirect && <p style={{ color: "#1f9a81", fontSize: "80px" }}><Icon bundle='simple-line-icons' glyph="check" /></p>}
                        {!this.props.isRedirect && <p style={{ color: "#df7979", fontSize: "80px" }}><Icon bundle='simple-line-icons' glyph="close" /></p>}
                        <p>{this.props.textError}</p>
                        {this.props.isRedirect && <p style={{ color: "#1f9a81" }}>OK, COOL</p>}
                        {!this.props.isRedirect && <p style={{ color: "#df7979" }}>TRY AGAIN</p>}
                    </Modal.Body>
                </Modal >
            </div >
        )
    };
}
