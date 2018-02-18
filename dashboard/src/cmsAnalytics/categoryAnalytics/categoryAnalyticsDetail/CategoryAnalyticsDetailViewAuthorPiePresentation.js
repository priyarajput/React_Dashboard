/**
 * Created by bluepi12 on 7/9/17.
 */
import * as React from "react";
import {BPanel} from "@sketchpixy/rubix/lib/index";
import PieChartSeries from "../../../reusable/PieChartSeries";

export default class CategoryAnalyticsDetailViewAuthorPiePresentation extends React.Component {

    render() {
        return (
            <BPanel>
                <div className="tablehead">
                    Published Content By Author
                </div>
                <PieChartSeries id="authorDetailCategoryPie" isLoading={this.props.isLoading}
                                data={this.props.authorPieData}
                                graphHeight="425"/>
            </BPanel>
        );
    }

}
