import React from 'react';

import {Col, Grid, Icon, Nav, Navbar, NavItem, Row, SidebarBtn} from '@sketchpixy/rubix';
import HeaderDateSelectionContainer from "../header/datetabs/HeaderDateSelectionContainer";
import LanguageDropDownContainer from "../header/languageSelection/LanguageDropDownContainer";
import {logout} from "../login/redux/loginAction";
import {connect} from "react-redux";
import DistributionDropDownContainer from "../header/distributionSelection/DistributionDropDownContainer";

class Brand extends React.Component {
    render() {
        return (
            <Navbar.Header {...this.props}>
                <Navbar.Brand tabIndex='-1'>
                    <a href='#'>
                        <img src='/imgs/common/logo.png' alt='piStats' width='111' height='28'/>
                    </a>
                </Navbar.Brand>
            </Navbar.Header>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(logout());
        }
    }
};

@connect(mapStateToProps, mapDispatchToProps)
class HeaderNavigation extends React.Component {
    logout=()=> {
        let Auth = document.cookie.replace(/(?:(?:^|.*;\s*)Auth\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        document.cookie = 'Auth' + '=' + Auth + ';expires=Thu, 01 Jan 1969 00:00:01 GMT;';
        localStorage.removeItem('user');
        this.props.history.router.push('/login');
        this.props.logout();
    };

    render() {
        return (
            <Nav pullRight>
                <Nav>
                    <NavItem className='logout' href='#'>
                        <Icon bundle='fontello' glyph='off-1'  onClick={::this.logout}/>
                    </NavItem>
                </Nav>
            </Nav>
        );
    }
}

export default class Header extends React.Component {
    render() {
        return (
            <Grid id='navbar' {...this.props}>
                <Row>
                    <Col xs={24}>
                        <Navbar fixedTop fluid id='rubix-nav-header'>
                            <Row>
                                <Col xs={3} visible='xs'>
                                    <SidebarBtn />
                                </Col>
                                <Col xs={6} sm={4}>
                                    <Brand />
                                </Col>
                                <Col xs={3} sm={8} collapseRight className='text-right'>
                                    <HeaderNavigation history={this.props.history}/>
                                </Col>
                            </Row>
                            <Row>
                            <Nav bsStyle="pills" className='nav-orange45' activeKey={1}>
                                <DistributionDropDownContainer/>
                                <HeaderDateSelectionContainer/>
                                <LanguageDropDownContainer/>
                            </Nav>
                            </Row>
                        </Navbar>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
