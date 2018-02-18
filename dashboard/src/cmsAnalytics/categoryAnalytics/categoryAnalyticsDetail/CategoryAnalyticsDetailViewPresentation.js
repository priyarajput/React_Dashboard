/**
 * Created by bluepi12 on 7/9/17.
 */
import * as React from "react";
import { browserHistory } from 'react-router';
import Select from 'react-select';
import {Col, DropdownButton, Grid, MenuItem, Row, Tab, Tabs, Button, ButtonGroup,BPanel} from "@sketchpixy/rubix/lib/index";

import CategoryAnalyticsDetailViewAreaChartPresentation from "./CategoryAnalyticsDetailViewAreaChartPresentation";
import CategoryAnalyticsDetailViewAuthorPiePresentation from "./CategoryAnalyticsDetailViewAuthorPiePresentation";
import CategoryAnalyticsDetailViewTypePiePresentation from "./CategoryAnalyticsDetailViewTypePiePresentation";
import CategoryAnalyticsDetailViewContentTablePresentation from "./CategoryAnalyticsDetailViewContentTablePresentation";
import Overlay from "../../../common/Overlay.jsx";
import {
    calculateHeaderNonDashboardAndCallApi, filterOptions
} from "../../../services/api";

export default class CategoryAnalyticsDetailViewPresentation extends React.Component {

    getOptions = (value, callback) => {
        let rows = [];
        if (value.length > 1 && value && value.trim().length) {
            value = value.trim();
            let searchList = calculateHeaderNonDashboardAndCallApi({
                headerFilter: this.props.headerFilter
            }, "searchCategory?category=" + value);
            searchList.then(response => {
                let search = response.response;
                if (search && search.length > 0) {
                    for (let i = 0; i < search.length; i++) {
                        let category=search[i].articleCategory.toLowerCase();
                        if(category.indexOf(value)>-1) {
                            let obj = {};
                            obj.value = search[i].articleCategory;
                            obj.searchResult = search[i].articleCategory;
                            obj.label = search[i].articleCategory;
                            rows.push(obj);
                        }
                    }
                    return callback(null, {
                        options: rows,
                        complete: true
                    });
                }
            });
        }
        else {
            let text = "Search Category";
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
                        <CategoryAnalyticsDetailViewAreaChartPresentation dualAreaGraphData={this.props.dualAreaGraphData}
                                                   headerFilter={this.props.headerFilter}
                        />
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <CategoryAnalyticsDetailViewAuthorPiePresentation isLoading={this.props.isLoading} authorPieData={this.props.authorPieData}/>
                        </Col>
                        <Col sm={6}>
                            <CategoryAnalyticsDetailViewTypePiePresentation isLoading={this.props.isLoading} typePieData={this.props.typePieData}/>
                        </Col>
                    </Row>
                    <Row>
                        <CategoryAnalyticsDetailViewContentTablePresentation downloadTableData={this.props.downloadTableData} contentTableData={this.props.contentTableData}/>
                    </Row>
                </Overlay>
            </div>
        );
    }

}
