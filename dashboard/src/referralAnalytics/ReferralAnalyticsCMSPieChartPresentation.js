/**
 * Created by anjna on 9/4/17.
 */

import * as React from "react";
import PieChartSeries from "../reusable/PieChartSeries";
import { BPanel, DropdownButton, MenuItem } from "@sketchpixy/rubix/lib/index";
import Overlay from "../common/Overlay.jsx";

export default class ReferralAnalyticsCMSPieChartPresentation extends React.Component {
    render() {
        return (
        <div className='referralAnalyticsPieCharCMSDimension'>
            <Overlay isLoading={this.props.isLoadingPie}>

                <div className="tablehead referralAnalyticstableheader">
                    <h4 className="pull-left">CMS Dimension</h4>
                    <div className="pull-right" disabled={this.props.isLoadingReferral}>
                        <DropdownButton disabled={this.props.isLoadingReferral || this.props.isLoadingPie}
                            id="cmsReferralDropdown" key="cmsReferralDropdown"
                            title={this.props.cmsDimensionDropDownSelection.label} pullRight
                            onSelect={this.props.handleCMSDropDownChange}>
                            <MenuItem key="articleCategory" eventKey="articleCategory">Category</MenuItem>
                            <MenuItem key="articleType" eventKey="articleType">Type</MenuItem>
                        </DropdownButton>
                    </div>
                </div>
                <div style={{ backgroundColor: "#465050", minHeight: '440px' }}>
                    <PieChartSeries className='referralAnalyticsPieChar' isLoadingReferral={this.props.isLoadingReferral} isLoading={this.props.isLoadingPie} data={this.props.pieChartData}
                        graphHeight="402" />
                </div>
            </Overlay>
        </div>
        )
    }
}