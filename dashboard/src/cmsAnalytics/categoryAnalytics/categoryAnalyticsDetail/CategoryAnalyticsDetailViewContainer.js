/**
 * Created by bluepi12 on 7/9/17.
 */

import * as React from "react";
import {connect} from "react-redux";
import CategoryAnalyticsDetailViewPresentation from "./CategoryAnalyticsDetailViewPresentation";

const mapStateToProps = (state) => {
    return {
        headerFilter: state.headerFilter,
        dualAreaGraphData:state.categoryAnalyticsDetailViewData.dualAreaGraphData?state.categoryAnalyticsDetailViewData.dualAreaGraphData:[],
        authorPieData:state.categoryAnalyticsDetailViewData.authorPieData?state.categoryAnalyticsDetailViewData.authorPieData:[],
        typePieData:state.categoryAnalyticsDetailViewData.typePieData?state.categoryAnalyticsDetailViewData.typePieData:[],
        contentTableData: state.categoryAnalyticsDetailViewData.contentTableData?state.categoryAnalyticsDetailViewData.contentTableData:[],
        isLoading: state.categoryAnalyticsDetailViewData.isLoading,
        colorsArray:state.colors,
        downloadTableData: state.categoryAnalyticsDetailViewData.downloadTableData?state.categoryAnalyticsDetailViewData.downloadTableData:[],
        

    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        getCategoryAnalyticsDetailViewData: (headerFilter,filter,cmsDimFilter,cmsDim,limit) => {
            dispatch({
                type: "CATEGORY_ANALYTICS_DETAIL_VIEW_DATA_UPDATE_WATCHER", headerFilter: headerFilter,filter:filter,limit:limit,cmsDim:cmsDim,cmsDimFilter:cmsDimFilter
            });
        }
    };
};
@connect(mapStateToProps, mapDispatchToProps)
export default class CategoryAnalyticsDetailViewContainer extends React.Component {

    componentWillUpdate(nextProps) {
        if (nextProps.headerFilter !== this.props.headerFilter || nextProps.routeParams!==this.props.routeParams) {
            this.props.getCategoryAnalyticsDetailViewData(nextProps.headerFilter,decodeURIComponent(nextProps.params.category),'articleCategory','categoryList',900);
        }
    }

    componentWillMount() {
        this.props.getCategoryAnalyticsDetailViewData(this.props.headerFilter,decodeURIComponent(this.props.params.category),'articleCategory','categoryList',900);
    }

    contentOnChange=(data)=> {
        if (data) {
            this.props.router.push('/cmsAnalytics/categories/'+data.value);
        }
    };

    render() {
        return (
            <CategoryAnalyticsDetailViewPresentation categoryName={this.props.params.category}
                                                     dualAreaGraphData={this.props.dualAreaGraphData}
                                                     authorPieData={this.props.authorPieData}
                                                     typePieData={this.props.typePieData}
                                                     contentTableData={this.props.contentTableData}
                                                     isLoading={this.props.isLoading}
                                                     colorsArray={this.props.colorsArray}
                                                     headerFilter={this.props.headerFilter}
                                                     contentOnChange={::this.contentOnChange}
                                                     downloadTableData={this.props.downloadTableData} />
        )
    };
};