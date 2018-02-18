import * as React from "react";
import "../../public/css/global.css";

export default class ReferralAnalyticsSankeyGraphPresentation extends React.Component {
    
  componentDidMount() {
    
    var driver = new SankeyDriver();
    let that=this;
  (this.props.graphFlows && this.props.graphNodes)?(
    
    d3.json('asset/titanic-data.json', function(){

  var margin = {
    top: 0, bottom: 10, left: 0, right: 10,
  };
  var size = {
    width: (screen.width)>=990?(screen.width-420):(screen.width-50), height: 1000,
  }
  driver.prepare(d3.select("#canvas"), size, margin);
  driver.draw({
  "nodes":that.props.graphNodes,
  "flows":that.props.graphFlows
});
})):"no data";

  }

    render() {
     let headerValue="Page Views";
        switch(this.props.selectedMetricTab){
            case "pageViews":headerValue="Page Views";
                break;
            case "users":headerValue="Users";
                break;
            case "sessions":headerValue="Sessions";
                break;
            default:headerValue="Page Views";
                break;
        }
        return (
            <div style={{margin: '15px'}}>
                <div className="tablehead">
                    <h4 className="pull-left">{headerValue}</h4>
                </div>
            <div id='canvas'></div>
       </div>
      )
    }
}
