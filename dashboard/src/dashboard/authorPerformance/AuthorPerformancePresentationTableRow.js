import * as React from "react";
import AuthorPerformanceSparkline from "./AuthorPerformanceSparkline";
import AnimatedNumber from 'react-animated-number';
import humanFormat from 'human-format';
import numeral from 'numeral';

export default class AuthorPerformancePresentationTableRow extends React.Component {
    render() {
        return (
            <tr>

                <td style={{borderTop: "0px", color: this.props.color}}><span>{this.props.data.dimension}</span>
                </td>
                <td style={{borderTop: "0px"}}><AnimatedNumber
                    style={{
                        transition: '0.8s ease-out',
                        transitionProperty:
                            'background-color, color'
                    }}

                    stepPrecision={0}
                    value={parseFloat(this.props.data.cmsPerformanceIndex).toFixed(2)}
                />

                </td>
                <td style={{borderTop: "0px"}}>
                    <AnimatedNumber
                        style={{
                            transition: '0.3s ease-out',
                            transitionProperty:
                                'background-color, color'
                        }}
                        initialValue={0}
                        stepPrecision={0}
                        value={parseFloat(this.props.data.publishedContent).toFixed(0)}
                    />

                </td>
                <td style={{borderTop: "0px"}}><AnimatedNumber className="noWrap"
                                                               style={{
                                                                   transition: '0.3s ease-out',
                                                                   transitionProperty:
                                                                       'background-color, color'
                                                               }}
                                                               initialValue={0}
                                                               stepPrecision={0}
                                                               value={this.props.data.pageViews}
                                                               formatValue={n => `${numeral(n).format('0.00a')} `}
                /></td>
                <td style={{borderTop: "0px",textAlign:"center"}}>
                    <AuthorPerformanceSparkline
                        authorPageViewsData={this.props.authorPageViewsData}
                        data={this.props.data.dimension}/>
                </td>
            </tr>)
    }
}