import * as React from "react";
import ActiveDevicePresentation from "./ActiveDevicesPresentation";
import CTRPresentation from "./CTRPresentation";
import PushInfluencePresentation from "./PushInfluencePresentation";
import {Col, Row} from "@sketchpixy/rubix/lib/index";
import PushNotificationPerformanceTabView from "./PushNotificationPerformanceTabView";
import numeral from 'numeral';
import HeaderValue from "./HeaderValue";


export default class PushNotificationPerformancePresentation extends React.Component {

    render() {
        return (
            <div>
                <Row>
                    <Col md={4}>
                        <CTRPresentation isLoading={this.props.isLoading}
                                         totalOpen={this.props.totalOpen}
                                         totalReach={this.props.totalReach}
                                         ctrCount={this.props.ctrCount}/>
                    </Col>
                    <Col md={4}>
                        <ActiveDevicePresentation activeDevices={this.props.activeDevices}
                                                  isLoading={this.props.isLoading}/>
                    </Col>
                    <Col md={4}>
                        <PushInfluencePresentation pushViews={this.props.pushViews}
                                                   pageViews={this.props.pageViews}
                                                   pviCount={this.props.pviCount}
                                                   isLoading={this.props.isLoading}/>
                    </Col>
                </Row>
                <Row>

                </Row>
                <Row>
                    <Col md={12}>
                        <PushNotificationPerformanceTabView
                            data={this.props.tableData}
                            isLoading={this.props.isLoading}
                            isLoadingTable={this.props.isLoadingTable}
                            columns={this.props.columns}
                            defaultPageSize={this.props.defaultPageSize}
                            className="-striped -highlight tablehead"
                            colorsArray={this.props.colorsArray}
                            aggByValueSelection={this.props.aggByValueSelection}
                            dimension={this.props.dimension}
                            filterCaseInsensitive={this.props.filterCaseInsensitive}/>
                    </Col>
                </Row>
            </div>

        )
    };
};

PushNotificationPerformancePresentation.defaultProps = {
    columns: [{
        Header: <HeaderValue/>,
        accessor: "dimension",
        Filter:({ filter, onChange }) =><input onChange={event => onChange(event.target.value)} type="text" style={{backgroundColor:"#444444",width:"100%"}} placeholder="Search..."/>,
        getProps: (state, rowInfo, column) => {
            return {
                style: {
                    color: rowInfo ? state.colorsArray[rowInfo.row._index % 5] : null
                }
            }
        }
    }, {
       Header: <h4 style={{color: "#5ea0a0"}}> Opened</h4>,
       accessor: "openRate",
        Cell: row => ( <div style={{overflow:"hidden",textOverflow:"ellipsis",marginLeft:'5px'}}>{
            numeral(row.value).format('0,0')}</div>
        ),
        filterable: false,

    },{
        Header: <h4 style={{color: "#a0a07b"}}> PIV %</h4>,
        accessor: "pushInfluencedViews",
        Cell: row => ( <div style={{overflow:"hidden",textOverflow:"ellipsis",marginLeft:'10px'}}>{
            ((row.value) * 100).toFixed(2)}</div>
        ),
        filterable: false
    }],
    defaultPageSize: 1
};

