import * as React from "react";
import {connect} from "react-redux";
import CategoryAnalyticsPresentation from "./CategoryAnalyticsListPresentation";
import {Link} from "react-router";
import numeral from 'numeral';

const mapStateToProps = (state) => {
    return {
        headerFilter: state.headerFilter,
        tableData: state.categoryAnalyticsListData.tableData,
        isLoading: state.categoryAnalyticsListData.isLoading,
        colorsArray:state.colors
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCategoryAnalyticsListData: (headerFilter,limit,dimension) => {
            dispatch({
                type: "CATEGORY_ANALYTICS_LIST_DATA_UPDATE_WATCHER", headerFilter: headerFilter,limit:limit,dimension:dimension
            });
        }
    };
};


@connect(mapStateToProps, mapDispatchToProps)
export default class CategoryAnalyticsListContainer extends React.Component {

    filterCaseInsensitive = (filter, row) => {
            const id = filter.pivotId || filter.id;
            return (
                row[id] !== undefined ?
                    String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
                    :
                    true
            );
        }

    componentWillUpdate(nextProps) {
        if (nextProps.headerFilter !== this.props.headerFilter) {
            this.props.getCategoryAnalyticsListData(nextProps.headerFilter,1000,'articleCategory');
        }
    }

    componentWillMount() {
        this.props.getCategoryAnalyticsListData(this.props.headerFilter,1000,'articleCategory');
    }

    render() {
        return (
            <CategoryAnalyticsPresentation
                data={this.props.tableData}
                isLoading={this.props.isLoading}
                columns={this.props.columns}
                defaultPageSize={this.props.defaultPageSize}
                className="-striped -highlight tablehead"
                colorsArray={this.props.colorsArray}
                filterCaseInsensitive={::this.filterCaseInsensitive}
            />
        )
    };
};

CategoryAnalyticsListContainer.defaultProps = {
    columns: [{
        Header: <h4> Category Name</h4>,
        accessor: "dimension",
        Cell: row => (
            <Link to={'/cmsAnalytics/categories/'+row.value}  style={{color:"inherit"}}>{row.value.toLowerCase()}</Link>
        ),
        Filter:({ filter, onChange }) =><input onChange={event => onChange(event.target.value)} type="text" style={{backgroundColor:"#444444",width:"100%"}} placeholder="Search Category..."/>,
        getProps: (state, rowInfo, column) => {
            return {
                style: {
                    color: rowInfo?state.colorsArray[rowInfo.row._index%5]:null
                }
            }
        }
    }, {
        Header: <h4 style={{color:"#5ea0a0"}}> Story Published</h4>,
        accessor: "publishedContent",
        Cell: row => (<div className='cmsCategoriesAnalyticsPublishedContent'>{
            numeral(Math.round(row.value)).format('0,0')}</div>
        ),
        filterable:false
    }, {
        Header: <h4 style={{color:"#7b9ba0"}}> PageViews</h4>,
        accessor: "pageViews",
        Cell: row => (<div className='cmsCategoriesAnalyticsPageViews'>{
            numeral(Math.round(row.value)).format('0,0')}</div>
        ),
        filterable:false
    }, {
        Header: <h4 style={{color:"#a0a07b"}}> Performance Index</h4>,
        accessor: "cmsPerformanceIndex",
        Cell: row => (<div className='cmsCategoriesAnalyticsPerformanceIndex'>{
            parseFloat(row.value).toFixed(2)}</div>
        ),
        filterable:false
    }],
    defaultPageSize: 1
};