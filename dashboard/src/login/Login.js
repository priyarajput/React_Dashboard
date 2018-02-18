import React from 'react';
import {Link} from 'react-router';
import base64 from 'base-64';
import numeral from 'numeral';

import {
    Button,
    Col,
    Form,
    FormControl,
    FormGroup,
    Grid,
    Icon,
    InputGroup,
    Jumbotron,
    Panel,
    PanelBody,
    PanelContainer,
    Row,
    MainContainer,
    Label
} from '@sketchpixy/rubix';
import {connect} from "react-redux";
import {loginAttempt, loginError, loginSuccess} from "./redux/loginAction";

const mapStateToProps = (state) => {
    return {
        user: state.user,
        pageViews: state.siteData.pageViews
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginError: (error) => {
            dispatch(loginError(error))
        },
        loginSuccess: (json, redirectUrl) => {
            dispatch(loginSuccess(json, redirectUrl))
        },
        loginAttempt: (authHash, redirectUrl, history) => {
            dispatch(loginAttempt(authHash, redirectUrl, history))
        },
        getPageviews: () => {
            dispatch({type: "PAGE_VIEWS_ALL_NUMBERS"})
        }
    }
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Login extends React.Component {

    changeUsername = (evt) => {
        this.setState({
            username: evt.target.value
        });
    };

    componentDidMount() {
        this.props.getPageviews();
        $('html').addClass('authentication');
    }

    componentWillUnmount() {
        $('html').removeClass('authentication');
    }

    loginRequest = (e) => {
        e.preventDefault();
        if (this.validate('Email') === 'success' && this.validate('Password') === 'success') {
            let username = this.state.username;
            let password = this.state.password;
            const hash = new Buffer(`${username}:${password}`).toString('base64');
            const authHash = `Basic ${hash}`;
            this.props.loginAttempt({
                authHash: authHash,
                redirectUrl: this.props.user.redirectUrl,
                history: this.props
            });
        }
    };

    changePassword(evt) {
        this.setState({
            password: evt.target.value
        });
    }

    constructor(props) {
        super(props);
        this.state = {username: '', password: ''};
    }

    validate(type) {
        switch (type) {
            case 'Email':
                let email = this.state.username;
                let pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/;
                return (pattern.test(email)) ? 'success' : (email.length > 0) ? 'error' : null;
                break;

            case 'Password':
                let length = this.state.password.length;
                return (length >= 8) ? 'success' : (length > 0) ? 'error' : null;
                break;
        }
    }

    render() {
        return (
            <MainContainer {...this.props}>
                <div id='body' style={{
                    padding: 0,
                    background: "black",
                }}>
                    <Grid>
                        <Row>
                            <Col xs={12}>
                                <Row style={{
                                    alignItems: "center",
                                    background: "black",
                                    display: "table",
                                    width: "100%",
                                    height: "100vh"

                                }}>
                                    <Grid style={{alignContent: "center", padding: "50px"}}>
                                        <Row>
                                            <Col sm={4} smOffset={4} xs={10} xsOffset={1} collapseLeft collapseRight>
                                                <PanelContainer className='panelBG' controls={false}>
                                                    <Panel>
                                                        <PanelBody style={{padding: 0}}>
                                                            <Jumbotron className='newLoginHeader'
                                                                       style={{alignItems: "center"}}>
                                                                <div className='newLoginLogo'>
                                                                    <img src='/imgs/common/logoLogin.png'
                                                                         alt='piStats'/>
                                                                </div>
                                                                <span>
                                                                    <div className='labelPageViewValue'>
                                                                        <h2>{this.props.pageViews ? numeral(this.props.pageViews).format('0,0') : ''}</h2>
                                                                    </div>
                                                                    <h4>events processed and counting...</h4>
                                                                </span>
                                                                <p><Link className='btnLearnMoreLoginPage'
                                                                         href="http://pistats.readthedocs.io/en/master/">Learn
                                                                    more</Link></p>
                                                            </Jumbotron>
                                                            <div>
                                                                <p className='signInText'>Sign in to <b>piStats</b></p>
                                                                <div style={{
                                                                    padding: 25,
                                                                    paddingTop: 0,
                                                                    paddingBottom: 0,
                                                                    margin: 'auto',
                                                                    marginBottom: 25,
                                                                    marginTop: 25
                                                                }}>
                                                                    <Form onSubmit={::this.loginRequest}>
                                                                        <FormGroup className='inputEmail'
                                                                                   controlId='emailaddress'
                                                                                   validationState={::this.validate('Email')}>
                                                                            <InputGroup bsSize='large'>
                                                                                <FormControl autoFocus type='email'
                                                                                             className='border-focus-blue'
                                                                                             placeholder='email'
                                                                                             value={this.state.username}
                                                                                             onChange={::this.changeUsername}/>
                                                                                <FormControl.Feedback
                                                                                    style={{paddingTop: "10px"}}/></InputGroup>
                                                                        </FormGroup>

                                                                        <FormGroup className='inputPassword'
                                                                                   controlId='password'
                                                                                   validationState={::this.validate('Password')}>
                                                                            <InputGroup bsSize='large'>
                                                                                <FormControl type='password'
                                                                                             className='border-focus-blue'
                                                                                             placeholder='password'
                                                                                             value={this.state.password}
                                                                                             onChange={::this.changePassword}/>

                                                                                <FormControl.Feedback
                                                                                    style={{paddingTop: "10px"}}/></InputGroup>
                                                                        </FormGroup>
                                                                        <FormGroup>
                                                                            <Grid>
                                                                                <Row>
                                                                                    <Col xs={6} collapseLeft
                                                                                         collapseRight
                                                                                         style={{paddingTop: 10}}>
                                                                                        <Link to="/forgotPassword">Forgot
                                                                                            Password</Link>
                                                                                    </Col>
                                                                                    <Col collapseLeft collapseRight
                                                                                         className='text-right'>
                                                                                        <Button lg type='submit'
                                                                                                className='btnLogin'
                                                                                                onClick={::this.loginRequest}>Login</Button>
                                                                                    </Col>
                                                                                </Row>
                                                                            </Grid>
                                                                        </FormGroup>
                                                                        <div className='loginErrorMessage'>
                                                                            <span>
                                                                                    {this.props.user.error}
                                                                            </span>
                                                                        </div>
                                                                    </Form>
                                                                </div>
                                                            </div>
                                                        </PanelBody>
                                                    </Panel>
                                                </PanelContainer>
                                            </Col>
                                        </Row >
                                    </Grid >
                                </Row >
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </MainContainer>
        );
    }
}
