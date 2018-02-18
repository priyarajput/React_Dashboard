import * as React from "react";
import {connect} from "react-redux";
import AuthorAnalyticsDetailViewPresentation from "./AuthorAnalyticsDetailViewPresentation";

const mapStateToProps = (state) => {
    return {
        headerFilter: state.headerFilter,
        dualAreaGraphData:state.authorAnalyticsDetailViewData.dualAreaGraphData?state.authorAnalyticsDetailViewData.dualAreaGraphData:[],
        categoryPieData:state.authorAnalyticsDetailViewData.categoryPieData?state.authorAnalyticsDetailViewData.categoryPieData:[],
        typePieData:state.authorAnalyticsDetailViewData.typePieData?state.authorAnalyticsDetailViewData.typePieData:[],
        contentTableData: state.authorAnalyticsDetailViewData.contentTableData?state.authorAnalyticsDetailViewData.contentTableData:[],
        isLoading: state.authorAnalyticsDetailViewData.isLoading,
        colorsArray:state.colors,
        downloadTableData: state.authorAnalyticsDetailViewData.downloadTableData?state.authorAnalyticsDetailViewData.downloadTableData:[],
        
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        getAuthorAnalyticsDetailViewData: (headerFilter,filter,cmsDimFilter,cmsDim,limit) => {
            dispatch({
                type: "AUTHOR_ANALYTICS_DETAIL_VIEW_DATA_UPDATE_WATCHER", headerFilter: headerFilter,filter:filter,limit:limit,cmsDim:cmsDim,cmsDimFilter:cmsDimFilter
            });
        }
    };
};
@connect(mapStateToProps, mapDispatchToProps)
export default class AuthorAnalyticsDetailViewContainer extends React.Component {

    componentWillUpdate(nextProps) {
        if (nextProps.headerFilter !== this.props.headerFilter || nextProps.routeParams!==this.props.routeParams) {
            this.props.getAuthorAnalyticsDetailViewData(nextProps.headerFilter,decodeURIComponent(nextProps.params.author),'articleEditor','authorList',900);
        }
    }

    componentWillMount() {
        this.props.getAuthorAnalyticsDetailViewData(this.props.headerFilter,decodeURIComponent(this.props.params.author),'articleEditor','authorList',900);
    }

    contentOnChange=(data)=> {
        if (data) {
            this.props.router.push('/cmsAnalytics/authors/'+data.value.replace(/['"]+/g, ''));
        }
    };

    render() {
        return (
            <AuthorAnalyticsDetailViewPresentation authorName={this.props.params.author}
                                                   dualAreaGraphData={this.props.dualAreaGraphData}
                                                   categoryPieData={this.props.categoryPieData}
                                                   typePieData={this.props.typePieData}
                                                   contentTableData={this.props.contentTableData}
                                                   isLoading={this.props.isLoading}
                                                   colorsArray={this.props.colorsArray}
                                                   headerFilter={this.props.headerFilter}
                                                   contentOnChange={::this.contentOnChange} 
                                                   downloadTableData={this.props.downloadTableData}/>
        )
    };
};