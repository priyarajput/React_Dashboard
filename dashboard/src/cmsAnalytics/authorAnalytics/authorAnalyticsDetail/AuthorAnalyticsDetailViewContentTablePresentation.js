import * as React from "react";
import { BPanel, Label } from "@sketchpixy/rubix/lib/index";
import moment from 'moment-timezone';
import ReactTable from 'react-table';
import CsvDownloader from 'react-csv-downloader';

export default class AuthorAnalyticsDetailViewContentTablePresentation extends React.Component {

    render() {
        return (
            <div style={{ margin: "15px", height: "450px" }}>
                <CsvDownloader filename="AuthorAnalyticsDetailTable"

                    columns={this.props.columnsCsv}
                    datas={this.props.downloadTableData} >
                    <button className="btn btn-lg btn-primary" style={{ float: 'right', marginBottom: "15px" }} disabled={!this.props.downloadTableData.length}>Download</button>
                </CsvDownloader>
                <ReactTable
                    columns={this.props.columns}
                    data={this.props.contentTableData}
                    defaultPageSize={this.props.contentTableData.length}
                    className='-striped -highlight tablehead'
                    getNoDataProps={() => {
                        return {
                            style: {
                                display: "none"
                            }
                        }
                    }}
                    filterable={false}
                    showPagination={false}
                    style={{ height: "450px" }}
                    defaultSorted={[
                        {
                            id: "publicationDate",
                            desc: true
                        }
                    ]}
                />
            </div>
        );
    }
}

AuthorAnalyticsDetailViewContentTablePresentation.defaultProps = {
    columns: [{
        Header: <h4 style={{ color: "#8c79a0" }}><img src='/imgs/common/piStats/Audience.png' alt='' style={{ marginRight: "5px" }} /> Title</h4>,
        accessor: "title"
    }, {
        Header: <h4 style={{ color: "#a06666" }}><img src='/imgs/common/piStats/authorAnalytics/Group 212.png' alt='' style={{ marginRight: "5px", color: "#a06666" }} />Published Time</h4>,
        accessor: "publicationDate",
        Cell: row => (
            moment(new Date(row.value)).format("Do MMM YY, h:mm a")
        )
    }, {
        Header: <h4 style={{ color: "#5ea0a0" }}><img src='/imgs/common/piStats/authorAnalytics/Group 181.png' alt='' style={{ marginRight: "5px", color: "#7b9ba0" }} />Category</h4>,
        accessor: "categoryList",
        Cell: row => (
            row.value ? row.value.map(function (key, index) {
                return <Label bsStyle="warning">{key}</Label>
            }) : '--'
        )
    }, {
        Header: <h4 style={{ color: "#7b9ba0" }}>Type</h4>,
        accessor: "format"
    }, {

        Header: <h4 style={{ color: "#a0a07b" }}><img src='/imgs/common/piStats/authorAnalytics/Group 236.png' alt='' style={{ marginRight: "5px", color: "#7b9ba0" }} /> Tags</h4>,
        accessor: "tagList",
        Cell: row => (
            row.value ? row.value.join(', ') : '--'
        )
    }],
    columnsCsv: [{
        id: 'title',
        displayName: 'Title'
    }, {
        id: 'publicationDate',
        displayName: 'Published Time'
    }, {
        id: 'categoryList',
        displayName: 'Category'
    }, {
        id: 'format',
        displayName: 'Type'
    }, {
        id: 'tagList',
        displayName: 'Tags'
    }]
};
