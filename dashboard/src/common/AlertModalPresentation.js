import * as React from "react";
import SweetAlert from 'react-bootstrap-sweetalert';

export default class AlertModalPresentation extends React.Component {
    render() {
        return (
            <div id="alertModal">
            {this.props.isSuccessfully &&
                <SweetAlert success title={this.props.textError}  onConfirm={this.props.close}  />
            }
            {!this.props.isSuccessfully &&
                <SweetAlert danger title={this.props.textError}  onConfirm={this.props.close}  />
            }
            </div >
        )
    };
}
