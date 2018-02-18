import * as React from "react";
import {BPanel} from "@sketchpixy/rubix/lib/index";
import PieChartSeries from "../../../reusable/PieChartSeries";

export default class AuthorAnalyticsDetailViewTypePiePresentation extends React.Component {

    render() {
        return (
            <BPanel>

                <div className="tablehead">
                    Published Content By Type
                </div>
                <PieChartSeries id="authorDetailTypePie" isLoading={this.props.isLoading} data={this.props.typePieData}
                                graphHeight="425"/>

            </BPanel>
        );
    }

}
