import * as React from "react";
import TopLevelCMSDimensionPresentation from "./TopLevelCMSDimensionPresentation";
import {connect} from "react-redux";
import {refresh} from "./redux/actionCreators";


const mapDispatchToProps = (dispatch) => {

    return {
        refreshAPIData: (data, dimension) => {
            dispatch(refresh(data, dimension));
        },
        getCMSDimensionPerformance:(user,headerFilter,dimensionSelection,limit,timeInterval,type)=>{
            dispatch({type: "CMS_DIMENSION_PERFORMANCE_DATA_UPDATE_WATCHER",
            timeInterval:timeInterval, user: user,headerFilter:headerFilter,
            dimensionSelection:dimensionSelection,limit:limit,actionType:type});
        }
    }
};

const mapStateToProps = (state) => {
    return {
        cmsDimensionContainerDimensionToDisplay: state.cmsTopContentByDimension.cmsDimensionContainerDimensionToDisplay ?
            state.cmsTopContentByDimension.cmsDimensionContainerDimensionToDisplay : "categoryList",
        cmsDimensionContainerDimensionData: state.cmsTopContentByDimension.cmsDimensionContainerDimensionData ?
            state.cmsTopContentByDimension.cmsDimensionContainerDimensionData : [],
        cmsDimensionContainerDimensionDataTotal: state.cmsTopContentByDimension.cmsDimensionContainerDimensionDataTotal,
        isLoading:state.cmsTopContentByDimension.isLoading,
        colors:state.colors
    }
};

@connect(mapStateToProps, mapDispatchToProps)
export default class CMSDimensionContainer extends React.Component {

    changeDimension = function (newDimension) {
        this.props.getCMSDimensionPerformance(this.props.user,this.props.headerFilter,newDimension,5,0,'fetch');
    };

    componentWillMount() {
        this.props.getCMSDimensionPerformance(this.props.user,this.props.headerFilter,this.props.cmsDimensionContainerDimensionToDisplay,5,0,'fetch');
    };

    componentWillUpdate(nextProps){
        if(!nextProps.isLoading  && nextProps.cmsDimensionContainerDimensionToDisplay===this.props.cmsDimensionContainerDimensionToDisplay)
            this.props.getCMSDimensionPerformance(nextProps.user,nextProps.headerFilter,nextProps.cmsDimensionContainerDimensionToDisplay,5,300000,'update');
    }

    render() {
        let dimensionToDisplay = this.props.cmsDimensionContainerDimensionToDisplay;
        return (
            <TopLevelCMSDimensionPresentation dimensionData={this.props.cmsDimensionContainerDimensionData}
                                              dimension={dimensionToDisplay}
                                              dimensionTotal={this.props.cmsDimensionContainerDimensionDataTotal}
                                              changeDimension={::this.changeDimension}
                                              colors={this.props.colors}
                                              isLoading={this.props.isLoading}
                                              JsonFile={this.props.JsonFile}
            />
        );
    }
}