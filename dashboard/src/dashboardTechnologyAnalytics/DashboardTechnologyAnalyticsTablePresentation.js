import * as React from "react";
import {Col,Row,Grid, Tab, Tabs, Button, ButtonGroup} from "@sketchpixy/rubix/lib/index";
import {BPanel, Icon,DropdownButton, MenuItem} from "@sketchpixy/rubix/lib/index";
import ReactTable from 'react-table';
import "../../public/css/react-table.css";
import Overlay from "../common/Overlay.jsx";
import TableOverlay from "../common/TableOverlay.jsx";
import CsvDownloader from 'react-csv-downloader';



export default class DashboardTechnologyAnalyticsGraphPresentation extends React.Component {

    render() {
            let display=this.props.headerFilter.distribution.display;
        return (
            <div>
                <Row>

                   <Tabs style={{marginLeft:"15px"}} activeKey={this.props.selectedTableTab} id="dashboardTechnologyTableTab"
                              onSelect={this.props.handleTableMetricChange}>
                            {(display==="All"||display==="App")?<Tab title="Distribution" eventKey="distribution" disabled={this.props.isLoading || this.props.isTableLoading}/>:null}
                            {(display==="All"||display==="Web")?<Tab title="Device Type" eventKey="deviceType" disabled={this.props.isLoading || this.props.isTableLoading}/>:null}
                            {(display==="All"||display==="Web"||display==="Mobile"||display==="Desktop")?<Tab title="Browser" eventKey="browserName" disabled={this.props.isLoading || this.props.isTableLoading}/>:""}
                            {(display==="All"||display==="App"||display==="Android-SDK"||display==="iOS-SDK")?<Tab title="App Version" eventKey="appVersion" disabled={this.props.isLoading || this.props.isTableLoading}/>:""}
                            {(display==="All"||display==="App"||display==="Android-SDK"||display==="iOS-SDK"||display==="Mobile"||display==="Web")?<Tab title="Device Manufacturer" eventKey="deviceManufacturer" disabled={this.props.isLoading || this.props.isTableLoading}/>:""}
                            {(display==="All"||display==="App"||display==="Android-SDK"||display==="iOS-SDK"||display==="Mobile"||display==="Web"||display==="Desktop")?<Tab title="Operating System" eventKey="operatingSystemName" disabled={this.props.isLoading || this.props.isTableLoading}/>:""}
                    </Tabs>
                        </Row>

                         <Overlay isLoading={this.props.isLoading || this.props.isTableLoading}>
                    
                    <div style={{minHeight: "520px",marginTop:10}}>
                     <CsvDownloader filename="Technology"
                               columns={this.props.columnsCSV}
                               datas={this.props.data}>
                    <button className="btn btn-lg btn-primary" style={{marginBottom:10,float:'right'}} disabled={!this.props.data.length}>Download
                    </button>
                </CsvDownloader>
                        <ReactTable
                            LoadingComponent={TableOverlay}
                            columns={this.props.columns}
                            data={this.props.data}
                            defaultPageSize={this.props.data.length}
                            className={this.props.className}
                            loading={this.props.isLoading || this.props.isTableLoading}
                            getNoDataProps={() => {
                                return {
                                    style: {
                                        display: "none"
                                    }
                                }
                            }}
                            filterable={true}
                            defaultFilterMethod={this.props.filterCaseInsensitive}
                            showPagination={false}
                            style={{height:'500px'}}
                            colorsArray={this.props.colorsArray}
                            firstColHeader={this.props.selectedTableTab}
                            defaultSorted={[
                                {
                                    id: "pageViews",
                                    desc: true
                                }
                            ]}
                             getHeaderProps={state =>{
                                header:state?console.log('state in table',state):console.log('column',column)
        }}
                        />
                    </div>
                </Overlay>
            </div>

        )
    };
};

DashboardTechnologyAnalyticsGraphPresentation.defaultProps={
    columnsCSV : [{
        id: 'dimension',
        displayName: 'Technology'
    }, {
        id: 'pageViews',
        displayName: 'Page Views'
    }, {
        id: 'users',
        displayName: 'Users'
    }, {
        id: 'session',
        displayName: 'Session'
    }]
};