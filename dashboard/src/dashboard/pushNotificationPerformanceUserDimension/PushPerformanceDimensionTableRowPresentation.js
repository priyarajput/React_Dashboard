import * as React from "react";
import numeral from 'numeral';

export default class PushPerformanceDimensionTableRowPresentation extends React.Component{

    render(){
        return(
            <td style={{paddingBottom:'0px'}}>
                <div style={{textAlign: 'center'}}>
                    {numeral(this.props.cellData.event.pushOpenCount).format('0.00a')}
                </div>
                <div className="text-center ellip_text" style={{textAlign:'center',color: this.props.color}}>
                   {this.props.cellData.event.dimensionValue}
                </div>
            </td>
        );
    }
}