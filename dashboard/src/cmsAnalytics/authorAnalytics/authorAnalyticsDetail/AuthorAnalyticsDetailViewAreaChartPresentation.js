import * as React from "react";
import {BPanel} from "@sketchpixy/rubix/lib/index";
import {LineChart, XAxis, YAxis, Tooltip, Line, Legend, CartesianAxis, ResponsiveContainer} from 'recharts';
import moment from "moment-timezone";
import AxisLabel from "./../../AxisLabel.js";

export default class AuthorAnalyticsDetailViewAreaChartPresentation extends React.Component {

    dateFormat = (time) => {

        if(this.props.headerFilter.grainNonDashboard==="hour")
        {
            return moment(time).format("hh A");
        }
        else
        {
           return moment(time).format('ddd DD MMM');
        }

    };

    render() {
        let XAxisValue=((window.screen.availWidth)>=990 && (window.screen.availWidth)<1000)? window.screen.availWidth-310:(window.screen.availWidth)>=1000?window.screen.availWidth-320:screen.width-50;
         let days=0;
         var diff = Date.parse( moment(this.props.headerFilter.dateNonDashboard.endDate).format('YYYY-MM-DD') ) - Date.parse( moment(this.props.headerFilter.dateNonDashboard.startDate).format('YYYY-MM-DD') ); 
          isNaN( diff ) ?days=0 : days = Math.floor( diff / 86400000 );
          let intervalValue=this.props.headerFilter.grainNonDashboard==="hour"?2:Math.floor(days/7);
        return (
            <div style={{margin:"15px"}}>
                <BPanel style={{minHeight:'400px'}}>
                    <div className="tablehead">
                        Published Vs Pageviews
                    </div>
                    <ResponsiveContainer minHeight={400}>
                        <LineChart data={this.props.dualAreaGraphData}
                                   margin={{top: 50, right: 30, left: 50, bottom: 10}}>
                            <XAxis dataKey="timestamp" tickCount={7} tickLine={true} tickFormatter={::this.dateFormat} interval={intervalValue}/>
                            <YAxis label={<AxisLabel axisType="yAxis" x={30} y={197} width={0} height={0}>Page Views</AxisLabel>} yAxisId="left" tickCount={10} tickLine={true} axisLine={true}/>
                            <YAxis label={<AxisLabel axisType="yAxis" x={XAxisValue} y={197} width={0} height={0}>Published</AxisLabel>} yAxisId="right" orientation='right' tickCount={10} tickLine={true} axisLine={true}/>
                            <Legend/>
                            <Tooltip style={{fill:"#fff"}} labelFormatter={::this.dateFormat}/>
                            <CartesianAxis />
                            <Line strokeWidth={4} yAxisId="left"  type='linear' dataKey='pageViews' stackId="1" stroke='#217262' fill='#2eb398' name='PageViews' />
                            <Line strokeWidth={4} yAxisId="right" type='linear' dataKey='publishedContent' stackId="1" stroke='#453656' fill='#80699b' name='Published' />
                        </LineChart>
                    </ResponsiveContainer>
                </BPanel>
            </div>
        );
    }

}
// style={{textAnchor:"start",fill:"#fff"}}