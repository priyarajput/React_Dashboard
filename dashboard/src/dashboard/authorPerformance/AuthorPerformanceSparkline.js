import * as ReactDOM from "react-dom";
import * as React from "react";
import {connect} from "react-redux";
// import connect from "react-redux/es/connect/connect";


export default class AuthorPerformanceSparkline extends React.Component {
    /** @namespace this.refs.sparklineOne */

    componentDidMount() {
        this.plotSparkline(this.props);
    }

    componentWillUpdate(nextProps, nextState) {
        this.plotSparkline(nextProps);
    }

    plotSparkline(props) {
        let sparkline = props.authorPageViewsData;

        $(ReactDOM.findDOMNode(this.refs.sparklineOne)).sparkline(sparkline, {
            type: 'bar',
            width: '140',
            height: '20',
            barColor: '#FADD7F'
        });
    }


    render() {
        return (

            <div ref='sparklineOne' style={{textAlign: "right"}}>

            </div>

        )
    }
}
