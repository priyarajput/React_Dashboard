import * as React from "react";
import { browserHistory } from 'react-router';
import Select from 'react-select';
import {Col, DropdownButton, Grid, MenuItem, Row, Tab, Tabs, Button, ButtonGroup,BPanel} from "@sketchpixy/rubix/lib/index";
import AuthorAnalyticsDetailViewAreaChartPresentation from "./AuthorAnalyticsDetailViewAreaChartPresentation";
import AuthorAnalyticsDetailViewCategoryPiePresentation from "./AuthorAnalyticsDetailViewCategoryPiePresentation";
import AuthorAnalyticsDetailViewTypePiePresentation from "./AuthorAnalyticsDetailViewTypePiePresentation";
import AuthorAnalyticsDetailViewContentTablePresentation from "./AuthorAnalyticsDetailViewContentTablePresentation";
import Overlay from "../../../common/Overlay.jsx";
import {
    calculateHeaderNonDashboardAndCallApi, filterOptions
} from "../../../services/api";

export default class AuthorAnalyticsDetailViewPresentation extends React.Component {

    getOptions = (value, callback) => {
        let rows = [];
        if (value.length > 3 && value && value.trim().length) {
            value = value.trim();
            let searchList = calculateHeaderNonDashboardAndCallApi({
                headerFilter: this.props.headerFilter
            }, "searchAuthor?author=" + value);
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
            let text = "Search Author";
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
                            {this.props.authorName}
                        </h3>
                    </Col>
                    <Col sm={2} style={{textAlign:"left"}}>
                        <Select.Async name="search-author" clearable={true}
                                      onChange={this.props.contentOnChange} filterOptions={filterOptions}
                                      loadOptions={::this.getOptions} required/>
                    </Col>
                </Row>
                <Overlay isLoading={this.props.isLoading}>
                    <Row>
                        <AuthorAnalyticsDetailViewAreaChartPresentation dualAreaGraphData={this.props.dualAreaGraphData} 
                                                   headerFilter={this.props.headerFilter}
                        />
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <AuthorAnalyticsDetailViewCategoryPiePresentation isLoading={this.props.isLoading} categoryPieData={this.props.categoryPieData}/>
                        </Col>
                        <Col sm={6}>
                            <AuthorAnalyticsDetailViewTypePiePresentation isLoading={this.props.isLoading} typePieData={this.props.typePieData}/>
                        </Col>
                    </Row>
                    <Row>
                        <AuthorAnalyticsDetailViewContentTablePresentation downloadTableData={this.props.downloadTableData} contentTableData={this.props.contentTableData}/>
                    </Row>
                </Overlay>
            </div>
        );
    }

}
