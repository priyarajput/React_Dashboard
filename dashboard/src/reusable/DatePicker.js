/**
 * Created by bluepi12 on 1/9/17.
 */
import DatetimeRangePicker from "react-bootstrap-datetimerangepicker";

import {Button,Icon} from "@sketchpixy/rubix/lib/index";
import React from 'react';
import moment from 'moment';

export default class DatePicker extends React.Component {

    handleApply(event, picker) {
        let date={
            startDate:picker.startDate.startOf('day').format("YYYY-MM-DDTHH:mm:00.sssZ"),
            endDate:picker.endDate.endOf('day').format("YYYY-MM-DDTHH:mm:00.sssZ")
        };
        this.props.changeDateSelection(date);
    }

    render() {
        const ranges = {
            'Today': [moment(), moment()],
            'Last Week': [moment().subtract(1, 'week').startOf('week'), moment().subtract(1, 'week').endOf('week')],
            'Last 30 Days': [moment().subtract(1, 'month'), moment()]
        };
        console.log("this.props.date.startDate",this.props.date.startDate)
        return (
            <div >
                <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.css" />
                <DatetimeRangePicker 
                    startDate={moment(new Date(this.props.date.startDate))}
                    endDate={moment(new Date(this.props.date.endDate))}
                    ranges={ranges}
                    locale={{"format":"YYYY-MM-DD"}}
                    minDate={moment().subtract(1, 'month')}
                    maxDate={moment()}
                    showDropdowns={true}
                    opens="left"
                    onApply={::this.handleApply}
                >
                    <Icon glyph='glyphicon-calendar'/> &nbsp;
                    <span>{moment(new Date(this.props.date.startDate)).format("YYYY-MM-DD")} - {moment(new Date(this.props.date.endDate)).format("YYYY-MM-DD")}</span>&nbsp;
                    <Icon className="caret caretIcon"/>
                </DatetimeRangePicker>
            </div>
        );
    }
}