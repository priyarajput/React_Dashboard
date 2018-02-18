import * as React from "react";
import {Progress} from "@sketchpixy/rubix/lib/index";
import {titleCase} from "change-case";
import numeral from 'numeral';


export default class SingleCMSDimensionViewsPresentation extends React.Component {

    render() {

        let number = parseFloat(this.props.dimension.count / this.props.dimensionTotal * 100).toFixed(2);
        let dimensionName = this.props.dimension.dimensionName;
        var regex = /^[a-zA-Z\s]+$/;
        var string = this.props.dimension.dimensionName;
        if (regex.test(string)) {
            dimensionName = titleCase(this.props.dimension.dimensionName);
        } else {
            dimensionName = this.props.dimension.dimensionName;
        }
        return (
            <div  className='SingleCMSDimensionViewsPresentationGraph'>
                <Progress
                    value={number}
                    style={{
                        margin: "0px",
                        height: "5px",
                        backgroundColor: "#465050"
                    }} color={this.props.fontcolor}
                    collapseBottom={true} striped={true}/>
                <span style={{margin: "0px"}} className="pull-left">{dimensionName}</span><span
                style={{margin: "0px"}}
                className="pull-right"> {numeral(Math.round(this.props.dimension.count)).format('0.00a')} </span>
            </div>
        );
    }

}