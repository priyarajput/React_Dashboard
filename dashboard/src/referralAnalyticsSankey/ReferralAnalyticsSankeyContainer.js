import * as React from "react";
import {connect} from "react-redux";
import ReferralAnalyticsSankeyPresentation from "./ReferralAnalyticsSankeyPresentation";
import {updateMetricTabSelection} from "./redux/referralAnalyticsSankeyActionCreator";

const mapStateToProps = (state) => {
    return {
        headerFilter: state.headerFilter,
        graphData:state.referralAnalyticsSankeyData.graphData,
        graphNodes:state.referralAnalyticsSankeyData.graphNodes,
        graphFlows:state.referralAnalyticsSankeyData.graphFlows,
        isLoading:state.referralAnalyticsSankeyData.isLoading,
        selectedMetricTab:state.referralAnalyticsSankeyData.selectedMetricTab,
        colorsArray:state.colors
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeMetricsTab(tabUpdate){
            dispatch(updateMetricTabSelection({selectedMetricTab:tabUpdate}))
        },
        getreferralAnalyticsSankeyData(headerFilter){
            dispatch({type:'REFERRAL_ANALYTICS_SANKEY_DIMENSION_DATA_UPDATE_WATCHER',headerFilter:headerFilter})
        }
    };
};


@connect(mapStateToProps, mapDispatchToProps)
export default class ReferralAnalyticsSankeyContainer extends React.Component {

    componentWillMount(){
        this.props.getreferralAnalyticsSankeyData(this.props.headerFilter);
    }

    componentWillUpdate(nextProps){
        if(this.props.headerFilter!==nextProps.headerFilter){
            this.props.getreferralAnalyticsSankeyData(nextProps.headerFilter);
        }
    }

    handleMetricChange=(event)=>{
        this.props.changeMetricsTab(event);
    };

    render() {
        return (
            <ReferralAnalyticsSankeyPresentation handleMetricChange={::this.handleMetricChange}
                                           graphFlows={this.props.graphFlows}
                                           graphNodes={this.props.graphNodes}
                                           isLoading={this.props.isLoading}
                                           selectedMetricTab={this.props.selectedMetricTab}
                                           colorsArray={this.props.colorsArray} />
        )
    };
};
