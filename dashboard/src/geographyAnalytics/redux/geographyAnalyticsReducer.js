
const initialState = {
    selectedTab: "pageViews",
    cmsDimensionDropDownSelection: { value: "articleCategory", label: "Category" },
    isLoadingGeography: true,
    dimension: 'country',
    selectedCountry: '',
    selectedState: '',
    pageViewsData: [],
    topStoriesData: [],
    countriesTableData: [],
    googleMapData: [],
    regionCode: 'world',
    transformedData: []
};


function geographyAnalyticsData(state = initialState, action) {

    switch (action.type) {
        case "GEOGRAPHY_ANALYTICS_DIMENSION_DATA_UPDATE":
            let transformedData = transformToTableData(action.geographyData.countryDimensionData ? action.geographyData.countryDimensionData : [], (state.selectedTab), action.geographyData.dimension);
            let transformedTopStoriesData = transformTopStoriesData(action.geographyData.topStoriesData ? action.geographyData.topStoriesData : [], (state.selectedTab));
            let transformedPageViewsData = transformTopStoriesData(action.geographyData.pageViewsData ? action.geographyData.pageViewsData : [], (state.selectedTab));
            return Object.assign({}, state, {
                transformedData: action.geographyData.countryDimensionData,
                isLoadingGeography: false,
                countriesTableData: transformedData.tableResult,
                dimension: action.geographyData.dimension,
                transformedTopStoriesData: action.geographyData.topStoriesData,
                topStoriesData: transformedTopStoriesData.result,
                transformedPagesViewsData: action.geographyData.pageViewsData,
                pageViewsData: transformedPageViewsData.result,
                isLoadingPageViews: false,
                googleMapData: transformedData.mapData.slice(0,100),
                selectedCountry: action.geographyData.country,
                selectedState: action.geographyData.state,
                regionCode: action.geographyData.regionCode,
            });
            break;
        case "GEOGRAPHY_ANALYTICS_DIMENSION_DATA_FETCH":
            return Object.assign({}, state, {
                isLoadingGeography: true,
                isLoadingPageViews: true,
                googleMapData: (state.dimension == "city") ? [] : state.googleMapData
            });
            break;
        case "GEOGRAPHY_ANALYTICS_DIMENSION_DATA_FETCH_FAILED":
            return Object.assign({}, state, {
                isLoadingGeography: false,
                isLoadingPageViews: false
            });
            break;
        case 'GEOGRAPHY_ANALYTICS_METRICS_TAB_SELECTION_UPDATE':
            let data = transformToTableData(state.transformedData ? state.transformedData : [], action.selectedTab.selectedTab, state.dimension);
            let topStories = transformTopStoriesData(state.transformedTopStoriesData ? state.transformedTopStoriesData : [], action.selectedTab.selectedTab);
            let pageViews = transformTopStoriesData(state.transformedPagesViewsData ? state.transformedPagesViewsData : [], action.selectedTab.selectedTab);

            return Object.assign({}, state, {
                selectedTab: action.selectedTab.selectedTab,
                countriesTableData: data.tableResult,
                dimension: state.dimension,
                topStoriesData: topStories.result,
                pageViewsData: pageViews.result,
                googleMapData: data.mapData,
            });
            break;

        case "GEOGRAPHY_ANALYTICS_CMS_DIMENSION_DATA_UPDATE":
            let transformedPagesViewsData = transformTopStoriesData(action.cmsGeographyOriginalData ? action.cmsGeographyOriginalData : [], (state.selectedTab));
            return Object.assign({}, state, {
                transformedPagesViewsData: action.cmsGeographyOriginalData,
                pageViewsData: transformedPagesViewsData.result,
                cmsDimensionDropDownSelection: { value: action.cmsDimensionDropDownSelection.value, label: action.cmsDimensionDropDownSelection.label },

                isLoadingPageViews: false
            });
            break;
        case "GEOGRAPHY_ANALYTICS_CMS_DIMENSION_DATA_FETCH":
            return Object.assign({}, state, {
                isLoadingPageViews: true
            });
            break;
        case "GEOGRAPHY_ANALYTICS_CMS_DIMENSION_DATA_FETCH_FAILED":
            return Object.assign({}, state, {
                isLoadingPageViews: false
            });
            break;
        default:
            return state
    }
}

export function transformToTableData(data, dimensionToSort, type) {
    let tableResult = [], mapData = [];
    data.map(dimension => {
        let tableRow = {}, mapDimension = {}, mapCount = {}, mapLatitude = {}, mapLongitude = {};
        switch (dimensionToSort) {
            case "pageViews":
                tableRow["count"] = Math.round(dimension.metrics.pageViews);
                mapCount = Math.round(dimension.metrics.pageViews);
                break;
            case "users":
                tableRow["count"] = Math.round(dimension.metrics.users);
                mapCount = Math.round(dimension.metrics.users);
                break;
            case "sessions":
                tableRow["count"] = Math.round(dimension.metrics.session);
                mapCount = Math.round(dimension.metrics.session);
                break;
        }
        tableRow.dimension = dimension.metrics.dimension;
        mapDimension = dimension.metrics.dimension;
        tableRow["countryCode"] = dimension.latLong ? dimension.latLong.country : '';

        mapLatitude = dimension.latLong ? dimension.latLong.latitude : null;
        mapLongitude = dimension.latLong ? dimension.latLong.longitude : null;
        tableResult.push(tableRow);
        if (type == 'city') {
            mapData.push([mapLatitude, mapLongitude, mapDimension, mapCount]);
        } else {
            mapData.push([mapDimension, mapCount]);
        }
    });
    if (type == 'city') {
        mapData = [['Lat', 'Lng', type, dimensionToSort]].concat(mapData);
    } else {
        mapData = [[type, dimensionToSort]].concat(mapData);
    }
    var sortData = mapData.sort(function(a, b){
        return b[1] - a[1];
    });
    mapData = sortData;
    return { tableResult, mapData };
}

export function transformTopStoriesData(data, dimensionToSort) {
    let result = [];
    data.map(dimension => {
        let tableRow = {};
        switch (dimensionToSort) {
            case "pageViews":
                tableRow["count"] = Math.round(dimension.event.pageViews);
                break;
            case "users":
                tableRow["count"] = Math.round(dimension.event.users);
                break;
            case "sessions":
                tableRow["count"] = Math.round(dimension.event.session);
                break;
        }
        tableRow.dimension = dimension.event.dimension;

        result.push(tableRow);
    });
    return { result };
}
module.exports = {
    geographyAnalyticsData
};

