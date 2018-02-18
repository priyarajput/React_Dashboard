import * as React from "react";
import {Col,Row,Grid, Tab, Tabs, Button, ButtonGroup} from "@sketchpixy/rubix/lib/index";
import {BPanel, Icon,DropdownButton, MenuItem} from "@sketchpixy/rubix/lib/index";
import Overlay from "../../common/Overlay.jsx";
import numeral from 'numeral';

export default class CtrDataPresentation extends React.Component {

	componentWillMount(){
        this.props.CTRData[this.props.pnId]?"":this.props.ctrData(this.props.pnId);
    }

    render() {
        let openRate=this.props.CTRData[this.props.pnId]?this.props.CTRData[this.props.pnId][0].result.count:0;
	    let totalReachSum=this.props.CTRData[this.props.pnId]?this.props.CTRData[this.props.pnId][0].result.totalReachSum:0;
        let CTR=this.props.CTRData[this.props.pnId]?(((openRate)*100)/(totalReachSum)):0;
        CTR=(CTR?CTR:0);
        let isCTRLoading=this.props.CTRData[this.props.pnId]?this.props.CTRData[this.props.pnId].isCTRLoading:true;
        return (
        	<Overlay isLoading={isCTRLoading}>
                <div style={{backgroundColor:"#475252",padding:5,color:this.props.colorsArray[this.props.row.row._index%5]}}>
                    <span style={{marginRight:100,color:'rgb(160, 160, 123)'}}>CTR : {(CTR===Infinity)?0:CTR.toFixed(2)}%</span>
                    <span style={{marginRight:100,color:'rgb(160, 160, 123)'}}>Total Opened : {numeral(openRate).format('0.00a')}</span>
                    <span style={{marginRight:100,color:'rgb(160, 160, 123)'}}>Total Reach : {numeral(totalReachSum).format('0.00a')}</span>
                </div>
            </Overlay>
        )
    }
}

