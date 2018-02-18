
import * as React from "react";
import ReactTable from "react-table";
import CsvDownloader from 'react-csv-downloader';
import numeral from 'numeral';
import HeaderValue from "./HeaderValue";

import {BPanel, DropdownButton, MenuItem} from "@sketchpixy/rubix/lib/index";

const columns = [{
    id: 'dimension',
    displayName: 'Type'
}, {
    id: 'pageViews',
    displayName: 'PageView'
}, {
    id: 'users',
    displayName: 'User'
}, {
    id: 'sessions',
    displayName: 'Session'
}];


export default class ReferralAnalyticsTablePresentation extends React.Component {
    render() {

            let handleReferralTableRowClick=(value)=>{
                let event={};
                let target={};
                target.value=value;
                event.target=target;
                this.props.handleReferralDropDownChange(event);
    };
        return (

            <div className='referralAnalyticsTbale'>
                <CsvDownloader filename="ReferralAnalyticsTable"
                    separator=";"
                    columns={columns}
                    datas={this.props.tableData} >
                    <button className="btn btn-lg btn-primary" style={{float: 'right', marginBottom: "15px"}}  disabled={!this.props.tableData.length}>Download</button>
                </CsvDownloader>

                <ReactTable
                    columns={this.props.columns}
                    data={this.props.tableData}
                    defaultPageSize={this.props.tableData.length}
                    className="-striped -highlight tablehead"
                    filterable={false}
                    showPagination={false}
                    sortable={!this.props.isLoadingReferral}
                    getNoDataProps={() => {
                        return {
                            style: {
                                display: "none"
                            }
                        }
                    }}
                    colorsArray={this.props.colorsArray}
                    referralLevel={this.props.referralLevelAndValue}
                    style={{ height: '400px' }}
                    defaultSorted={[
                        {
                            id: "pageViews",
                            desc: true
                        }
                    ]}

   getTdProps={(state, row, col, instance) => ({
                        onClick: (event, cb) => {
                            // do some stuff with the event
                            // console.log('event',row.original.dimension);
                           handleReferralTableRowClick(row.original.dimension);
                        }
                    })}
                />
            </div>
        )
    }
}

ReferralAnalyticsTablePresentation.defaultProps = {
    columns: [{
        Header: <HeaderValue/>,
        accessor: "dimension",
        getProps: (state, rowInfo, column) => {
            return {
                style: {
                    color: rowInfo ? state.colorsArray[rowInfo.row._index % 5] : null,
                    cursor: state.referralLevel.length === 4? "":"pointer"
                }
            }
        }
    }, {
        Header: <h4 style={{ color: "#5ea0a0" }}> PageView</h4>,
        accessor: "pageViews",
        Cell: row => (<div className='referralAnalyticsPageViewValue'>
            {numeral(row.value).format('0,0')}</div>
        )
    }, {
        Header: <h4 style={{ color: "#7b9ba0" }}> User</h4>,
        accessor: "users",
        Cell: row => (<div className='referralAnalyticsUsersValue'>
            {
            numeral(row.value).format('0,0')}</div>
        )
    }, {
        Header: <h4 style={{ color: "#a0a07b" }}>Session</h4>,
        accessor: "sessions",
        Cell: row => (<div className='referralAnalyticsSessionsValue'>
            {
            numeral(row.value).format('0,0')}</div>
        )
    }]
};