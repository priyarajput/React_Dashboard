import * as React from "react";
import { Col, Row, Label, Button,Icon } from "@sketchpixy/rubix/lib/index";
import ReactTable from 'react-table';
import TableOverlay from "../../common/TableOverlay.jsx";
import Overlay from "../../common/Overlay.jsx";

import {Link} from "react-router";
import { titleCase } from "change-case";


export default class UserManagementPresentation extends React.Component {

    render() {
        return (
            <div >
                <Overlay isLoading={this.props.isLoading}>
                    <Col sm={12} style={{paddingLeft:0, paddingRight:0}}>
                    <span style={{ fontSize:"24px", marginTop: 0 }}>User Management</span>
                       <Button style={{ float: "right", marginBottom:"15px" }} bsStyle="primary" lg
                            onClick={this.props.handleAddUser}>Add User</Button>
                    </Col>
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
                        loading={this.props.isLoading}
                        sortable={!this.props.isLoading}
                        colorsArray={this.props.colorsArray}
                        style={{ height: '550px' }}
                        defaultSorted={[
                            {
                                id: "name",
                                desc: true
                            }
                        ]}
                    />

                </Overlay>
            </div>
        )
    };
}



UserManagementPresentation.defaultProps = {
    columns: [{
        Header: <h4>User Name</h4>,
        accessor: "name",
        getProps: (state, rowInfo, column) => {
            return {
                style: {
                    color: rowInfo ? state.colorsArray[rowInfo.row._index % 5] : null
                }
            }
        },
    },
    {
        Header: <h4 style={{color:"#27c0a1"}}> Email-id</h4>,
        accessor: "email",

    },
    {
        Header: <h4 style={{color:"#b86d64"}}> Role</h4>,
        accessor: "roleMap",
        minWidth: 150,
        Cell: row => (
            row.value ? row.value.map(function (key, index) {
                return <span> <Label style={{color:"#91a0a2", background:"transparent",border:"1px solid "}}>{titleCase(key)}</Label> </span>
            }) : '--'
        )
    }, {
        Header: <h4  style={{color:"#9997e5"}}>Status</h4>,
        accessor: "active",
        Cell: row => (
            <span>{row.value === "true" ?"Enabled":"Disabled"}</span>
            
        )
    }, {
        Header: <h4  style={{color:"#baba4c"}}>Edit</h4>,
        accessor: "active",
        Cell: row => (
            <Link to={"/editUser/"+row.original.email}><Button style={{color:"#91a0a2", background:"transparent"}} onChange={event => handleMetricChange.bind(event.target.value)} ><Icon bundle='fontello' glyph="edit" /></Button></Link>
           )
    }
]
};
