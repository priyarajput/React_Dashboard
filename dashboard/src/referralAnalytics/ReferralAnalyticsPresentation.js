import * as React from "react";
import { Col, DropdownButton, Grid, MenuItem, Row, Tab, Tabs, Button, ButtonGroup, Icon } from "@sketchpixy/rubix/lib/index";
import Overlay from "../common/Overlay.jsx";
import ReferralAnalyticsGraphPresentation from "./ReferralAnalyticsGraphPresentation";
import ReferralAnalyticsCMSPieChartPresentation from "./ReferralAnalyticsCMSPieChartPresentation";
import ReferralAnalyticsTablePresentation from "./ReferralAnalyticsTablePresentation";
import 'react-select2-wrapper/css/select2.css';
import Select2 from 'react-select2-wrapper';

export default class ReferralAnalyticsPresentation extends React.Component {

    populateReferralDropDown = () => {
        let dropDownMenuItem = [];
        this.props.referralDropDownList.map(data => {
            dropDownMenuItem.push({ text: data, id: data, disabled: this.props.isLoadingReferral })
        });
        return dropDownMenuItem;
    };

    render() {
        return (
            <div>
                <Row>
                    <div style={{ justifyContent: "space-around", display: "flex" }}>
                        <Col sm={8}></Col>
                        <Col sm={4}>
                          <div style={{display:'inline-flex',float:'right'}}>
                            <div>
                                <Button className='referralAnalyticsBackButton' style={{ float: "right" }} bsStyle="primary" lg
                                    onClick={this.props.handleReferralDropDownChange.bind(this, "back")}><Icon glyph="icon-fontello-undo" /></Button>
                            </div>
                            <div className='referralAnalyticsSearchWithDropDown' style={{ marginTop: "6px" }}>
                                <span style={{
                                    display: this.props.referralLevelAndValue.length === 4 ? "none" : "",
                                    minWidth: "190px"
                                }}>

                                    <Select2
                                    dropdownCssClass='select2Css'
                                    dropdownAutoWidth={true}
                                        multiple={false}
                                        data={this.populateReferralDropDown()}
                                        value={this.props.referralDropDownSelection.label !== '' ? this.props.referralDropDownSelection.label : 'Referrals'}
                                        options={{
                                            placeholder: this.props.referralDropDownSelection.label !== '' ? this.props.referralDropDownSelection.label : 'Referrals',
                                        }}

                                        style={{ width: "100%", textAlign: "left" }}
                                        onSelect={this.props.handleReferralDropDownChange}
                                    />
                                </span>
                            </div>
                            <div>
                                <Button className='referralAnalyticsBackButton' bsStyle="primary" lg
                                    onClick={this.props.handleReferralDropDownChange.bind(this, "top")}><Icon glyph="icon-fontello-cw" /></Button>
                            </div>
                            </div>
                        </Col>
                    </div>
                </Row>

                <div>&nbsp;</div>
                <div className="tablehead referralAnalyticsPresentationTable" style={{ padding: '0px' }}>
                    <Overlay isLoading={this.props.isLoadingReferral}>
                        <Row>
                            <Col sm={12}>
                                <h3><img className='referralAnalyticsIcon' src='/imgs/common/piStats/ReferralAnalytics_icon2.png' alt='' /> Referral
                                    Analytics
                                </h3>
                            </Col>
                        </Row>
                        <Tabs className='referralAnalyticsTabPresentation' activeKey={this.props.selectedMetricTab}
                            id="referralAnalyticsTab"
                            onSelect={this.props.handleMetricChange}>
                            <Tab title="Page views" eventKey="pageViews" disabled={this.props.isLoadingReferral} />
                            <Tab title="Users" eventKey="users" disabled={this.props.isLoadingReferral} />
                            <Tab title="Sessions" eventKey="sessions" disabled={this.props.isLoadingReferral} />
                        </Tabs>
                        <Grid style={{ backgroundColor: "#1a2023" }}>
                            <Row>
                                <Col sm={6}>
                                    <ReferralAnalyticsGraphPresentation graphData={this.props.graphData}
                                        selectedMetricTab={this.props.selectedMetricTab}
                                        topFiveDimensions={this.props.topFiveDimensions} />
                                </Col>
                                <Col sm={6}>
                                    <ReferralAnalyticsCMSPieChartPresentation pieChartData={this.props.pieChartData}
                                        handleCMSDropDownChange={this.props.handleCMSDropDownChange}
                                        isLoadingPie={this.props.isLoadingPie}
                                        isLoadingReferral={this.props.isLoadingReferral}
                                        cmsDimensionDropDownSelection={this.props.cmsDimensionDropDownSelection} />
                                </Col>
                            </Row>
                            <Row style={{ borderRight: "1px", borderBottom: "1px" }}>
                                <Col sm={12}>
                                    <ReferralAnalyticsTablePresentation tableData={this.props.tableData}
                                        isLoadingReferral={this.props.isLoadingReferral}
                                        colorsArray={this.props.colorsArray}
                                        handleReferralDropDownChange={this.props.handleReferralDropDownChange}
                                        referralLevelAndValue={this.props.referralLevelAndValue} />
                                </Col>
                            </Row>
                        </Grid>
                    </Overlay>
                </div>
            </div>
        );
    }

}
