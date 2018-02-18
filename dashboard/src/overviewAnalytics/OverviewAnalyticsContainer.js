import * as React from "react";
import moment from 'moment';

import { connect } from "react-redux";
import OverviewAnalyticsPresentation from "./OverviewAnalyticsPresentation";

const mapStateToProps = (state) => {
    return {
        headerFilter: state.headerFilter,
        language: state.headerFilter.language,
        user : state.user,
        isLoadingUninstallView: state.overviewAnalyticsData.isLoadingUninstallView,
        isLoadingPageView: state.overviewAnalyticsData.isLoadingPageView,
        isLoadingUsersView: state.overviewAnalyticsData.isLoadingUsersView,
        isLoadingSessionView: state.overviewAnalyticsData.isLoadingSessionView,
        isLoadingAcquisitionView: state.overviewAnalyticsData.isLoadingAcquisitionView,
        isLoadingOptOutView: state.overviewAnalyticsData.isLoadingOptOutView,
        pageViews: state.overviewAnalyticsData.pageViews,
        usersViews: state.overviewAnalyticsData.usersViews,
        sessionViews: state.overviewAnalyticsData.sessionViews,
        acquisitionViews: state.overviewAnalyticsData.acquisitionViews,
        optOutViews: state.overviewAnalyticsData.optOutViews,
        uninstallViews: state.overviewAnalyticsData.uninstallViews,
        pageSessionViews: state.overviewAnalyticsData.pageSessionViews,
        usersViewsGraphData: state.overviewAnalyticsData.usersViewsGraphData,
        usersViewsGraphKeys: state.overviewAnalyticsData.usersViewsGraphKeys,
        optOutGraphData: state.overviewAnalyticsData.optOutGraphData,
        optOutGraphKeys: state.overviewAnalyticsData.optOutGraphKeys,
        acquisitionGraphData: state.overviewAnalyticsData.acquisitionGraphData,
        acquisitionGraphKeys: state.overviewAnalyticsData.acquisitionGraphKeys,
        sessionViewsGraphData: state.overviewAnalyticsData.sessionViewsGraphData,
        sessionViewsGraphKeys: state.overviewAnalyticsData.sessionViewsGraphKeys,
        pageViewsGraphData: state.overviewAnalyticsData.pageViewsGraphData,
        pageViewsGraphKeys: state.overviewAnalyticsData.pageViewsGraphKeys,
        pageSessionViewsGraphData: state.overviewAnalyticsData.pageSessionViewsGraphData,
        pageSessionViewsGraphKeys: state.overviewAnalyticsData.pageSessionViewsGraphKeys,
        uninstallViewsGraphData: state.overviewAnalyticsData.uninstallViewsGraphData,
        uninstallViewsGraphKeys: state.overviewAnalyticsData.uninstallViewsGraphKeys
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getOverviewAnalyticsPageViewsData: (headerFilter) => {
            dispatch({
                type: "OVERVIEW_ANALYTICS_PAGE_VIEWS_DATA_UPDATE_WATCHER",
                headerFilter: headerFilter
            });
        },

        getOverviewAnalyticsUsersViewsData: (headerFilter) => {
            dispatch({
                type: "OVERVIEW_ANALYTICS_USERS_VIEWS_DATA_UPDATE_WATCHER",
                headerFilter: headerFilter
            });
        },

        getOverviewAnalyticsOptOutViewsData: (headerFilter) => {
            dispatch({
                type: "OVERVIEW_ANALYTICS_DEVICE_OPTOUT_DATA_UPDATE_WATCHER",
                headerFilter: headerFilter
            });
        },

        getOverviewAnalyticsAcquisitionViewsData: (headerFilter) => {
            dispatch({
                type: "OVERVIEW_ANALYTICS_ACQUISITIONS_VIEWS_DATA_UPDATE_WATCHER",
                headerFilter: headerFilter
            });
        },

        getOverviewAnalyticsSessionViewsData: (headerFilter) => {
            dispatch({
                type: "OVERVIEW_ANALYTICS_SESSIONS_VIEWS_DATA_UPDATE_WATCHER",
                headerFilter: headerFilter
            });
        },

        getOverviewAnalyticsUninstallsData: (headerFilter) => {
            dispatch({
                type: "OVERVIEW_ANALYTICS_UNINSTALL_VIEWS_DATA_UPDATE_WATCHER",
                headerFilter: headerFilter
            });
        }

    }
};

