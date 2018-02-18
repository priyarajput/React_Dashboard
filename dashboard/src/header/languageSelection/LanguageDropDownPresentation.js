import * as React from "react";
import {MenuItem, NavDropdown} from "@sketchpixy/rubix/lib/index";
export default class LanguageDropDown extends React.Component{

    render(){
        return(
            <NavDropdown className='languageDropDown' eventKey={4} title={this.props.language?this.props.language:'All'} id="nav-dropdown-language" onSelect={this.props.update}>
                {this.props.setOptions()}
            </NavDropdown>
        );
    }

}