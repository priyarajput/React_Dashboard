import * as React from "react";
import {MenuItem, NavDropdown} from "@sketchpixy/rubix/lib/index";
export default class DistributionDropDownPresentation extends React.Component{

    render(){
        return(
            <NavDropdown eventKey={4} className='DistributionDropDownPresentation' bsStyle="orange45 " title={this.props.distribution.display} id="nav-dropdown-distribution" style={{fontSize:'10px'}}>
                <MenuItem style={{fontWeight:'900',color:'#a06666'}}
                    eventKey="all"
                    onClick={this.props.update.bind(this,"All",'','channel','','deviceType')}>
                    All</MenuItem>
                <MenuItem divider className='dropDownCustomDevider'/>
                <MenuItem
                    eventKey="web" style={{fontWeight:'900',color:'#a06666'}}
                    onClick={this.props.update.bind(this,"Web",'web',"channel",'','deviceType')}>
                    Web</MenuItem>
                <MenuItem eventKey="desktop" style={{marginLeft:'20px'}}
                          onClick={this.props.update.bind(this,"Desktop",'web','channel','Desktop',"deviceType")}>
                    Desktop</MenuItem>
                <MenuItem eventKey="mobile" style={{marginLeft:'20px'}}
                          onClick={this.props.update.bind(this,"Mobile",'web','channel','Mobile',"deviceType")}>
                    Mobile</MenuItem>
                <MenuItem divider className='dropDownCustomDevider'/>
                <MenuItem
                    eventKey="app" style={{fontWeight:'900',color:'#a06666'}}
                    onClick={this.props.update.bind(this,"App",'app',"channel",'','distribution')}>
                    App</MenuItem>
                <MenuItem eventKey="ios-sdk" style={{marginLeft:'20px'}}
                          onClick={this.props.update.bind(this,"iOS-SDK",'app',"channel",'iOS-SDK',"distribution")}>
                    iOS</MenuItem>
                <MenuItem eventKey="android-sdk" style={{marginLeft:'20px'}}
                          onClick={this.props.update.bind(this,"Android-SDK",'app',"channel",'Android-SDK',"distribution")}>
                    Android</MenuItem>
            </NavDropdown>
        );
    }

}
