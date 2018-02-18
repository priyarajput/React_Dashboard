import * as React from "react";
import {connect} from "react-redux";
import {
    updateChildExpandStatus,
    updateComponentSortStatus,
    updateContentCache,
    updateTopStory
} from "./redux/topStoryActions";
import TopStoryCompactViewTableJquery from "./topStoryCompactView/TopStoryCompactViewTableJquery";

const mapStateToProps = (state) => {
    return {
        contentMetadata: state.contentMasterUpdate.content,
        pushNotificationMetaData: state.pushNotificationMasterUpdate.pushNotification,
        topStoryTableData: state.topStory.tableData,
        sortMetric: state.topStory.sortMetric,
        expandedChild: state.topStory.expandedChild,
        isLoadingTable: state.topStory.isLoadingTable,
        colors: state.colors
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateTopStory: (data, sortBy) => {
            dispatch(updateTopStory(data, sortBy));
        },
        updateContentCache: (content) => {
            dispatch(updateContentCache(content));
        },
        updateComponentSortStatus: (sortMetric) => {
            dispatch(updateComponentSortStatus(sortMetric));
        },
        updateChildExpandStatus: (expandedChild) => {
            dispatch(updateChildExpandStatus(expandedChild));
        },
        getTopContentAnalyticsByPageviews: (user, headerFilter, limit, contentMetadata, pushNotificationMetaData, timeInterval) => {
            dispatch({
                type: "TOP_CONTENT_ANALYTICS_PAGEVIEWS_DATA_UPDATE_WATCHER",
                timeInterval: timeInterval,
                user: user,
                headerFilter: headerFilter,
                limit: limit,
                contentMetadata: contentMetadata,
                pushNotificationMetaData: pushNotificationMetaData
            });
        },
        getTopContentAnalyticsByPublicationDate: (user, headerFilter, limit, contentMetadata, pushNotificationMetaData, timeInterval) => {
            dispatch({
                type: "TOP_CONTENT_ANALYTICS_PUBLICATIONDATE_DATA_UPDATE_WATCHER",
                timeInterval: timeInterval,
                user: user,
                headerFilter: headerFilter,
                limit: limit,
                contentMetadata: contentMetadata,
                pushNotificationMetaData: pushNotificationMetaData
            });
        },
        getTopContentAnalyticsByPushSendDate: (user, headerFilter, limit, contentMetadata, pushNotificationMetaData, timeInterval) => {
            dispatch({
                type: "TOP_CONTENT_ANALYTICS_PUSHSENDDATE_DATA_UPDATE_WATCHER",
                timeInterval: timeInterval,
                user: user,
                headerFilter: headerFilter,
                limit: limit,
                contentMetadata: contentMetadata,
                pushNotificationMetaData: pushNotificationMetaData
            });
        }
    };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class TopStoryCompactViewContainer extends React.Component {

    handleDetailViewOpen = (childIndex) => {
        let clickStateCopy = this.props.expandedChild;
        if (!('index' in clickStateCopy) || (clickStateCopy.index && clickStateCopy.index !== childIndex)) {
            clickStateCopy = {index: childIndex};
        }
        else
            clickStateCopy = {};
        this.props.updateChildExpandStatus(clickStateCopy);
    };

    sortByValueSelection = (sortBy, timeInterval) => {
        switch (sortBy) {
            case 'pageViews':
                this.props.getTopContentAnalyticsByPageviews(this.props.user, this.props.headerFilter, 10, this.props.contentMetadata, this.props.pushNotificationMetaData, timeInterval);
                break;

            case 'pushNotification':
                this.props.getTopContentAnalyticsByPushSendDate(this.props.user, this.props.headerFilter, 10, this.props.contentMetadata, this.props.pushNotificationMetaData, timeInterval);
                break;

            case 'publicationDate':
                this.props.getTopContentAnalyticsByPublicationDate(this.props.user, this.props.headerFilter, 10, this.props.contentMetadata, this.props.pushNotificationMetaData, timeInterval);
                break;
            default:
                this.props.getTopContentAnalyticsByPageviews(this.props.user, this.props.headerFilter, 10, this.props.contentMetadata, this.props.pushNotificationMetaData, timeInterval);
        }
        if (sortBy !== this.props.sortMetric.sortByValue)
            this.props.updateComponentSortStatus({
                sortByValue: sortBy,
                sortByLabel: sortBy.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
                    return str.toUpperCase();
                })
            })
    };

    componentWillMount() {
        this.sortByValueSelection(this.props.sortMetric.sortByValue, 0)
    }

    componentWillUpdate(nextProps) {
        if (!nextProps.isLoadingTable && nextProps.sortMetric.sortByValue === this.props.sortMetric.sortByValue && !nextProps.expandedChild.index)
            this.sortByValueSelection(nextProps.sortMetric.sortByValue, 300000);
    }

    render() {
        return (


            <TopStoryCompactViewTableJquery
                sortByLabel={this.props.sortMetric.sortByLabel}
                data={this.props.topStoryTableData}
                expandedChild={this.props.expandedChild}
                handleDetailViewOpen={::this.handleDetailViewOpen}
                sortByValueSelection={::this.sortByValueSelection}
                dimensionalData={this.props.dimensionalData}
                colors={this.props.colors}
                contentMetadata={this.props.contentMetadata}
                pushNotificationMetaData={this.props.pushNotificationMetaData}
                isLoadingTable={this.props.isLoadingTable}
                headerFilter={this.props.headerFilter}
                user={this.props.user}
                JsonFile={this.props.JsonFile}
            />

        );
    }
}