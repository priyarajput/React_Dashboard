import { call, takeLatest, put, all } from "redux-saga/effects";

import { fetchGeographyAnalyticsCountriesData, fetchGeographyAnalyticsTopContentData, fetchGeographyAnalyticsPagesViewsData } from "./../services/api";

function* getGeographyAnalyticsDimensionPerformance(action) {
    try {
        yield put({ type: "GEOGRAPHY_ANALYTICS_DIMENSION_DATA_FETCH" });
        const [geographyAnalyticsMetricsData, topStoriesMetricsData,pageViewsDimensionData] = yield all([call(fetchGeographyAnalyticsCountriesData, action), call(fetchGeographyAnalyticsTopContentData, action),call(fetchGeographyAnalyticsPagesViewsData, action)]);
        let geographyData = { geographyData: [] };
        if (!geographyAnalyticsMetricsData.error) {
            geographyData.countryDimensionData = geographyAnalyticsMetricsData.response;            
            geographyData.dimension = action.dimension;            
            geographyData.country = action.country;         
            geographyData.state = action.state;         
            geographyData.regionCode = action.regionCode;
        }
        if (!topStoriesMetricsData.error) {
            geographyData.topStoriesData = topStoriesMetricsData.response;
        }
        if (!pageViewsDimensionData.error) {
            geographyData.pageViewsData = pageViewsDimensionData.response;
            geographyData.cmsDimensionDropDownSelection = action.cmsDimensionDropDownSelection;
        }
        if (geographyAnalyticsMetricsData.error && topStoriesMetricsData.error &&  pageViewsDimensionData.error)
            yield put({ type: "GEOGRAPHY_ANALYTICS_DIMENSION_DATA_FETCH_FAILED" });
        else
            yield put({
                type: "GEOGRAPHY_ANALYTICS_DIMENSION_DATA_UPDATE",
                geographyData: geographyData
            });

    } catch (error) {
        yield put({ type: "GEOGRAPHY_ANALYTICS_DIMENSION_DATA_FETCH_FAILED" });
    }
}

export function* geographyAnalyticsDataWatch() {
    yield takeLatest("GEOGRAPHY_ANALYTICS_DIMENSION_DATA_UPDATE_WATCHER", getGeographyAnalyticsDimensionPerformance);
}

function* getGeographyAnalyticsCMSDimensionPerformance(action) {
    try {
        yield put({ type: "GEOGRAPHY_ANALYTICS_CMS_DIMENSION_DATA_FETCH" });
        const geographyPageViewsDimensionPerformance = yield call(fetchGeographyAnalyticsPagesViewsData, action);
        if (!geographyPageViewsDimensionPerformance.error) {
            yield put({
                type: "GEOGRAPHY_ANALYTICS_CMS_DIMENSION_DATA_UPDATE",
                cmsGeographyOriginalData: geographyPageViewsDimensionPerformance.response,cmsDimensionDropDownSelection:action.cmsDimensionDropDownSelection
            });
        }
        else
            yield put({ type: "GEOGRAPHY_ANALYTICS_CMS_DIMENSION_DATA_FETCH_FAILED" });
    } catch (error) {
        yield put({ type: "GEOGRAPHY_ANALYTICS_CMS_DIMENSION_DATA_FETCH_FAILED" });
    }
}

export function* geographyAnalyticsPageViewsDataWatch() {
    yield takeLatest("GEOGRAPHY_ANALYTICS_CMS_DIMENSION_DATA_UPDATE_WATCHER", getGeographyAnalyticsCMSDimensionPerformance);
}

