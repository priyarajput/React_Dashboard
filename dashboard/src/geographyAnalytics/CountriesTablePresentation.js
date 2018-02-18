
import * as React from 'react';
import ReactTable from "react-table";
import TableOverlay from "../common/TableOverlay.jsx";

function onRowClick(state, rowInfo, column, instance) {
    return {
        onClick: e => {
            instance.props.handleMetricChange(rowInfo.row.dimension, instance.props.dimension,rowInfo.row._original.countryCode)
        }
    }
}


export default class CountriesTablePresentation extends React.Component {
  

    render() {
        return (
                <div style={{ height: '30px' }} >
                    <ReactTable 
                        columns={this.props.columns}
                        data={this.props.tableData}
                        defaultPageSize={this.props.tableData.length}
                        className="-striped -highlight tablehead"
                        filterable={true}
                        showPagination={false}
                        getNoDataProps={() => {
                            return {
                                style: {
                                    display: "none"
                                }
                            }
                        }}
                        sortable={!this.props.isLoadingGeography}
                        getTrProps={onRowClick}
                        colorsArray={this.props.colorsArray}
                        handleMetricChange={this.props.handleMetricChange}
                        defaultFilterMethod={this.props.filterCaseInsensitive}
                        dimension={this.props.dimension}
                        style={{ height: '525px' }}
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


CountriesTablePresentation.defaultProps = {
    columns: [{
        Header: <h4>Geography</h4>,
        accessor: "dimension",
        getProps: (state, rowInfo, column) => {
            return {
                style: {
                    color: rowInfo ? state.colorsArray[rowInfo.row._index % 5] : null,
                    cursor: rowInfo ? (state.dimension == 'city' ? 'initial':'pointer') : 'initial'
                }
            }
        },
        Filter:({ filter, onChange }) =><input onChange={event => onChange(event.target.value)} type="text" style={{backgroundColor:"#444444",width:"100%"}} placeholder="Search Geography..."/>
        
    }, {
        Header: <h4> Count</h4>,
        accessor: "count",
        filterable:false
    }]
};