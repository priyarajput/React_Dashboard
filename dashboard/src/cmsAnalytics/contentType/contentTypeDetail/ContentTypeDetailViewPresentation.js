/**
 * Created by bluepi12 on 8/9/17.
 */
import * as React from "react";
import { browserHistory } from 'react-router';
import Select from 'react-select';
import {Col, DropdownButton, Grid, MenuItem, Row, Tab, Tabs, Button, ButtonGroup,BPanel} from "@sketchpixy/rubix/lib/index";

import ContentTypeDetailViewAreaChartPresentation from "./ContentTypeDetailViewAreaChartPresentation";
import ContentTypeDetailViewAuthorPiePresentation from "./ContentTypeDetailViewAuthorPiePresentation";
import CategoryAnalyticsDetailViewTypePiePresentation from "./ContentTypeDetailViewCategoryPiePresentation";
import ContentTypeDetailViewContentTablePresentation from "./ContentTypeDetailViewContentTablePresentation";
import Overlay from "../../../common/Overlay.jsx";
import {
    calculateHeaderNonDashboardAndCallApi, filterOptions
} from "../../../services/api";

export default class ContentTypeDetailViewPresentation extends React.Component {

    getOptions = (value, callback) => {
        let rows = [];
        if (value.length > 3 && value && value.trim().length) {
            value = value.trim();
            let searchList = calculateHeaderNonDashboardAndCallApi({
                headerFilter: this.props.headerFilter
            }, "searchType?type=" + value);
            searchList.then(response => {
                let search = response.response;
                if (search && search.length > 0) {
                    for (let i = 0; i < search.length; i++) {
                        let obj = {};
                        obj.value = search[i];
                        obj.searchResult = search[i];
                        obj.label = search[i];
                        rows.push(obj);
                    }
                    return callback(null, {
                        options: rows,
                        complete: true
                    });
                }
            });
        }
        else {
            let text = "Search Type";
            return callback(null, {
                options: [
                    {value: "", label: text},
                ],
                complete: true
            });
        }
    };

    render() {
        return (
            <div>
                <link rel="stylesheet" href="https://unpkg.com/react-select-plus/dist/react-select-plus.css"/>
                <Row>
                    <Col sm={10} style={{textAlign:"left"}}>
                        <h3 style={{float: "left"}}>
                            {this.props.categoryName}
                        </h3>
                    </Col>
                    <Col sm={2} style={{textAlign:"left", marginTop: "15px"}}>
                        <Select.Async name="search-category" clearable={true}
                                      onChange={this.props.contentOnChange} filterOptions={filterOptions}
                                      loadOptions={::this.getOptions} required/>
                    </Col>
                </Row>
                <Overlay isLoading={this.props.isLoading}>
                    <Row>
                        <ContentTypeDetailViewAreaChartPresentation dualAreaGraphData={this.props.dualAreaGraphData}
                                                   headerFilter={this.props.headerFilter}
                        />
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <ContentTypeDetailViewAuthorPiePresentation isLoading={this.props.isLoading} authorPieData={this.props.authorPieData}/>
                        </Col>
                        <Col sm={6}>
                            <CategoryAnalyticsDetailViewTypePiePresentation isLoading={this.props.isLoading} categoryPieData={this.props.categoryPieData}/>
                        </Col>
                    </Row>
                    <Row>
                        <ContentTypeDetailViewContentTablePresentation downloadTableData={this.props.downloadTableData} contentTableData={this.props.contentTableData}/>
                    </Row>
                </Overlay>
            </div>
        );
    }

}
