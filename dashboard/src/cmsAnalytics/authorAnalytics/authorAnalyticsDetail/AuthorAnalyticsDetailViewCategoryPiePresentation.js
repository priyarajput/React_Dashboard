import * as React from "react";
import {BPanel} from "@sketchpixy/rubix/lib/index";
import PieChartSeries from "../../../reusable/PieChartSeries";

export default class AuthorAnalyticsDetailViewCategoryPiePresentation extends React.Component {

    render() {
        return (
            <BPanel>
                <div className="tablehead">
                    Published Content By Category
                </div>
                <PieChartSeries id="authorDetailCategoryPie" isLoading={this.props.isLoading}
                                data={this.props.categoryPieData}
                                graphHeight="425"/>
            </BPanel>
        );
    }

}
