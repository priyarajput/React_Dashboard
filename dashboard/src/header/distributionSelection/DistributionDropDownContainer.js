import * as React from "react";
import {connect} from "react-redux";
import {updateHeaderDistribution} from "../redux/headerCreateAction";
import DistributionDropDownPresentation from "./DistributionDropDownPresentation";

const mapStateToProps = (state) => {
    return {
        distribution: state.headerFilter.distribution,
        user : state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateDistribution: (data) => {
            dispatch(updateHeaderDistribution(data));
        }
    };
};

@connect(mapStateToProps,mapDispatchToProps)
export default class DistributionDropDownContainer extends React.Component{

    updateDistribution=(display,appFilter,appColumn,subDimension,subDimensionValue)=>{
        this.props.updateDistribution({display:display,
            appFilter:appFilter,
            appColumn:appColumn,
            subDimension:subDimension,
            subDimensionValue:subDimensionValue});
    };

    render(){
        return(
            <DistributionDropDownPresentation id="distributionPreference"
                              distribution={this.props.distribution}
                              update={::this.updateDistribution}/>
        );
    }
}