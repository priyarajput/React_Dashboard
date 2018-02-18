import * as React from "react";
import {connect} from "react-redux";
import ReferralAnalyticsPresentation from "./ReferralAnalyticsPresentation";
import {updateMetricTabSelection} from "./redux/referralAnalyticsActionCreator";

const mapStateToProps = (state) => {
    return {
        headerFilter: state.headerFilter,
        referralDropDownList:state.referralAnalyticsData.referralDropDownList,
        tableData:state.referralAnalyticsData.tableData,
        referralLevelAndValue:state.referralAnalyticsData.referralLevelAndValue,
        referralDropDownSelection:state.referralAnalyticsData.referralDropDownSelection,
        graphData:state.referralAnalyticsData.graphData,
        topFiveDimensions:state.referralAnalyticsData.topFiveDimensions?state.referralAnalyticsData.topFiveDimensions:[],
        pieChartData:state.referralAnalyticsData.pieChartData,
        isLoadingReferral:state.referralAnalyticsData.isLoadingReferral,
        isLoadingPie:state.referralAnalyticsData.isLoadingPie,
        cmsDimensionDropDownSelection:state.referralAnalyticsData.cmsDimensionDropDownSelection,
        selectedMetricTab:state.referralAnalyticsData.selectedMetricTab,
        colorsArray:state.colors
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeMetricsTab(tabUpdate){
            dispatch(updateMetricTabSelection({selectedMetricTab:tabUpdate}))
        },
        getReferralAnalyticsData(headerFilter,referralDropDownSelection,referralLevelAndValue,level,filter,aggregate){
            dispatch({type:'REFERRAL_ANALYTICS_DIMENSION_DATA_UPDATE_WATCHER',
                headerFilter:headerFilter,referralDropDownSelection:referralDropDownSelection,referralLevelAndValue:referralLevelAndValue,level:level,filter:filter,aggregate:aggregate})
        },
        getReferralAnalyticsPieChartData(headerFilter,cmsDimensionDropDownSelection,filter,level,aggregate){
            dispatch({type:'REFERRAL_ANALYTICS_DIMENSION_PIE_CHART_DATA_UPDATE_WATCHER',
                headerFilter:headerFilter,cmsDimensionDropDownSelection:cmsDimensionDropDownSelection,filter:filter,level:level,aggregate:aggregate})
        }
    };
};


@connect(mapStateToProps, mapDispatchToProps)
export default class ReferralAnalyticsContainer extends React.Component {

    componentWillMount(){
        this.props.getReferralAnalyticsData(this.props.headerFilter,this.props.referralDropDownSelection,this.props.referralLevelAndValue,0,'',this.props.cmsDimensionDropDownSelection.value);
    }

    componentWillUpdate(nextProps){
        if(this.props.headerFilter!==nextProps.headerFilter){
            this.props.getReferralAnalyticsData(nextProps.headerFilter,{value:'',label:''},[],0,'',nextProps.cmsDimensionDropDownSelection.value);
        }
    }

    handleMetricChange=(event)=>{
        this.props.changeMetricsTab(event);
    };

    handleReferralDropDownChange=(event)=>{
        let referralLevelAndValueList = this.props.referralLevelAndValue;
        switch(event){
            case "top":
                referralLevelAndValueList=[];
                this.props.getReferralAnalyticsData(this.props.headerFilter,{value:'',label:''},referralLevelAndValueList,0,'',this.props.cmsDimensionDropDownSelection.value);
                break;
            case "back":
                referralLevelAndValueList.pop();
                let referralLevel = referralLevelAndValueList.length;
                let referralValue = referralLevelAndValueList.length!==0?referralLevelAndValueList[referralLevel-1]:'';
                this.props.getReferralAnalyticsData(this.props.headerFilter,{value:referralValue,label:referralValue},referralLevelAndValueList,referralLevel,referralValue,this.props.cmsDimensionDropDownSelection.value);
                break;
            default:
                if(referralLevelAndValueList.length<4 && event.target.value) {
                    referralLevelAndValueList.push(event.target.value);
                    this.props.getReferralAnalyticsData(this.props.headerFilter, {
                        value: event.target.value,
                        label: event.target.value
                    }, referralLevelAndValueList, referralLevelAndValueList.length, event.target.value, this.props.cmsDimensionDropDownSelection.value);
                }
                break;
        }
    };

    handleCMSDropDownChange=(event)=>{
        let referralLevel = this.props.referralLevelAndValue.length;
        let referralValue = this.props.referralLevelAndValue.length!==0?this.props.referralLevelAndValue[this.props.referralLevelAndValue.length - 1]:'';
        this.props.getReferralAnalyticsPieChartData(this.props.headerFilter,{value:event,label:event.replace('article','')},referralValue,referralLevel,event);
    };

    render() {
        return (
            <ReferralAnalyticsPresentation handleMetricChange={::this.handleMetricChange}
                                           handleReferralDropDownChange={::this.handleReferralDropDownChange}
                                           handleCMSDropDownChange={::this.handleCMSDropDownChange}
                                           referralDropDownList={this.props.referralDropDownList}
                                           tableData={this.props.tableData}
                                           referralLevelAndValue={this.props.referralLevelAndValue}
                                           referralDropDownSelection={this.props.referralDropDownSelection}
                                           graphData={this.props.graphData}
                                           pieChartData={this.props.pieChartData}
                                           isLoadingReferral={this.props.isLoadingReferral}
                                           isLoadingPie={this.props.isLoadingPie}
                                           cmsDimensionDropDownSelection={this.props.cmsDimensionDropDownSelection}
                                           selectedMetricTab={this.props.selectedMetricTab}
                                           topFiveDimensions={this.props.topFiveDimensions}
                                           colorsArray={this.props.colorsArray} />
        )
    };
};
