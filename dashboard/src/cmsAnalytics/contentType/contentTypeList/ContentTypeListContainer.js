import * as React from "react";
import {connect} from "react-redux";
import ContentTypePresentation from "./ContentTypeListPresentation";
import {Link} from "react-router";
import numeral from 'numeral';

const mapStateToProps = (state) => {
    return {
        headerFilter: state.headerFilter,
        tableData: state.contentTypeListData.tableData,
        isLoading: state.contentTypeListData.isLoading,
        colorsArray:state.colors
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getContentTypeListData: (headerFilter,limit,dimension) => {
            dispatch({
                type: "CONTENT_TYPE_LIST_DATA_UPDATE_WATCHER", headerFilter: headerFilter,limit:limit,dimension:dimension
            });
        }
    };
};


@connect(mapStateToProps, mapDispatchToProps)
export default class ContentTypeListContainer extends React.Component {

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
            this.props.getContentTypeListData(nextProps.headerFilter,1000,'articleType');
        }
    }

    componentWillMount() {
        this.props.getContentTypeListData(this.props.headerFilter,1000,'articleType');
    }

    render() {
        return (
            <ContentTypePresentation
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

ContentTypeListContainer.defaultProps = {
    columns: [{
        Header: <h4><img src='/imgs/common/piStats/Audience.png' alt='' style={{marginRight: "5px"}}/> Content Type</h4>,
        accessor: "dimension",
        Cell: row => (
            <Link to={'/cmsAnalytics/content/'+row.value} style={{color:"inherit"}}>{row.value.toLowerCase()}</Link>
        ),
        Filter:({ filter, onChange }) =><input onChange={event => onChange(event.target.value)} type="text" style={{backgroundColor:"#444444",width:"100%"}} placeholder="Search Content Type..."/>,
        getProps: (state, rowInfo, column) => {
            return {
                style: {
                    color: rowInfo?state.colorsArray[rowInfo.row._index%5]:null
                }
            }
        }
    }, {
        Header: <h4 style={{color:"#5ea0a0"}}><img src='/imgs/common/piStats/contentType/storyPublish.png' alt='' style={{marginRight: "5px",color:"#a06666"}}/> Story Published</h4>,
        accessor: "publishedContent",
        Cell: row => (
            numeral(Math.round(row.value)).format('0,0')
        ),
        filterable:false
    }, {
        Header: <h4 style={{color:"#7b9ba0"}}><img src='/imgs/common/piStats/contentType/pageViews.png' alt='' style={{marginRight: "5px",color:"#5ea0a0"}}/> PageViews</h4>,
        accessor: "pageViews",
        Cell: row => (
            numeral(Math.round(row.value)).format('0,0')
        ),
        filterable:false
    }, {
        Header: <h4 style={{color:"#a0a07b"}}><img src='/imgs/common/piStats/contentType/Performance.png' alt='' style={{marginRight: "5px",color:"#7b9ba0"}}/> Performance Index</h4>,
        accessor: "cmsPerformanceIndex",
        Cell: row => (
            parseFloat(row.value).toFixed(2)
        ),
        filterable:false
    }],
    defaultPageSize: 1
};