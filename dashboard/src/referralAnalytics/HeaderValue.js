import * as React from "react";
import { connect } from "react-redux";
import { titleCase } from "change-case";


const mapStateToProps = (state) => {
    return {
        referralLevelAndValue:state.referralAnalyticsData.referralLevelAndValue,

    }
};

@connect(mapStateToProps)
export default class HeaderValue extends React.Component {

    render() {
    	let HeaderValue="";
    	switch(this.props.referralLevelAndValue.length)
        	{
        		case 0: HeaderValue="Type";
        		break;
        		case 1: HeaderValue="Origin";
        		break;
        		case 2: HeaderValue="Medium";
        		break;
        		case 3: HeaderValue="Index";
        		break;
        		default: HeaderValue="Unknown";
        	}
        return (
        	<h4 style={{color:"#a06666"}}>{HeaderValue}</h4>
        	)
    };
};