import * as React from "react";
import AuthorPerformanceContainer from "./authorPerformance/AuthorPerformanceContainer";
import {connect} from "react-redux";
import {Col} from "@sketchpixy/rubix/lib/index";
import PushNotificationPerformanceContainer from "./pushNotificationPerformance/PushNotificationPerformanceContainer";
import PublishedVsViewedContainer from "./publishedVsViewed/PublishedVsViewedContainer";
import CMSTopDimensionContainer from "./cmsTopDimensionViews/CMSTopDimensionContainer";
import PushPerformanceDimensionContainer from "./pushNotificationPerformanceUserDimension/PushPerformanceDimensionContainer";
import TopStoryCompactViewContainer from "./topStoriesAnalytics/TopStoryAnalyticsContainer";
import * as objectHash from "object-hash";
import DimensionPageViewTrendContainer from "./dimensionPageViewTrend/DimensionPageViewTrendContainer";

const mapStateToProps = (state) => {


    return {
        headerFilter: state.headerFilter,
        user: state.user
    }
};

@connect(mapStateToProps)
export default class DashboardComponent extends React.Component {

    getHash=(objectToHash)=>{
        return objectHash.sha1(objectToHash);
    };

    render() {
        let headerFilter=this.props.headerFilter;
        headerFilter["propertyId"]=this.props.user.propertyId;
        let key = this.getHash(headerFilter);
        return (
                    <div>
                        <Col md={7} className ="dashboard_leftView">
                            <div className="mb-1 topContentTable">
                                <TopStoryCompactViewContainer headerFilter={this.props.headerFilter} key={key} user={this.props.user} JsonFile={this.props.headerFilter.iText.dashborad}/>
                            </div>
                           <div className="mb-1 topDimensionTable">
                                <DimensionPageViewTrendContainer headerFilter={this.props.headerFilter} key={key} user={this.props.user} JsonFile={this.props.headerFilter.iText}/>
                            </div>
                        </Col>
                        <Col md={5}>
                            <div className="mb-1 storyPublishedAndPageView">
                                <PublishedVsViewedContainer headerFilter={this.props.headerFilter} key={key} user={this.props.user} JsonFile={this.props.headerFilter.iText}/>
                            </div>
                            <div className="mb-1 PushNotificationPerformanceContainer">
                                <PushNotificationPerformanceContainer headerFilter={this.props.headerFilter} key={key} user={this.props.user} JsonFile={this.props.headerFilter.iText}/>
                            </div>
                            <div className="mb-1 PushPerformanceDimensionContainer">
                                <PushPerformanceDimensionContainer headerFilter={this.props.headerFilter} key={key} user={this.props.user} JsonFile={this.props.headerFilter.iText}/>
                            </div>
                            <div className="mb-1 AuthorPerformanceContainer">
                                <AuthorPerformanceContainer headerFilter={this.props.headerFilter} key={key} user={this.props.user} JsonFile={this.props.headerFilter.iText}/>
                            </div>
                            <div className="mb-1 CMSTopDimensionContainer">
                                <CMSTopDimensionContainer headerFilter={this.props.headerFilter} key={key} user={this.props.user} JsonFile={this.props.headerFilter.iText}/>
                            </div>
                        {/*<div className="mb-1">
                         <PushNotificationPerformanceCMSContainer/>
                         </div>*/}
                        </Col>
                    </div>


        );
    }

}