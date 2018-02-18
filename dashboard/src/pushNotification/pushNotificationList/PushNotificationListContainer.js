import * as React from "react";
import {connect} from "react-redux";
import PushNotificationListPresentation from "./PushNotificationListPresentation";
import moment from 'moment-timezone';
import {Link} from "react-router";


const mapStateToProps = (state) => {
    return {
        headerFilter: state.headerFilter,
        tableData: state.pushNotificationListData.tableData,
        isLoading: state.pushNotificationListData.isLoading,
        sortValue: state.pushNotificationListData.sortValue,
        sortDim: state.pushNotificationListData.sortDim,
        limit: state.pushNotificationListData.limit,
        offset: state.pushNotificationListData.offset,
        colorsArray:state.colors,
        CTRData:state.pushNotificationListData.CTRData,
        isCTRLoading:state.pushNotificationListData.isCTRLoading,
        downloadTableData : state.pushNotificationListData.downloadTableData ?state.pushNotificationListData.downloadTableData :[]
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPushNotificationListData: (headerFilter, sortValue, sortDim, limit, offset) => {
            dispatch({
                type: "PUSH_NOTIFICATION_LIST_DATA_UPDATE_WATCHER", headerFilter: headerFilter,
                sortValue: sortValue, sortDim: sortDim, limit: limit, offset: offset
            });
        },
        getCTRData: (id,headerFilter) => {
            dispatch({
                type: "PUSH_NOTIFICATION_CTR_DATA_UPDATE_WATCHER", 
                id: id,
                headerFilter: headerFilter
            });
        }
    };
};


@connect(mapStateToProps, mapDispatchToProps)
export default class PushNotificationListContainer extends React.Component {

    fetchData = (state, instance) => {
        let sort = "desc";
        if (!state.sorted[0].desc)
            sort = "asc";
        this.props.getPushNotificationListData(this.props.headerFilter, sort, state.sorted[0].id, 500, 1);
    };

    ctrData = (id) => {
        this.props.getCTRData(id,this.props.headerFilter);
    };

    componentWillUpdate(nextProps) {
        if (nextProps.headerFilter !== this.props.headerFilter) {
            this.props.getPushNotificationListData(nextProps.headerFilter, nextProps.sortValue, nextProps.sortDim, nextProps.limit, nextProps.offset);
        }
    }

    render() {
        return (
            <PushNotificationListPresentation
                data={this.props.tableData}
                isLoading={this.props.isLoading}
                columns={this.props.columns}
                defaultPageSize={this.props.defaultPageSize}
                className="-striped -highlight tablehead"
                fetchData={::this.fetchData}
                ctrData={::this.ctrData}
                colorsArray={this.props.colorsArray}
                downloadTableData={this.props.downloadTableData}
                CTRData={this.props.CTRData?this.props.CTRData:0}
                isCTRLoading={this.props.isCTRLoading}
            />
        )
    };
};

PushNotificationListContainer.defaultProps = {
    columns: [{
        Header: <h4 style={{color:"#a06666"}}>Content Id</h4>,
        accessor: "cntId",
        expander: true,
        Expander: ({ isExpanded, ...rest }) => (
                    <div>
                      {isExpanded ? (
                        rest.row._original.cntId
                      ) : (
                        rest.row._original.cntId
                      )}
                    </div>
                  ),
        id: 'pushNotification.contentId',
       
    }, {
        Header: <h4 style={{color:"#5ea0a0"}}>Notification Message</h4>,
        accessor: "title",
        id: 'pushNotification.message',
        expander: true,
        minWidth:150,
        Expander: ({ isExpanded, ...rest }) => (
                    <div className='pushNotificationListTable'>
                      {isExpanded ? (
                        rest.row._original.title
                      ) : (
                        rest.row._original.title
                      )}
                    </div>
                  ),
        getProps: (state, rowInfo, column) => {
            return {
                style: {
                    color: rowInfo?state.colorsArray[rowInfo.row._index%5]:null
                }
            }
        }
    }, {
        Header: <h4 style={{color:"#7b9ba0"}}>Content Type</h4>,
        accessor: "type",
        expander: true,
        Expander: ({ isExpanded, ...rest }) => (
                    <div className='pushNotificationListTable' style={{marginLeft:' 5px'}}>
                      {isExpanded ? (
                        rest.row._original.type
                      ) : (
                        rest.row._original.type
                      )}
                    </div>
                  ),
        id: 'pushNotification.article.format'
    }, {
        Header: <h4 style={{color:"#a0a07b"}}>Category</h4>,
        accessor: "cat",
        expander: true,
        Expander: ({ isExpanded, ...rest }) => (
                    <div className='pushNotificationListTable'  style={{marginLeft:' 7px'}}>
                      {isExpanded ? (
                        rest.row._original.cat
                      ) : (
                        rest.row._original.cat
                      )}
                    </div>
                  ),
        id: 'pushNotification.article.categoryList'
    }, {
        Header: <h4 style={{color:"#8c79a0"}}>Date Of Send</h4>,
        accessor: "dt",
        id: 'dateOfSending',
        expander: true,
        minWidth:150,
        Expander: ({ isExpanded, ...rest }) => (
                    <div className='pushNotificationListTable'  style={{marginLeft:' 7px'}}>
                      {isExpanded ? (
                        moment(new Date(rest.row._original.dt)).format("Do MMM YY, h:mm a")
                      ) : (
                        moment(new Date(rest.row._original.dt)).format("Do MMM YY, h:mm a")
                      )}
                    </div>
                  ),
        Cell: row => (
            moment(new Date(row.value)).format("Do MMM YY, h:mm a")
        )
    }, {
        Header: <h4 style={{color:"#a06666"}}>Rule</h4>,
        accessor: "rule",
        expander: true,
        Expander: ({ isExpanded, ...rest }) => (
                    <div className='pushNotificationListTable'  style={{marginLeft:' 9px'}}>
                      {isExpanded ? (
                        rest.row._original.rule
                      ) : (
                        rest.row._original.rule
                      )}
                    </div>
                  ),
        id: 'pushNotification.rule'
    }, {
        Header: <h4 style={{color:"#5ea0a0"}}>Language</h4>,
        accessor: "lang",
        expander: true,
        Expander: ({ isExpanded, ...rest }) => (
                    <div className='pushNotificationListTable'  style={{marginLeft:' 11px'}}>
                      {isExpanded ? (
                        rest.row._original.lang
                      ) : (
                        rest.row._original.lang
                      )}
                    </div>
                  ),
        id: 'pushNotification.language'
    }, {
        Header: <h4 style={{color:"#7b9ba0"}}>Topic</h4>,
        accessor: "topic",
        expander: true,
        Expander: ({ isExpanded, ...rest }) => (
                    <div  className='pushNotificationListTable' style={{marginLeft:' 15px'}}>
                      {isExpanded ? (
                        rest.row._original.topic
                      ) : (
                        rest.row._original.topic
                      )}
                    </div>
                  ),
        id: 'topic'
    }, 
    {
    Header: <h4 style={{color:"#a0a07b"}}>Sent By</h4>,
        accessor: "name",
        expander: true,
        Expander: ({ isExpanded, ...rest }) => (
                    <div  className='pushNotificationListTable' style={{marginLeft:' 15px'}}>
                      {isExpanded ? (
                        rest.row._original.name
                      ) : (
                        rest.row._original.name
                      )}
                    </div>
                  ),
        id: 'pushNotification.name',
       
    },{
        Header: <h4 style={{color:"#7b9ba0"}}>ID</h4>,
        accessor: "id",
        id: 'id',
        show: false
    }],
    defaultPageSize: 1

};