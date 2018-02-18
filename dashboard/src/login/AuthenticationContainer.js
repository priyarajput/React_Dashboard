import React from "react";
import {connect} from "react-redux";
import {Col, Grid, MainContainer, Row} from "@sketchpixy/rubix";
import Header from "../common/header";
import Sidebar from '../common/sidebar';
import {authenticated, loginSuccess, setRedirectUrl, updateUserData} from "./redux/loginAction";
import _ from 'lodash';
import { push } from 'react-router-redux';
import { browserHistory } from 'react-router';

const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.user ? state.user.isLoggedIn : false,
        currentURL: ownProps.location.pathname
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        authenticated: (isAuthenticated) => {
            dispatch(authenticated(isAuthenticated));
        },
        updateUserData: (user) => {
            dispatch(updateUserData(user))
        },
        setRedirectUrl: (url) => {
            dispatch(setRedirectUrl(url))
        },
        isLoggedInAction: (loginData) => {
            dispatch({type: "IS_LOGGED_IN", loginData: loginData})
        },
        updateLogin:(user,currentUrl)=>{
            dispatch(loginSuccess(user,currentUrl))
        },
        routeEndpoint: (endpoint) => {
            browserHistory.push(endpoint);
            dispatch(push(endpoint));
        }
    };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class AuthenticationContainer extends React.Component {

    authAndRoute=(props)=>{
        let localStorageUser=JSON.parse(localStorage.getItem('user'));
        if(!localStorageUser) return false;
        let userRole=localStorageUser.propertyRoleMap[Object.keys(localStorageUser.propertyRoleMap)[0]];
        let routeAllowedRoles=props.children.props.route.authorize;
        if((routeAllowedRoles && userRole && _.intersection(routeAllowedRoles, userRole).length === 0) || !userRole){
            return false
        }
        return true;
    };

    componentWillMount() {
        const {currentURL} = this.props;
        let user= localStorage.getItem('user');
        if (!user) {
            let hash = document.cookie.replace(/(?:(?:^|.*;\s*)Auth\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            if (hash)
                this.props.isLoggedInAction({
                    authHash: hash,
                    history: this.props,
                    onSuccessRedirect: currentURL,
                    onFailureRedirect: "/login"
                });
            else{
                this.props.router.push('/login');
            }
        }
        else{
            if(document.cookie){
                this.props.updateLogin(JSON.parse(user),this.props.currentURL);
            }else{
                this.props.router.push('/login');
            }
        }
             
        if (!this.authAndRoute(this.props) && user) {
            let localStorageUser=JSON.parse(user);
            let userRoleArray=localStorageUser.propertyRoleMap[Object.keys(localStorageUser.propertyRoleMap)[0]];
            
            if (userRoleArray.indexOf("performanceManager") !== -1) {
                this.props.router.push('/dashboard');
            } else if (userRoleArray.indexOf("cmsAnalyst") !== -1) {
                this.props.router.push('/cmsAnalytics/authors');
            } else if (userRoleArray.indexOf("notificationManager") !== -1) {
                this.props.router.push('/piStats/pushNotifications/list');
            } else if (array.indexOf("userManager") !== -1) {
                action.authHash.history.router.push('/userManagement');
            } else {
                this.props.router.push('/notAuthorized');
            }
        }

    };

    render() {
        let hash = document.cookie.replace(/(?:(?:^|.*;\s*)Auth\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        let user= localStorage.getItem('user');
        let parsedUser;
        if(hash && user) {
            parsedUser = JSON.parse(user);
        }
        return <MainContainer {...this.props}>
            <Sidebar user={parsedUser}/>
            <Header history={this.props}/>
            <div id='body'>
                <Grid>
                    <Row>
                        <Col xs={12}>
                            {this.props.children}
                        </Col>
                    </Row>
                </Grid>
            </div>
        </MainContainer>;
    }
}