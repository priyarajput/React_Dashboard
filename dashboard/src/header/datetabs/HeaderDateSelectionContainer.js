import * as React from "react";
import DateButton from "./DateButtonPresentation";
import {connect} from "react-redux";
import {updateHeaderDate} from "../redux/headerCreateAction";

const mapStateToProps = (state) => {
    return {
        headerFilter: state.headerFilter
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateHeaderDate: (keyVal,key,date) => {
            dispatch(updateHeaderDate(keyVal,key,date));
        }
    };
};

@connect(mapStateToProps,mapDispatchToProps)
export default class HeaderDateSelectionContainer extends React.Component{

    render(){
        return(
            <DateButton keyVal={this.props.headerFilter.key} update={::this.props.updateHeaderDate}/>
        );
    }

}