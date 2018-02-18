//refresh AuthorAPI data
export function refresh(authorPerformanceData) {
    return {
        type: 'AUTHOR_PERFORMANCE_DATA_REFRESH',
        authorPerformanceData
    }
}

export function refreshAuthorPageViews(authorPageViewsData) {
    return {
        type: 'AUTHOR_PAGEVIEWS_DATA_REFRESH',
        authorPageViewsData
    }
}