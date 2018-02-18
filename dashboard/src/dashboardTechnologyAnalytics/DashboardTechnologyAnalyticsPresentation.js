import * as React from "react";
import {Col,Row,Grid, Tab, Tabs, Button, ButtonGroup} from "@sketchpixy/rubix/lib/index";
import DashboardTechnologyAnalyticsGraphPresentation from "./DashboardTechnologyAnalyticsGraphPresentation";
import DashboardTechnologyAnalyticsTablePresentation from "./DashboardTechnologyAnalyticsTablePresentation";
import {BPanel, Icon,DropdownButton, MenuItem} from "@sketchpixy/rubix/lib/index";
import Overlay from "../common/Overlay.jsx";
import numeral from 'numeral';
import HeadeValue from "./HeaderValue";



export default class DashboardTechnologyAnalyticsPresentation extends React.Component {

    render() {
        return (
           <div style={{backgroundColor:"#1A2023",paddingLeft:15,paddingRight:15,borderRadius:10}}>
             <Row>
               <Col sm={12}>
                  <h3>
                    Technology
                  </h3>
                </Col>
             </Row>
             <Overlay isLoading={this.props.isLoading}>
            <div style={{backgroundColor: "#1A2023",marginBottom:20}}>
               <Row>
                <Col md={12}>
                    <DashboardTechnologyAnalyticsGraphPresentation
                    graphData={this.props.graphData}
                    isLoading={this.props.isLoading}
                    selectedGraphTab={this.props.selectedGraphTab}
                    handleGraphMetricChange={this.props.handleGraphMetricChange}
                    />
                </Col>
              </Row> 
              </div>
              </Overlay>
              <Overlay isLoading={this.props.isLoading}>
            <div>
              <Row>
                <Col md={12}>
                    <DashboardTechnologyAnalyticsTablePresentation
                    data={this.props.tableData}
                    isLoading={this.props.isLoading}
                    isTableLoading={this.props.isTableLoading}
                    columns={this.props.columns}
                    defaultPageSize={this.props.defaultPageSize}
                    className="-striped -highlight tablehead"
                    colorsArray={this.props.colorsArray}
                    selectedTableTab={this.props.selectedTableTab}
                    handleTableMetricChange={this.props.handleTableMetricChange}
                    filterCaseInsensitive={this.props.filterCaseInsensitive}
                    headerFilter={this.props.headerFilter}
                    />
                </Col>
              </Row>

            </div>
            </Overlay>
            </div>

        )
    };
};

DashboardTechnologyAnalyticsPresentation.defaultProps = {

    columns: [
        {
            Header: <HeadeValue/>,
            accessor: "dimension",
            Filter:({ filter, onChange }) =><input onChange={event => onChange(event.target.value)} type="text" style={{backgroundColor:"#444444",width:"100%"}} placeholder="Search Technology..."/>,
            getProps: (state, rowInfo, column) => {
                return {
                    style: {
                        color: rowInfo?state.colorsArray[rowInfo.row._index%5]:null
                    }
                }
            }
        },
        {
            Header: <h4 style={{color:"#5ea0a0"}}> Page View</h4>,
            accessor: "pageViews",
            Cell: row => (
                numeral(row.value).format('0,0')
            ),
            filterable:false,

        },
        {
            Header: <h4 style={{color:"#a0a07b"}}> Users</h4>,
            accessor: "users",
            Cell: row => (
                numeral(Math.round(row.value)).format('0,0')
            ),
            filterable:false
        },
        {
            Header: <h4 style={{color:"#a0a07b"}}> Session</h4>,
            accessor: "session",
            Cell: row => (
                numeral(Math.round(row.value)).format('0,0')
            ),
            filterable:false
        }
    ],
    defaultPageSize: 1
};

