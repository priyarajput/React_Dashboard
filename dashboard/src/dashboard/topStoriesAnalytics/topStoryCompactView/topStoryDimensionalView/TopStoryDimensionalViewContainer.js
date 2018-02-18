import * as React from "react";
import {connect} from "react-redux";
import TopStoryDimensionalViewPresentation from "./TopStoryDimensionalViewPresentation";
import {updateGraphAggregateDimension} from "../../redux/topStoryActions";

const mapStateToProps = (state) => {
    return {
        graphAggregatedOn:state.topStory.graphAggregatedOn,
        isLoadingGraph:state.topStory.isLoadingGraph,
        dimensionalData: state.topStory.dimensionalData ? state.topStory.dimensionalData : {
            graphData: {
                data: [],
                keys: []
            }
        }
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateGraphAggregateDimension: (graphAggregatedOn) => {
            dispatch(updateGraphAggregateDimension(graphAggregatedOn));
        },
        getSelectedContentDimension:(user,headerFilter,dimensionSelection,limit,articleId,language,timeInterval)=>{
            dispatch({type: "SELECTED_CONTENT_DIMENSIONAL_DATA_DATA_UPDATE_WATCHER",timeInterval:timeInterval, user: user,headerFilter:headerFilter,dimensionSelection:dimensionSelection,limit:limit,articleId:articleId,language:language});
        }
    };
};

@connect(mapStateToProps,mapDispatchToProps)
export default class TopStoryDimensionalViewContainer extends React.Component{

    handleAggregationsDimensional = (aggregatedBy) => {
        this.props.getSelectedContentDimension(this.props.user,this.props.headerFilter,aggregatedBy.toLowerCase(),5,this.props.articleId,this.props.language,0);
        this.props.updateGraphAggregateDimension({label:aggregatedBy,value:aggregatedBy.toLowerCase()})
    };

    componentWillMount(){
        this.props.getSelectedContentDimension(this.props.user,this.props.headerFilter,this.props.graphAggregatedOn.value,5,this.props.articleId,this.props.language,0);
    }

    render(){
        return(
            <TopStoryDimensionalViewPresentation
                handleAggregationsDimensional={::this.handleAggregationsDimensional}
                graphAggregatedOn={this.props.graphAggregatedOn}
                articleId={this.props.articleId}
                dimensionalData={this.props.dimensionalData}
                isLoadingGraph={this.props.isLoadingGraph}/>
        );
    }
}