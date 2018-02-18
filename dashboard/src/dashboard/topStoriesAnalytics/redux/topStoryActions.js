//update language in header
export function updateContentCache(content) {
    return {
        type: 'TOP_STORY_CONTENT_CACHE_UPDATE',
        content
    }
}

export function updateTopStory(topStory) {
    return {
        type: 'TOP_STORY_TABLE_DATA_UPDATE',
        topStory
    }
}

export function updateGraphDimensionalData(data) {
    return {
        type: 'TOP_STORY_TABLE_GRAPH_DIMENSIONAL_DATA_UPDATE',
        data
    }
}

export function updateComponentSortStatus(sortMetric) {
    return {
        type: 'TOP_STORY_TABLE_SORT_VALUE_UPDATE',
        sortMetric
    }
}

export function updateChildExpandStatus(expandedChild) {
    return {
        type: 'TOP_STORY_DETAILED_VIEW_EXPAND_STATE',
        expandedChild
    }
}

export function updateGraphAggregateDimension(graphAggregatedOn) {
    return {
        type: 'TOP_STORY_DETAILED_VIEW_GRAPH_AGGREGATE',
        graphAggregatedOn
    }
}