@connect(mapStateToProps, mapDispatchToProps)



export default class OverviewAnalyticsContainer extends React.Component {

    componentWillMount() {
        this.props.getOverviewAnalyticsPageViewsData(this.props.headerFilter);
        this.props.getOverviewAnalyticsUsersViewsData(this.props.headerFilter);
        this.props.getOverviewAnalyticsOptOutViewsData(this.props.headerFilter);
        this.props.getOverviewAnalyticsAcquisitionViewsData(this.props.headerFilter);
        this.props.getOverviewAnalyticsSessionViewsData(this.props.headerFilter);
        this.props.getOverviewAnalyticsUninstallsData(this.props.headerFilter);
    }

    componentWillUpdate(nextProps) {
        if (this.props.headerFilter !== nextProps.headerFilter) {
            this.props.getOverviewAnalyticsPageViewsData(nextProps.headerFilter);
            this.props.getOverviewAnalyticsUsersViewsData(nextProps.headerFilter);
            this.props.getOverviewAnalyticsOptOutViewsData(nextProps.headerFilter);
            this.props.getOverviewAnalyticsAcquisitionViewsData(nextProps.headerFilter);
            this.props.getOverviewAnalyticsSessionViewsData(nextProps.headerFilter);
            this.props.getOverviewAnalyticsUninstallsData(nextProps.headerFilter);
        }
    }


    render() {
        return (
            <OverviewAnalyticsPresentation
            headerFilter = { this.props.headerFilter }
            language = { this.props.language }
            user = { this.props.user }
            isLoadingUninstallView = { this.props.isLoadingUninstallView }
            isLoadingPageView = { this.props.isLoadingPageView }
            isLoadingUsersView = { this.props.isLoadingUsersView }
            isLoadingSessionView = { this.props.isLoadingSessionView }
            isLoadingAcquisitionView = { this.props.isLoadingAcquisitionView }
            isLoadingOptOutView = { this.props.isLoadingOptOutView }

            pageViews = { this.props.pageViews }
            usersViews = { this.props.usersViews }
            sessionViews = { this.props.sessionViews }
            acquisitionViews = { this.props.acquisitionViews }
            optOutViews = { this.props.optOutViews }
            uninstallViews = { this.props.uninstallViews }
            pageSessionViews = { this.props.pageSessionViews }
            usersViewsGraphData = { this.props.usersViewsGraphData }
            usersViewsGraphKeys = { this.props.usersViewsGraphKeys }
            optOutGraphData = { this.props.optOutGraphData }
            optOutGraphKeys = { this.props.optOutGraphKeys }
            sessionViewsGraphData = { this.props.sessionViewsGraphData }
            sessionViewsGraphKeys = { this.props.sessionViewsGraphKeys }
            acquisitionGraphData = { this.props.acquisitionGraphData }
            acquisitionGraphKeys = { this.props.acquisitionGraphKeys }
            pageViewsGraphData = { this.props.pageViewsGraphData }
            pageViewsGraphKeys = { this.props.pageViewsGraphKeys }
            uninstallViewsGraphData = { this.props.uninstallViewsGraphData }
            uninstallViewsGraphKeys = { this.props.uninstallViewsGraphKeys }
            pageSessionViewsGraphData = { this.props.pageSessionViewsGraphData }
            pageSessionViewsGraphKeys = { this.props.pageSessionViewsGraphKeys } />
        )
};
}