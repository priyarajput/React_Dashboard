import * as React from "react";

import {connect} from "react-redux";
import UserDeviceReferralAnalyticsPresentation from "./UserDeviceReferralAnalyticsPresentation";


const mapStateToProps = (state) => {


    return {
        requestHeaders: state.requestHeader
    }
};

@connect(mapStateToProps)
export default class UserDeviceReferralAnalyticsContainer extends React.Component {

    render() {

        return (
            <div>
                <UserDeviceReferralAnalyticsPresentation/>
            </div>
        );
    }

}