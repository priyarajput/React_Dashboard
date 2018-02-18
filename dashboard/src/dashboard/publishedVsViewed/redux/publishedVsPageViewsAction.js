export function refresh(publishedVsPageViewsData) {

    return {
        type: 'PUBLISHED_VS_PAGEVIEWS_DATA_REFRESH',
        publishedVsPageViewsData
    }
}