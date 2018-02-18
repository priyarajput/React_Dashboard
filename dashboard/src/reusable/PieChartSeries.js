/**
 * Created by bluepi12 on 26/8/17.
 */

import React from 'react';

import {
    Row,
    Col,
    Panel,
    PanelBody,
    PanelContainer,
} from '@sketchpixy/rubix';

import shallowCompare from 'react-addons-shallow-compare';

class Chart extends React.Component {
    render() {
        return (
            <div id={this.props.id}/>
        );
    }
}

export default class PieChartSeries extends React.Component {

    setCustomParams = (updatedParams) => {

        let graphHeight = updatedParams.graphHeight ? updatedParams.graphHeight : 300;
            (() => {
                let pie = Rubix.Pie('#'+(updatedParams.id?updatedParams.id:'pie-chart'), {
                    height: graphHeight
                });
                pie.addData(updatedParams.data);
            })();

    };

    componentWillUpdate(nextProps,nextState) {
        if (shallowCompare(this, nextProps,nextState)) {
            this.setCustomParams(nextProps)
        }
    }

    componentDidMount() {
        if(!this.props.isLoading) {
            this.setCustomParams(this.props)
        }
    }



    render() {
        return (
            <div>
                <Row>
                    <Col sm={12} collapseRight>
                        <Chart id={this.props.id?this.props.id:'pie-chart'} />
                    </Col>
                </Row>
            </div>
        );
    }
}
