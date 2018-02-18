import * as React from "react";
import {connect} from "react-redux";
import TopStoryDetailedViewPresentation from "./TopStoryDetailedViewPresentation";

const mapStateToProps = (state) => {
    return {
        pushInfluencedViews:state.topStory.pushInfluencedViews,
        isLoadingViews: state.topStory.isLoadingViews
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getSelectedContentPIV:(headerFilter,articleId,language,campaignId)=>{
            dispatch({type: "SELECTED_CONTENT_PIV_UPDATE_WATCHER",headerFilter:headerFilter,articleId:articleId,language:language,campaignId:campaignId});
        }
    };
};

@connect(mapStateToProps,mapDispatchToProps)
export default class TopStoryDetailedViewContainer extends React.Component{

    componentWillMount(){
        if(this.props.pushNotification)
            this.props.getSelectedContentPIV(this.props.headerFilter,this.props.pushNotification.pushNotification.contentId,this.props.pushNotification.pushNotification.language,this.props.pushNotification.pushNotification.id);
    }

    render(){
        return(
            <TopStoryDetailedViewPresentation content={this.props.content}
                                              pushNotification={this.props.pushNotification}
                                              isLoadingViews={this.props.isLoadingViews}
                                              pushInfluencedViews={this.props.pushInfluencedViews}/>
        );
    }
}