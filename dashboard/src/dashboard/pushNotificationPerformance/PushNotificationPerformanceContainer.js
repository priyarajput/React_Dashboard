import * as React from "react";
import {connect} from "react-redux";
import {
    updateActiveDevices,
    updateOpenRate,
    updatePushInfluencedViews,
    updateReach
} from "./redux/pushNotificationPerformanceAction";

import PushNotificationPerformancePresentation from "./PushNotificationPerformancePresentation";

const mapStateToProps = (state) => {
    return {
        openRateArray: state.pushPerformance.openRateArray ? state.pushPerformance.openRateArray : [],
        totalOpen: state.pushPerformance.totalOpen ? state.pushPerformance.totalOpen : 0,
        totalReach: state.pushPerformance.totalReach ? state.pushPerformance.totalReach : 0,
        activeDevices: state.pushPerformance.activeDevices ? state.pushPerformance.activeDevices : 0,
        pushViews: state.pushPerformance.pushViews ? state.pushPerformance.pushViews : 0,
        ctrCount: state.pushPerformance.ctrCount ? state.pushPerformance.ctrCount : 0,
        isLoading: state.pushPerformance.isLoading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateOpenRate: (data) => {
            dispatch(updateOpenRate(data));
        },
        updateReach: (content) => {
            dispatch(updateReach(content));
        },
        updateActiveDevices: (data) => {
            dispatch(updateActiveDevices(data));
        },
        updatePushInfluencedViews: (sortMetric) => {
            dispatch(updatePushInfluencedViews(sortMetric));
        },
        getPushNotificationPerformance: (user, headerFilter, timeInterval) => {
            dispatch({
                type: "PUSH_PERFORMANCE_OPEN_RATE_DATA_UPDATE_WATCHER",
                user: user,
                headerFilter: headerFilter,
                timeInterval: timeInterval
            });
        }
    };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class PushNotificationPerformanceContainer extends React.Component {

    componentWillMount() {
        this.props.getPushNotificationPerformance(this.props.user, this.props.headerFilter, 0);
    }

    componentWillUpdate(nextProps) {
        if (!nextProps.isLoading)
            this.props.getPushNotificationPerformance(nextProps.user, nextProps.headerFilter, 300000);
    }

    render() {
        return (

            <PushNotificationPerformancePresentation
                    openRateArray={this.props.openRateArray}
                    totalOpen={this.props.totalOpen}
                    totalReach={this.props.totalReach}
                    activeDevices={this.props.activeDevices}
                    pushViews={this.props.pushViews}
                    isLoading={this.props.isLoading}
                    ctrCount={this.props.ctrCount===0?0:(this.props.totalOpen/this.props.ctrCount)*100}
                    JsonFile={this.props.JsonFile}
                />

        );
    }
}
