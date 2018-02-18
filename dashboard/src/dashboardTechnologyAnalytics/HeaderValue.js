import * as React from "react";
import { connect } from "react-redux";
import { titleCase } from "change-case";


const mapStateToProps = (state) => {
    return {
        selectedTableTab:state.dashboardTechnologyAnalyticsData.selectedTableTab,
    }
};

@connect(mapStateToProps)
export default class HeaderValue extends React.Component {

    render() {
        return (
        	<h4 style={{color:"#5ea0a0"}}> {titleCase(this.props.selectedTableTab)}</h4>
        	)
    };
};