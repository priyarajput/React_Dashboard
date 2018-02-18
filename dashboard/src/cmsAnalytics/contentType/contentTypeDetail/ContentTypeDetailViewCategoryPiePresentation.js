/**
 * Created by bluepi12 on 8/9/17.
 */
import * as React from "react";
import {BPanel} from "@sketchpixy/rubix/lib/index";
import PieChartSeries from "../../../reusable/PieChartSeries";

export default class ContentTypeDetailViewCategoryPiePresentation extends React.Component {

    render() {
        return (
            <BPanel>

                <div className="tablehead">
                    Published Content By Category
                </div>
                <PieChartSeries id="authorDetailTypePie" isLoading={this.props.isLoading} data={this.props.categoryPieData}
                                graphHeight="425"/>

            </BPanel>
        );
    }

}
