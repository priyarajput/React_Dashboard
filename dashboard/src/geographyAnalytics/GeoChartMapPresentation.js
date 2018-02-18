

import React from 'react';
import ReactDOM from 'react-dom';

import { Panel } from "@sketchpixy/rubix/lib/index";
export default class GeoChartMapPresentation extends React.Component {
    componentDidMount() {
        if (this.props.googleMapData && this.props.googleMapData.length > 0) {
            var regionCode = this.props.regionCode;
            google.charts.load('current', {
                'packages': ['geochart'],
                // Note: you will need to get a mapsApiKey for your project.
                // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                'mapsApiKey': 'AIzaSyALvkNn4o7tllVhC7w8rEoPS3qoJx5_kYc'
            });
            google.charts.setOnLoadCallback(drawRegionsMap);
            let that = this;
            function drawRegionsMap() {
                var data = google.visualization.arrayToDataTable(that.props.googleMapData);
                var mode = that.props.selectedState;
                var resolutionValue = '';

                if (that.props.selectedCountry != '' || that.props.selectedState != '') {
                    regionCode = regionCode;
                } else if (that.props.dimension == 'country' || that.props.dimension == 'state') {
                    regionCode = 'world';
                    resolutionValue = 'countries';
                } else if (that.props.dimension == 'city') {
                    resolutionValue = 'countries';
                    mode = that.props.dimension;
                }

                if (that.props.dimension == 'state' && !that.props.selectedCountry) {
                    mode = that.props.dimension;
                }
                var options = {

                    region: regionCode ? regionCode : 'world',
                    displayMode: mode ? 'markers' : 'regions',
                    resolution: resolutionValue ? resolutionValue : 'provinces',
                    backgroundColor: '#283232',
                    datalessRegionColor: '#3b4a4a',
                    enable: true, zoomFactor: 5.0,
                    colorAxis: {
                        colors: [
                            "#1f9a81", "#56dcc1", "#45d9bb", "#34d5b5", "#2acbab", "#26ba9d",
                            "#23a98e", "#1f9880", "#1c8772", "#187764"
                        ]
                    }
                };
                var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
                chart.draw(data, options);
            }
        }
        else {
            console.log("error.....")
        }



    }
    render() {


        return (
            <div>
                <div className="tablehead" style={{ background: '#000000' }}>
                    <h5 style={{ fontSize: '12px', marginTop: '18px' }}>Map</h5>
                </div>
                <div id="regions_div" style={{ width: "100%", height: 472 }}></div>
            </div>
        );
    }
}