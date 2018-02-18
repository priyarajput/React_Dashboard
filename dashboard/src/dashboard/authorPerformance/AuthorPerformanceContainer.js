import * as React from "react";

import {refresh, refreshAuthorPageViews, updateIntervalId} from './redux/authorPerformanceAction';
import AuthorPerformancePresentationTable from "./AuthorPerformancePresentationTable";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        authorPerformanceData: state.authorPerformanceData ? state.authorPerformanceData : {authorArray:[],isLoading:true},
        authorPageViewsData: state.authorPageViewsData ? state.authorPageViewsData : {authorPageViewsDataArray:{}},
        colors: state.colors
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        refreshAPIData: (data) => {
            dispatch(refresh(data));
        },
        refreshAuthorPageviews: (data) => {
            dispatch(refreshAuthorPageViews(data))
        },
        getAuthorPerformanceData:(user,headerFilter,timeInterval,limit,dimension)=>{
            dispatch({type: "AUTHOR_PERFORMANCE_DATA_UPDATE_WATCHER", user: user,headerFilter:headerFilter,timeInterval:timeInterval,limit,dimension});
        }
    };
};


@connect(mapStateToProps, mapDispatchToProps)
export default class AuthorPerformanceContainer extends React.Component {


    componentWillMount() {
        this.props.getAuthorPerformanceData(this.props.user,this.props.headerFilter,0,100,'articleEditor');
    };

    componentWillUpdate(nextProps){
        if(!nextProps.authorPerformanceData.isLoading)
            this.props.getAuthorPerformanceData(nextProps.user,nextProps.headerFilter,300000,100,'articleEditor');
    }

    render() {
        if (!this.props.authorPerformanceData.authorArray) return null;
        let slice = this.props.authorPerformanceData.authorArray.slice(0, 5);
        return (
            <AuthorPerformancePresentationTable data={slice}
                                                authorPageViewsData={this.props.authorPageViewsData}
                                                colors={this.props.colors}
                                                isLoading={this.props.authorPerformanceData.isLoading}
                                                JsonFile={this.props.JsonFile}/>
        )
    };
};

