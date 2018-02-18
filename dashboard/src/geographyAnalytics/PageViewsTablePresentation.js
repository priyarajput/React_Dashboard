import * as React from 'react';
import ReactTable from "react-table";
import TableOverlay from "../common/TableOverlay.jsx";
import { BPanel, DropdownButton, Icon, MenuItem, Table, Col } from "@sketchpixy/rubix/lib/index";
export default class PageViewsTablePresentation extends React.Component {

    render() {
        return (
            <div>
                    <div className="text-right" style={{ marginTop: '10px', marginBottom: '10px' }}>
                            <DropdownButton bsStyle='darkcyan'  disabled={this.props.isLoadingPageViews}
                                onSelect={this.props.handleCMSDropDownChange}
                                title={this.props.cmsDimensionDropDownSelection.label}
                                id='dropdown-success' key="pageViewsDropdown">
                                <MenuItem eventKey="articleCategory">Category</MenuItem>
                                <MenuItem eventKey="articleType">Type</MenuItem>
                                <MenuItem eventKey="articleTag">Tags</MenuItem>
                            </DropdownButton>
                    </div>
                        <ReactTable
                            LoadingComponent={TableOverlay}
                            columns={this.props.columns}
                            data={this.props.tableData}
                            defaultPageSize={this.props.tableData.length}
                            className="-striped -highlight tablehead"
                            filterable={false}
                            showPagination={false}
                            getNoDataProps={() => {
                                return {
                                    style: {
                                        display: "none"
                                    }
                                }
                            }}
                            loading={this.props.isLoadingPageViews}
                            sortable={!this.props.isLoadingPageViews}
                            colorsArray={this.props.colorsArray}
                            style={{ height: '300px' }}
                            defaultSorted={[
                                {
                                    id: "count",
                                    desc: true
                                }
                            ]}
                        />
            </div>
        )
    };



}

PageViewsTablePresentation.defaultProps = {
    columns: [{
        Header: <h4>Page Views</h4>,
        accessor: "dimension",
        getProps: (state, rowInfo, column) => {
            return {
                style: {
                    color: rowInfo ? state.colorsArray[rowInfo.row._index % 5] : null
                }
            }
        },
       }, {
        Header: <h4> Count</h4>,
        accessor: "count",
       
    }]
};