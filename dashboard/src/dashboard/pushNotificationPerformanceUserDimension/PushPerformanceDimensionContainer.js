import * as React from "react";
import PushPerformanceDimensionTablePresentation from "./PushPerformanceDimensionTablePresentation";
import {updateDimensionPushOpen, updateDimensionSelection} from "./redux/dimensionPerformanceAction";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        dimensionPerformance: state.dimensionPerformanceData.dimensionPerformance ? state.dimensionPerformanceData.dimensionPerformance :[],
        dimensionSelection:state.dimensionPerformanceData.dimensionSelection,
        colors:state.colors,
        isLoading:state.dimensionPerformanceData.isLoading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateDimensionPushOpen: (data) => {
            dispatch(updateDimensionPushOpen(data));
        },
        updateDimensionSelection: (dimensionSelection) => {
            dispatch(updateDimensionSelection(dimensionSelection));
        },
        getPushPerformanceDimension:(user,headerFilter,dimensionSelection,limit,timeInterval)=>{
            dispatch({type: "PUSH_NOTIFICATION_PERFORMANCE_DIMENSION_DATA_UPDATE_WATCHER",timeInterval:timeInterval, user: user,headerFilter:headerFilter,dimensionSelection:dimensionSelection,limit:limit});
        }
    };
};

@connect(mapStateToProps,mapDispatchToProps)
export default class PushPerformanceDimensionContainer extends React.Component{

    componentWillMount(){
        this.props.getPushPerformanceDimension(this.props.user,this.props.headerFilter,this.props.dimensionSelection.dimensionKeyValue,5,0);
    }

    selectAggregator=(aggregateBy)=>{
        this.props.getPushPerformanceDimension(this.props.user,this.props.headerFilter,aggregateBy.toLowerCase(),5,0);
        this.props.updateDimensionSelection({dimensionKeyValue:aggregateBy.toLowerCase(),dimensionKeyLabel:aggregateBy});
    };

    componentWillUpdate(nextProps){
        if(!nextProps.isLoading && nextProps.dimensionSelection.dimensionKeyValue===this.props.dimensionSelection.dimensionKeyValue)
            this.props.getPushPerformanceDimension(nextProps.user,nextProps.headerFilter,nextProps.dimensionSelection.dimensionKeyValue,5,300000);
    }

    render(){
        return(
             <PushPerformanceDimensionTablePresentation
                 selectAggregator={::this.selectAggregator}
                 dimensionSelection={this.props.dimensionSelection}
                 dimensionPerformance={this.props.dimensionPerformance}
                 colors={this.props.colors}
                 isLoading={this.props.isLoading}
                 JsonFile={this.props.JsonFile}/>
        );
    }
}