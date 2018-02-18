import * as React from "react";
import { connect } from "react-redux";
import moment from 'moment-timezone';
import {Link} from "react-router";
import {Col} from "@sketchpixy/rubix/lib/index";
import DashboardTechnologyAnalyticsPresentation from "./DashboardTechnologyAnalyticsPresentation";
import {updateGraphTabSelection, updateTableTabSelection} from "./redux/dashboardTechnologyAnalyticsAction";



const mapStateToProps = (state) => {
    return {
        headerFilter: state.headerFilter,
        colorsArray:state.colors,
        graphData:state.dashboardTechnologyAnalyticsData.graphData,
        tableData:state.dashboardTechnologyAnalyticsData.tableData,
        selectedGraphTab:state.dashboardTechnologyAnalyticsData.selectedGraphTab,
        selectedTableTab:state.dashboardTechnologyAnalyticsData.selectedTableTab,
        isLoading:state.dashboardTechnologyAnalyticsData.isLoading,
        isTableLoading:state.dashboardTechnologyAnalyticsData.isTableLoading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeGraphMetricsTab(graphTabUpdate) {
            dispatch(updateGraphTabSelection({ selectedGraphTab: graphTabUpdate }))
        },

        getDashboardTechnologyTableData: (headerFilter,selectedTableTab) => {
            dispatch({
                type: "DASHBOARD_TECHNOLOGY_TABLE_DATA_UPDATE_WATCHER",
                headerFilter: headerFilter,
                selectedTableTab: selectedTableTab
                
            });
        },

        getDashboardTechnologyAnalyticsData: (headerFilter,selectedTableTab) => {
            let tableTabvalue=headerFilter.distribution.display==="All"?"distribution"
            :headerFilter.distribution.display==="App"?"distribution"
            :headerFilter.distribution.display==="Android-SDK"?"appVersion"
            :headerFilter.distribution.display==="iOS-SDK"?"appVersion"
            :headerFilter.distribution.display==="Mobile"?"browserName"
            :headerFilter.distribution.display==="Desktop"?"browserName"
            :headerFilter.distribution.display==="Web"?"deviceType":"";
            dispatch(updateTableTabSelection({ selectedTableTab: tableTabvalue })),
            dispatch({
                type: "DASHBOARD_TECHNOLOGY_ANALYTICS_DATA_UPDATE_WATCHER",
                headerFilter: headerFilter,
                selectedTableTab: tableTabvalue
           
            });

        }
    };
};




@connect(mapStateToProps, mapDispatchToProps)
export default class DashboardTechnologyAnalyticsContainer extends React.Component {

    handleGraphMetricChange = (event) => {
        this.props.changeGraphMetricsTab(event);
    };

    handleTableMetricChange = (event) => {
        this.props.getDashboardTechnologyTableData(this.props.headerFilter,event);
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
        this.props.getDashboardTechnologyAnalyticsData(this.props.headerFilter,this.props.selectedTableTab);
    }

    componentWillUpdate(nextProps) {
        if (this.props.headerFilter!==nextProps.headerFilter){
            this.props.getDashboardTechnologyAnalyticsData(nextProps.headerFilter,this.props.selectedTableTab);
        }
    }


    render() {
        return (
            
                    <DashboardTechnologyAnalyticsPresentation isLoading={this.props.isLoading}
                                                             isTableLoading={this.props.isTableLoading}
                                                             tableData={this.props.tableData?this.props.tableData:[]}
                                                             graphData={this.props.graphData?this.props.graphData:[]}
                                                             colorsArray={this.props.colorsArray}
                                                             selectedGraphTab={this.props.selectedGraphTab}
                                                             selectedTableTab={this.props.selectedTableTab}
                                                             handleGraphMetricChange={::this.handleGraphMetricChange}
                                                             handleTableMetricChange={::this.handleTableMetricChange}
                                                             filterCaseInsensitive={::this.filterCaseInsensitive}
                                                             headerFilter={this.props.headerFilter}
                                                                           />
              

        )
    };
};
