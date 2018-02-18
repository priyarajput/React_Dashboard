import * as React from "react";
import { Col, DropdownButton, Grid, MenuItem, Row, Tab, Tabs, Button, ButtonGroup, Icon } from "@sketchpixy/rubix/lib/index";
import Overlay from "../common/Overlay.jsx";
import CountriesTablePresentation from "./CountriesTablePresentation";
import GeoChartMapPresentation from "./GeoChartMapPresentation";
import TopStoriesTablePresentation from "./TopStoriesTablePresentation";
import PageViewsTablePresentation from "./PageViewsTablePresentation";

export default class GeographyAnalyticsPresentation extends React.Component {

    render() {
        return (

            <div className="tablehead" id="geographyAnalyticsView">

                    <h3><img src='/imgs/common/piStats/Geography Analytics@2x.png' alt='' style={{ marginLeft: "10px", marginRight: "10px" }} />
                        Geography Analytics
                    </h3>
                    <Tabs style={{ marginLeft: "15px" }} activeKey={this.props.selectedTab}
                        id="geographyAnalyticsTab"
                        onSelect={this.props.tabSelectionChange}>
                        <Tab title="Page views" eventKey="pageViews" disabled={this.props.isLoadingGeography} />
                        <Tab title="Users" eventKey="users" disabled={this.props.isLoadingGeography} />
                        <Tab title="Sessions" eventKey="sessions" disabled={this.props.isLoadingGeography} />
                    </Tabs>
                <Overlay isLoading={this.props.isLoadingGeography}>
                    <Grid style={{ marginTop: "15px", marginBottom: "15px" }}>
                    <Col sm={12}>
                        {this.props.selectedCountry} {this.props.selectedState ? ' > ' : ''} {this.props.selectedState}
                    </Col>
                        <Col sm={3}>
                            <Row>
                                <Button style={{ float: "right" }} bsStyle="primary" sm disabled={this.props.isLoadingGeography || (this.props.dimension == 'country')}
                                    onClick={this.props.handleMetricChange.bind(this, this.props.dimension, "back", '')}>Back</Button>
                                <Button style={{ float: "right", marginRight: '5px' }} bsStyle="primary" sm disabled={this.props.isLoadingGeography || (this.props.dimension == 'country')}
                                    onClick={this.props.handleMetricChange.bind(this, this.props.dimension, "top", '')}>Top</Button>

                            </Row>
                            <Row style={{ paddingTop: "15px" }}>
                                <CountriesTablePresentation
                                    filterCaseInsensitive={this.props.filterCaseInsensitive}
                                    colorsArray={this.props.colorsArray}
                                    dimension={this.props.dimension} isLoadingGeography={this.props.isLoadingGeography}
                                    tableData={this.props.countriesTableData} handleMetricChange={this.props.handleMetricChange} />
                            </Row>

                        </Col>
                        <Col sm={9} style={{ paddingTop: "37px", paddingRight: 0 }}>
                            <GeoChartMapPresentation selectedCountry={this.props.selectedCountry}
                            isLoadingGeography={this.props.isLoadingGeography}
                            regionCode={this.props.regionCode} selectedState={this.props.selectedState} countriesTableData={this.props.countriesTableData}
                                googleMapData={this.props.googleMapData} dimension={this.props.dimension} />
                        </Col>
                        <Row>
                            <Col sm={6} style={{ paddingTop: "45px" }}>
                                <TopStoriesTablePresentation
                                    colorsArray={this.props.colorsArray}
                                    isLoadingGeography={this.props.isLoadingGeography}
                                    tableData={this.props.topStoriesData} selectedTab={this.props.selectedTab} />
                            </Col>
                            <Col sm={6}>
                                <PageViewsTablePresentation
                                    colorsArray={this.props.colorsArray}
                                    handleCMSDropDownChange={this.props.handleCMSDropDownChange}
                                    cmsDimensionDropDownSelection={this.props.cmsDimensionDropDownSelection}
                                    isLoadingPageViews={this.props.isLoadingPageViews} tableData={this.props.pageViewsData} />
                            </Col>
                        </Row>
                    </Grid>
                </Overlay>
            </div>
        );
    }

}
