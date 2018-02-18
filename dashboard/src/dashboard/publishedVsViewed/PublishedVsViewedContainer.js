import * as React from "react";
import PublishedVsViewedPresentation from "./PublishedVsViewedPresentation";
import {connect} from "react-redux";
import {refresh} from "./redux/publishedVsPageViewsAction";


const mapStateToProps = (state) => {
    return {
        publishedVsPageViewsData: state.publishedVsPageViews.publishedVsPageViewsData?state.publishedVsPageViews.publishedVsPageViewsData:{},
        isLoading:state.publishedVsPageViews.isLoading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        refreshPublishedVsPageViewsData: (data) => {
            dispatch(refresh(data));
        },
        getPublishedVsPageviewsData:(headerFilter,timeInterval,type)=>{
            dispatch({type: "PUBLISHED_PAGEVIEWS_DATA_UPDATE_WATCHER",
            headerFilter:headerFilter,timeInterval:timeInterval,
            actionType:type});
        }
    };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class PublishedVsViewedContainer extends React.Component {

    componentWillMount() {
        this.props.getPublishedVsPageviewsData(this.props.headerFilter,0,'fetch');
    }

    componentWillUpdate(nextProps){
        if(!nextProps.isLoading)
            this.props.getPublishedVsPageviewsData(nextProps.headerFilter,300000,'update');
    }

    render() {
        return (
            <PublishedVsViewedPresentation data={this.props.publishedVsPageViewsData}
                                           isLoading={this.props.isLoading}
                                           JsonFile={this.props.JsonFile}/>
        );
    }
}