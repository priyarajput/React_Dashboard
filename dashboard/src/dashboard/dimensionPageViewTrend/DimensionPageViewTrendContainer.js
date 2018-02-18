import * as React from "react";

import {connect} from "react-redux";
import DimensionPageviewTrendPresentation from "./DimensionPageviewTrendPresentation";
import {updateDimensionSelection} from "./redux/dimensionPageViewTrendAction";


const mapStateToProps = (state) => {
    return {
        dimensionPageviews: state.dimensionPageviewTrend.dimensionPageviews ? state.dimensionPageviewTrend.dimensionPageviews : {
            graphData: {
                data: [],
                keys: []
            }
        },
        isLoading:state.dimensionPageviewTrend.isLoading,
        dimensionSelection:state.dimensionPageviewTrend.dimensionSelection
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateDimensionSelection: (dimensionSelection) => {
            dispatch(updateDimensionSelection(dimensionSelection));
        },
        getDimensionPageviews:(user,headerFilter,dimensionSelection,limit,timeInterval)=>{
            dispatch({type: "DEVICE_DIMENSION_PAGEVIEWS_DATA_UPDATE_WATCHER",timeInterval:timeInterval,
                user: user,headerFilter:headerFilter,dimensionSelection:dimensionSelection,limit:limit});
        }
    };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class DimensionPageViewTrendContainer extends React.Component {

    aggByValueSelection=(aggregateBy)=>{
        this.props.getDimensionPageviews(this.props.user,this.props.headerFilter,aggregateBy.toLowerCase(),5,0);
        this.props.updateDimensionSelection({dimensionKeyValue:aggregateBy.toLowerCase(),dimensionKeyLabel:aggregateBy});
    };

    componentWillMount(){
        this.props.getDimensionPageviews(this.props.user,this.props.headerFilter,this.props.dimensionSelection.dimensionKeyValue,5,0);
    }

    componentWillUpdate(nextProps){
        if(!nextProps.isLoading  && nextProps.dimensionSelection.dimensionKeyValue===this.props.dimensionSelection.dimensionKeyValue)
            this.props.getDimensionPageviews(nextProps.user,nextProps.headerFilter,nextProps.dimensionSelection.dimensionKeyValue,5,300000);
    }

    render() {
        return (
            <div>
                <DimensionPageviewTrendPresentation aggByValueSelection={::this.aggByValueSelection}
                                                    dimensionSelection={this.props.dimensionSelection}
                                                    dimensionPageviews={this.props.dimensionPageviews}
                                                    isLoading={this.props.isLoading}
                                                    JsonFile={this.props.JsonFile}/>
            </div>
        );
    }
}