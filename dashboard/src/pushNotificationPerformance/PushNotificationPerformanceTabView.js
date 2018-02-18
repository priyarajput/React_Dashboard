import * as React from "react";
import ReactTable from 'react-table';
import "../../public/css/react-table.css";
import Overlay from "../common/Overlay.jsx";
import {BPanel, Icon, DropdownButton, MenuItem,Col} from "@sketchpixy/rubix/lib/index";
import TableOverlay from "../common/TableOverlay.jsx";


export default class PushNotificationPerformanceTabView extends React.Component {

    render() {
        const myScrollbar = {
     width: '100%',
      height: 400,
    };
        return (
         <div className='pushNotificationPerformanceLoader'>
                <Overlay isLoading={this.props.isLoading || this.props.isLoadingTable}>
                        <span className="pull-right pushNotificationPerformanceDropDown">
                            <DropdownButton className='PushNotificationPerformanceTabViewDropDown' disabled={this.props.isLoading || this.props.isLoadingTable} title={this.props.dimension.dimensionKeyLabel}
                                            id='dropdown-success'
                                            onSelect={this.props.aggByValueSelection}>
                                <MenuItem eventKey="city">City</MenuItem>
                                <MenuItem eventKey="state">State</MenuItem>
                                <MenuItem eventKey="country">Country</MenuItem>
                                <MenuItem eventKey="distribution">Distribution</MenuItem>
                                <MenuItem eventKey="articleCategory">Category</MenuItem>
                                <MenuItem eventKey="articleType">Type</MenuItem>
                            </DropdownButton>
                        </span>

                    <div className='pushNotificationPerformanceTabView'>
                       <ReactTable
                            LoadingComponent={TableOverlay}
                            columns={this.props.columns}
                            data={this.props.data}
                            defaultPageSize={this.props.data.length}
                            className={this.props.className}

                            filterable={true}
                            defaultFilterMethod={this.props.filterCaseInsensitive}
                            getNoDataProps={() => {
                                return {
                                    style: {
                                        display: "none"
                                    }
                                }
                            }}
                            showPagination={false}
                            style={{height: '500px'}}
                            colorsArray={this.props.colorsArray}
                            defaultSorted={[
                                {
                                    id: "openRate",
                                    desc: true
                                }
                            ]}
                        />
                    </div>
                </Overlay>
           </div>

        );
    }
}
