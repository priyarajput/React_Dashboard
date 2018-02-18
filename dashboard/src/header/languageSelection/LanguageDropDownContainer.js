import * as React from "react";
import LanguageDropDown from "./LanguageDropDownPresentation";
import {connect} from "react-redux";
import {updateHeaderLanguage} from "../redux/headerCreateAction";
import {MenuItem} from "@sketchpixy/rubix/lib/index";

const mapStateToProps = (state) => {
    return {
        language: state.headerFilter.language,
        user : state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateLanguage: (data) => {
            dispatch(updateHeaderLanguage(data));
        }
    };
};

@connect(mapStateToProps,mapDispatchToProps)
export default class LanguageDropDownContainer extends React.Component{

    setOptions = () => {
        const dropDownKeys = this.props.user.languageList;
        if(dropDownKeys.indexOf("All")===-1)
            dropDownKeys.push("All");
        let rows=[];
        for (let i = 0; i < dropDownKeys.length; i++) {
            rows.push(<MenuItem key={dropDownKeys[i]} eventKey={dropDownKeys[i]}>{dropDownKeys[i]}</MenuItem>)
        }
        return rows;
    };

    updateLanguage=(language)=>{
        this.props.updateLanguage(language);
    };

    render(){
        return(
            <LanguageDropDown id="languagePreference" setOptions={::this.setOptions} language={this.props.language} update={::this.props.updateLanguage}/>
        );
    }
}