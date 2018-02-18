import * as React from "react";
import { connect } from "react-redux";
import moment from 'moment';
import PushNotificationPerformancePresentation from "./PushNotificationPerformancePresentation";

const mapStateToProps = (state) => {
    return {
        headerFilter: state.headerFilter,
        colorsArray:state.colors,
        dimension: state.pushNotificationPerformanceData.dimension,
        dimensionFilter: state.pushNotificationPerformanceData.dimensionFilter,
        isLoading: state.pushNotificationPerformanceData.isLoading,
        totalOpen: state.pushNotificationPerformanceData.totalOpen ? state.pushNotificationPerformanceData.totalOpen : 0,
        totalReach: state.pushNotificationPerformanceData.totalReach ? state.pushNotificationPerformanceData.totalReach : 0,
        activeDevices: state.pushNotificationPerformanceData.activeDevices ? state.pushNotificationPerformanceData.activeDevices : 0,
        pushViews: state.pushNotificationPerformanceData.pushViews ? state.pushNotificationPerformanceData.pushViews : 0,
        isLoadingTable: state.pushNotificationPerformanceData.isLoadingTable,
        pviCount: state.pushNotificationPerformanceData.pviCount ? state.pushNotificationPerformanceData.pviCount : 0,
        ctrCount: state.pushNotificationPerformanceData.ctrCount ? state.pushNotificationPerformanceData.ctrCount : 0,
        pnSent:state.pushNotificationPerformanceData.pnSent ? state.pushNotificationPerformanceData.pnSent : 0,
        pageViews: state.pushNotificationPerformanceData.pageViews ? state.pushNotificationPerformanceData.pageViews : 0,
        tableData: state.pushNotificationPerformanceData.tableData,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPushNotificationPerformanceData: (headerFilter,dimension,dimensionFilter,limit) => {
            dispatch({
                type: "PUSH_NOTIFICATION_PERFORMANCE_DATA_UPDATE_WATCHER",
                headerFilter: headerFilter,
                dimension: dimension,
                dimensionFilter:dimensionFilter,
                limit:limit
            });
        },
        getPushNotificationPerformanceTableData: (headerFilter,dimension,dimensionFilter,limit) => {
            dispatch({
                type: "PUSH_NOTIFICATION_PERFORMANCE_TABLE_DATA_UPDATE_WATCHER",
                headerFilter: headerFilter,
                dimension: dimension,
                dimensionFilter:dimensionFilter,
                limit:limit
            });
        }
    };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class PushNotificationPerformanceContainer extends React.Component {

    aggByValueSelection=(dropDownValue)=>{
        let dimension={dimensionKeyLabel: dropDownValue.replace('article','').replace(/\b[a-z]/g,function(f){return f.toUpperCase();}), dimensionKeyValue: dropDownValue};
        this.props.getPushNotificationPerformanceTableData(this.props.headerFilter,dimension,this.props.dimensionFilter,1000);
    };

    filterCaseInsensitive = (filter, row) => {
        const id = filter.pivotId || filter.id;
        return (
            row[id] !== undefined ?
                String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
                :
                true
        );
    };

    componentWillMount(){
        this.props.getPushNotificationPerformanceData(this.props.headerFilter,this.props.dimension,this.props.dimensionFilter,1000);
    }

    componentWillUpdate(nextProps) {
        if (this.props.headerFilter!==nextProps.headerFilter){
            this.props.getPushNotificationPerformanceData(nextProps.headerFilter,nextProps.dimension,nextProps.dimensionFilter, 1000);
        }
    }


    render() {
        let days = moment(this.props.headerFilter.dateNonDashboard.endDate).diff(moment(this.props.headerFilter.dateNonDashboard.startDate), 'days');
        return (
            <PushNotificationPerformancePresentation isLoading={this.props.isLoading}
                                                     isLoadingTable={this.props.isLoadingTable}
                                                     tableData={this.props.tableData}
                                                     colorsArray={this.props.colorsArray}
                                                     totalOpen={this.props.totalOpen}
                                                     totalReach={days===0?this.props.totalReach:this.props.totalReach/days}
                                                     ctrCount={this.props.ctrCount===0?0:(this.props.totalOpen/this.props.ctrCount)*100}
                                                     activeDevices={this.props.activeDevices}
                                                     pushViews={this.props.pushViews}
                                                     pageViews={this.props.pageViews}
                                                     pviCount={this.props.pviCount}
                                                     aggByValueSelection={::this.aggByValueSelection}
                                                     filterCaseInsensitive={::this.filterCaseInsensitive}
                                                     dimension={this.props.dimension}/>
        )
    };
};
