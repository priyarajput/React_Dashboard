import * as React from "react";
import { connect } from "react-redux";
import { titleCase } from "change-case";


const mapStateToProps = (state) => {
    return {
        dimension: state.pushNotificationPerformanceData.dimension,
    }
};

@connect(mapStateToProps)
export default class HeaderValue extends React.Component {

    render() {
        return (
        	<h4 style={{color:"#a06666"}}> {titleCase(this.props.dimension.dimensionKeyLabel)}</h4>
        	)
    };
};