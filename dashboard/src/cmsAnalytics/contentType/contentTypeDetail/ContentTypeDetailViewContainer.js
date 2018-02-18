/**
 * Created by bluepi12 on 8/9/17.
 */

import * as React from "react";
import {connect} from "react-redux";
import ContentTypeDetailViewPresentation from "./ContentTypeDetailViewPresentation";

const mapStateToProps = (state) => {
    return {
        headerFilter: state.headerFilter,
        dualAreaGraphData:state.contentTypeDetailViewData.dualAreaGraphData?state.contentTypeDetailViewData.dualAreaGraphData:[],
        authorPieData:state.contentTypeDetailViewData.authorPieData?state.contentTypeDetailViewData.authorPieData:[],
        categoryPieData:state.contentTypeDetailViewData.categoryPieData?state.contentTypeDetailViewData.categoryPieData:[],
        contentTableData: state.contentTypeDetailViewData.contentTableData?state.contentTypeDetailViewData.contentTableData:[],
        isLoading: state.contentTypeDetailViewData.isLoading,
        colorsArray:state.colors,
        downloadTableData: state.contentTypeDetailViewData.downloadTableData?state.contentTypeDetailViewData.downloadTableData:[],
        

    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        getContentTypeDetailViewData: (headerFilter,filter,cmsDimFilter,cmsDim,limit) => {
            dispatch({
                type: "CONTENT_TYPE_DETAIL_VIEW_DATA_UPDATE_WATCHER", headerFilter: headerFilter,filter:filter,limit:limit,cmsDim:cmsDim,cmsDimFilter:cmsDimFilter
            });
        }
    };
};
@connect(mapStateToProps, mapDispatchToProps)
export default class ContentTypeDetailViewContainer extends React.Component {

    componentWillUpdate(nextProps) {
        if (nextProps.headerFilter !== this.props.headerFilter || nextProps.routeParams!==this.props.routeParams) {
            this.props.getContentTypeDetailViewData(nextProps.headerFilter,decodeURIComponent(nextProps.params.content),'articleType','format',900);
        }
    }

    componentWillMount() {
        this.props.getContentTypeDetailViewData(this.props.headerFilter,decodeURIComponent(this.props.params.content),'articleType','format',900);
    }

    contentOnChange=(data)=> {
        if (data) {
            this.props.router.push('/cmsAnalytics/content/'+data.value);
        }
    };

    render() {
        return (
            <ContentTypeDetailViewPresentation categoryName={this.props.params.content}
                                               dualAreaGraphData={this.props.dualAreaGraphData}
                                               authorPieData={this.props.authorPieData}
                                               categoryPieData={this.props.categoryPieData}
                                               contentTableData={this.props.contentTableData}
                                               isLoading={this.props.isLoading}
                                               colorsArray={this.props.colorsArray}
                                               headerFilter={this.props.headerFilter}
                                               contentOnChange={::this.contentOnChange}
                                               downloadTableData={this.props.downloadTableData} />
        )
    };
};