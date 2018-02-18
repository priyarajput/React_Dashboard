
import * as React from 'react';

import TableOverlay from "../common/TableOverlay.jsx";
import ReactTable from "react-table";
import Overlay from "../common/Overlay.jsx";
export default class TopStoriesTablePresentation extends React.Component {

    render() {
        return (
                    <ReactTable
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
                        sortable={!this.props.isLoadingGeography}
                        colorsArray={this.props.colorsArray}
                        style={{ height: '300px' }}
                        defaultSorted={[
                            {
                                id: "count",
                                desc: true
                            }
                        ]}
                    />
        )
    };

}

TopStoriesTablePresentation.defaultProps = {
    columns: [{
        Header: <h4>Top Stories</h4>,
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