/**
 * Created by bluepi12 on 1/9/17.
 */
import * as React from "react";
import DatePicker from "../../reusable/DatePicker";
import {connect} from "react-redux";
import {changeDateSelection} from "../redux/headerCreateAction";

import { NavItem} from '@sketchpixy/rubix';

const mapStateToProps = (state) => {
    return {
        dateNonDashboard: state.headerFilter.dateNonDashboard,
        grainNonDashboard:state.headerFilter.grainNonDashboard
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeDateSelection: (date) => {
            dispatch(changeDateSelection(date));
        }
    };
};

@connect(mapStateToProps, mapDispatchToProps)

export default class DatePickerContainer extends React.Component {

    render() {
        return (
            <NavItem className='dateSelectionDropDown'>
                    <DatePicker date={this.props.dateNonDashboard} changeDateSelection={this.props.changeDateSelection}/>
            </NavItem>

        );
    }

}