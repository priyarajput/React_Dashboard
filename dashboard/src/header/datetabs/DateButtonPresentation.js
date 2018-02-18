import * as React from "react";
import {MenuItem, NavDropdown} from "@sketchpixy/rubix/lib/index";
import moment from 'moment';

export default class DateButtonPresentation extends React.Component{

    render(){
        return(
            <NavDropdown className='dateSelectionDropDown' eventKey={4} bsStyle="orange45" title={this.props.keyVal} id="nav-dropdown-date">
                <MenuItem
                    eventKey="last30Minutes"
                    onClick={this.props.update.bind(this,"last30Minutes","Last 30 Minutes",{startDate:moment().utc().subtract(30,'minute'),endDate:moment().utc()})}>
                    Last 30 Minutes</MenuItem>
                <MenuItem
                    eventKey="last24Hours"
                    onClick={this.props.update.bind(this,"last24Hours","Last 24 Hours",{startDate:moment().utc().subtract(24,'hour'),endDate:moment().utc()})}>
                    Last 24 Hours</MenuItem>
                <MenuItem eventKey="today"
                          onClick={this.props.update.bind(this,"today","Today",{startDate:moment().utc().startOf('day'),endDate:moment().utc()})}>
                    Today</MenuItem>
                <MenuItem eventKey="yesterday"
                          onClick={this.props.update.bind(this,"yesterday","Yesterday",{startDate:moment().utc().subtract(1,'day').startOf('day'),endDate:moment().utc().subtract(1,'day').endOf('day')})}>
                    Yesterday</MenuItem>
                <MenuItem
                    eventKey="lastWeek"
                    onClick={this.props.update.bind(this,"lastWeek","Last Week",{startDate:moment().utc().subtract(1,'week').startOf('week'),endDate:moment().utc().subtract(1,'week').endOf('week')})}>
                    Last Week</MenuItem>
            </NavDropdown>
        );
    }
}