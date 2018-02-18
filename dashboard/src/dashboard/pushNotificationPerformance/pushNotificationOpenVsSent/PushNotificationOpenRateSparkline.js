import * as ReactDOM from "react-dom";
import * as React from "react";
import {connect} from "react-redux";
// import connect from "react-redux/es/connect/connect";


export default class PushNotificationOpenRateSparkline extends React.Component {
    /** @namespace this.refs.sparklineOne */

    componentDidMount() {
        this.plotSparkline(this.props);
    }

    componentWillUpdate(nextProps, nextState) {
        this.plotSparkline(nextProps);
    }

    plotSparkline(props){
        let sparkline = props.data;

        $(ReactDOM.findDOMNode(this.refs.sparklineOne)).sparkline(sparkline, {
            type: 'bar',
            height: '20',
            barColor: '#1F9A81'
        });
    }

    render() {
        return (

            <div className='pushNotificationOpenRateGraph' ref='sparklineOne' style={{textAlign: "center"}}>
            </div>

        )
    }
}
