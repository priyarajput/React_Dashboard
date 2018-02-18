import * as React from 'react';
import GeographyAnalyticsPresentation from "./GeographyAnalyticsPresentation";
import jsonData from "./data.json";
import { connect } from "react-redux";
import { updateTabSelection} from "./redux/geographyAnalyticsActionCreator";

const mapStateToProps = (state) => {
    return {
        headerFilter: state.headerFilter,
        regionCode: state.geographyAnalyticsData.regionCode,
        selectedTab: state.geographyAnalyticsData.selectedTab,
        cmsDimensionDropDownSelection: state.geographyAnalyticsData.cmsDimensionDropDownSelection,
        isLoadingGeography: state.geographyAnalyticsData.isLoadingGeography,
        isLoadingPageViews: state.geographyAnalyticsData.isLoadingPageViews,
        colorsArray: state.colors,
        selectedCountry: state.geographyAnalyticsData.selectedCountry,
        selectedState: state.geographyAnalyticsData.selectedState,
        dimension: state.geographyAnalyticsData.dimension,
        pageViewsData: state.geographyAnalyticsData.pageViewsData ? state.geographyAnalyticsData.pageViewsData : [],
        topStoriesData: state.geographyAnalyticsData.topStoriesData ? state.geographyAnalyticsData.topStoriesData : [],
        countriesTableData: state.geographyAnalyticsData.countriesTableData ? state.geographyAnalyticsData.countriesTableData : [],
        googleMapData: state.geographyAnalyticsData.googleMapData ? state.geographyAnalyticsData.googleMapData : [],
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeTab(tabUpdate) {
            dispatch(updateTabSelection({ selectedTab: tabUpdate }))
        },
        getGeographyAnalyticsData(headerFilter, dimension, city, country, state, limit, cmsDim, pageDim, cmsDimensionDropDownSelection, regionCode) {
            dispatch({
                type: 'GEOGRAPHY_ANALYTICS_DIMENSION_DATA_UPDATE_WATCHER',
                headerFilter: headerFilter,
                dimension: dimension,
                city: city,
                country: country,
                state: state,
                limit: limit,
                cmsDim: "articleTitle",
                pageDim: pageDim,
                cmsDimensionDropDownSelection: cmsDimensionDropDownSelection,
                regionCode: regionCode
            })
        },
        getGeographyAnalyticsPageViewsData(headerFilter, country, state, limit, cmsDim, cmsDimensionDropDownSelection) {
            dispatch({
                type: 'GEOGRAPHY_ANALYTICS_CMS_DIMENSION_DATA_UPDATE_WATCHER',
                headerFilter: headerFilter,
                country: country,
                state: state,
                limit: limit,
                pageDim: cmsDim,
                cmsDimensionDropDownSelection: cmsDimensionDropDownSelection
            })
        }
    };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class GeographyAnalyticsContainer extends React.Component {

    componentWillMount() {
        this.props.getGeographyAnalyticsData(this.props.headerFilter, 'country', '', '', '', 500, 'articleTitle', 'articleCategory', this.props.cmsDimensionDropDownSelection, 'world');
    }

    tabSelectionChange = (event) => {
        this.props.changeTab(event);
    };

    componentWillUpdate(nextProps) {
        if (this.props.headerFilter !== nextProps.headerFilter) {
            this.props.getGeographyAnalyticsData(nextProps.headerFilter,  nextProps.dimension , '',nextProps.selectedCountry, nextProps.selectedState,  500, '', nextProps.cmsDimensionDropDownSelection.value, nextProps.cmsDimensionDropDownSelection, nextProps.regionCode); 
          }
    }

    handleMetricChange = (event, type, countryCode) => {
        let dimension = 'country', regionCode = countryCode, country = '', state = '';
        switch (type) {
            case 'country':
                if (!regionCode) {
                    regionCode = jsonData[event];
                }
                country = event;
                state = '';
                dimension = 'state';
                break;
            case 'state':
                country = this.props.selectedCountry;
                state = event;
                regionCode = this.props.regionCode;
                dimension = 'city';
                break;
            case "back":
                if (event == 'city') {
                    country = this.props.selectedCountry;
                    state = '';
                    regionCode = this.props.regionCode;
                    dimension = 'state';
                } else if (event == 'state') {
                    regionCode = '';
                    country = '';
                    state = '';
                    dimension = 'country';
                }
                break;
            case "top":
                regionCode = '';
                country = '';
                state = '';
                dimension = 'country';
            default:
                break;
        }
        this.props.getGeographyAnalyticsData(this.props.headerFilter, dimension, '', country, state, 500, '', this.props.cmsDimensionDropDownSelection.value, this.props.cmsDimensionDropDownSelection, regionCode);

    }

    handleCMSDropDownChange = (event) => {
        this.props.getGeographyAnalyticsPageViewsData(this.props.headerFilter, this.props.selectedCountry, this.props.selectedState, 500, event, { value: event, label: event.replace('article', '') });
    };

    filterCaseInsensitive = (filter, row) => {
        const id = filter.pivotId || filter.id;
        return (
            row[id] !== undefined ?
                String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
                :
                true
        );
    }

    render() {
        return (
            <GeographyAnalyticsPresentation
                handleMetricChange={::this.handleMetricChange }
                tabSelectionChange = {::this.tabSelectionChange }
                colorsArray = { this.props.colorsArray }
                isLoadingGeography = { this.props.isLoadingGeography }
                isLoadingPageViews = { this.props.isLoadingPageViews }
                cmsDimensionDropDownSelection = { this.props.cmsDimensionDropDownSelection }
                handleCMSDropDownChange = {::this.handleCMSDropDownChange }
                selectedTab = { this.props.selectedTab }
                countriesTableData = { this.props.countriesTableData }
                topStoriesData = { this.props.topStoriesData }
                pageViewsData = { this.props.pageViewsData }
                dimension = { this.props.dimension }
                googleMapData = { this.props.googleMapData }
                selectedCountry = { this.props.selectedCountry }
                selectedState = { this.props.selectedState }
                regionCode = { this.props.regionCode }
                filterCaseInsensitive = {::this.filterCaseInsensitive } />
            )
        };
}
