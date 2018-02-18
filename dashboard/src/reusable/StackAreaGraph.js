import React from 'react';

import {Col, Row,} from '@sketchpixy/rubix';

class Chart extends React.Component {
    render() {
        return (
            <div id={this.props.id}/>
        );
    }
}

export default class StackAreaGraph extends React.Component {

    setCustomParams = (updatedParams) => {
        $("#" + updatedParams.chartId).html("");
        let keys = updatedParams.keys;
        let data = updatedParams.data;
        let graphPreferences = updatedParams.graphPreferences;
        let graphHeight = updatedParams.graphPreferences.graphHeight ? updatedParams.graphPreferences.graphHeight : 300;

        let color = ["#2eb398", "#426F9F", "#9F7832", "#89a54e", "#80699b", "#804000"];
        let marker = ["circle", "square", "cross"];

        let isRounded = updatedParams.rounded;
        let chart = new Rubix('#' + updatedParams.chartId, {
            height: graphHeight,
            title: updatedParams.title,
            axis: {
                x: {
                    type: "datetime",
                    tickCount: parseInt(graphPreferences.xAxisTickCount)
                }
            },
            tooltip: {
                color: 'white',
                format: {
                    y: '.0f',
                    x: '%Y-%m-%d %I:%M %p'
                }
            },
            stacked: false,
            offset: 'zero',
            draw:{
                grid:false
            }
        });

        let datas, key, area;
        for (let i = 0; i < keys.length; i++) {
            key = keys[i];
            datas = [];
            for (let j = 0; j < data.length; j++) {
                let obj = {};
                if (data[j][key]) {
                    obj.y = data[j][key];
                    obj.x = data[j]["dt"];
                }
                else {
                    obj.y = 0;
                    obj.x = data[j]["dt"];
                }
                datas.push(obj)
            }
            area = load(key, i);
            let formattedData = datas.map(function (d) {
                return {
                    x: new Date(d["x"]).getTime(),
                    y: d["y"]
                }
            });
            area.addData(formattedData)
        }

        function load(key, idx) {
            return chart.area_series({
                name: key,
                color: color[idx],
                marker: marker[idx],
                isRounded: isRounded,
            });
        }
    };

    componentWillUpdate(nextProps) {
        this.setCustomParams(nextProps)
    }

    componentDidMount() {
        this.setCustomParams(this.props)
    }

    render() {
        return (
            <div>
                <Row>
                    <Col sm={12}>
                        <Chart id={this.props.chartId}/>
                    </Col>
                </Row>
            </div>
        );
    }
}