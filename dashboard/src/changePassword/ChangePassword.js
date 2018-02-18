

import React from 'react';
import { Link } from 'react-router';
import {
    Button,
    Col,
    Form,
    FormControl,
    FormGroup,
    HelpBlock,
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
import { connect } from "react-redux";

import { clearError } from "./redux/changePasswordAction";

const mapStateToProps = (state) => {
    return {
        changePasswordData: state.changePasswordData
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changePasswordRequest: (token) => {
            dispatch({ type: "CHANGE_PASSWORD_TOKEN_WATCHER", token: token });
        },
        clearError: () => {
            dispatch(clearError())
        },
        changePasswordSubmit: (state, email) => {
            let requestBody = {
                password: state.newPassword,
                matchingPassword: state.matchingPassword,
                email: email
            };
            dispatch({ type: "CHANGE_PASSWORD_WATCHER", requestBody: requestBody })
        }
    }
};

@connect(mapStateToProps, mapDispatchToProps)

export default class ChangePassword extends React.Component {

    componentDidMount() {
        $('html').addClass('authentication');
    }

    componentWillUnmount() {
        $('html').removeClass('authentication');
    }

    constructor(props) {
        super(props);
        props.changePasswordRequest(this.props.location.query.token);
        this.state = { newPassword: '', matchingPassword: '', error: false, success: false, isSubmittingBtn: false };

    }
    componentWillUpdate(nextProps) {
        if (nextProps.changePasswordData.error != null) {
            this.setState({ error: true, isSubmittingBtn: false });
            this.props.clearError();
        } else if (nextProps.changePasswordData.isPasswordChanged === true) {
            this.setState({ success: true, isSubmittingBtn: false });
            this.props.clearError();
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    validatePassword(type) {
        let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/g
        switch (type) {
            case 'password':
                const password = this.state.newPassword;
                const passwordLength = password.length;
                return (passwordLength >= 8 && regex.test(password)) ? 'success' : (passwordLength > 0) ? 'error' : null;
                break;

            case 'matchingPassword':
                const matchingPassword = this.state.matchingPassword;
                const matchingPasswordLength = matchingPassword.length;
                return (matchingPasswordLength >= 8 && regex.test(matchingPassword) && matchingPassword == this.state.newPassword) ? 'success' : (matchingPasswordLength > 0) ? 'error' : null;
                break;
        }
    }

    changePassword(e) {
        e.preventDefault();
        if (this.state.newPassword.length > 0 && this.state.matchingPassword.length > 0
            && this.validatePassword('password') == 'success' && this.validatePassword('matchingPassword') == 'success') {
            this.setState({ error: false, success: false, isSubmittingBtn: true });
            this.props.changePasswordSubmit(this.state, this.props.changePasswordData.email);
        }
    }


    render() {
        if (this.state.error || !this.props.location.query.token) {
            return (
                <MainContainer {...this.props}>
                    <div id='body' style={{
                        padding: 0,
                        background: "black",
                    }}>
                        <Grid style={{ alignContent: "center", padding: "50px" }}>
                            <Row>
                                <Col sm={4} smOffset={4} xs={10} xsOffset={1} collapseLeft collapseRight>
                                    <PanelContainer className='panelBGForgetPassword' controls={false}>
                                        <Panel>
                                            <PanelBody style={{ padding: 0 }}>
                                                <Jumbotron className='newLoginHeaderForgetPassword'
                                                    style={{ alignItems: "center" }}>
                                                    <div className='newLoginLogoForgetPassword'>
                                                        <img src='/imgs/common/logoLogin.png'
                                                            alt='piStats' />
                                                    </div>
                                                </Jumbotron>
                                                <p className='verifyEmailTextForgetPassword' style={{ marginTop: "60px", marginBottom: "60px" }}> Your token has been expired. Please click <a href="/forgotPassword" style={{ color: 'white' }}>here</a> to generate new token.</p>
                                                <div>
                                                </div>
                                            </PanelBody>
                                        </Panel>
                                    </PanelContainer>
                                </Col>
                            </Row >
                        </Grid >
                    </div>
                </MainContainer>
            );
        }
        else {

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

                                        <Grid style={{ alignContent: "center", padding: "50px" }}>

                                            <Row>
                                                <Col sm={4} smOffset={4} xs={10} xsOffset={1} collapseLeft collapseRight>
                                                    <PanelContainer className='panelBGChangePassword' controls={false}>
                                                        <Panel>
                                                            <PanelBody style={{ padding: 0 }}>
                                                                <Jumbotron className='newLoginHeaderForgetPassword'
                                                                    style={{ alignItems: "center" }}>
                                                                    <div className='newLoginLogoForgetPassword'>
                                                                        <img src='/imgs/common/logoLogin.png'
                                                                            alt='piStats' />
                                                                    </div>
                                                                </Jumbotron>
                                                                {this.state.success &&
                                                                    <div>
                                                                        <p className='verifyEmailTextForgetPassword' style={{ marginTop: "60px", marginBottom: "60px" }}> The password has been changed successfully. Please <a href="/login" style={{ color: 'white' }}>login</a> using the new password.</p>

                                                                    </div>
                                                                }

                                                                {!this.state.success && <div>
                                                                    <p className='changePasswordText'>Change Password</p>
                                                                    <div style={{ padding: 25, paddingTop: 0, paddingBottom: 0, margin: 'auto', marginBottom: 25, marginTop: 25 }}>
                                                                        <Form onSubmit={::this.changePassword}>
                                                                                <HelpBlock className='passwordHint'>Note : Password must contain minimum 8 characters at least 1 Uppercase Alphabet, 1 Lowercase Alphabet, 1 Number and 1 Special Character.</HelpBlock>
                                                                        <FormGroup className='inputPassword' controlId='password' validationState={::this.validatePassword("password")}>
                                                                                        <InputGroup bsSize='large'>

                                                                            <FormControl type='password' name="newPassword" className='border-focus-blue' placeholder='Enter new password'
                                                                                value={this.state.newPassword} onChange={::this.handleInputChange}/>
                                                                                        </InputGroup>
                                                                                    </FormGroup>
                                                                    <FormGroup className='inputPassword' controlId='re-enterPassword' validationState={::this.validatePassword('matchingPassword')}>
                                                                                        <InputGroup bsSize='large'>

                                                                        <FormControl type='password' name="matchingPassword" className='border-focus-blue' placeholder='Re-enter new password'
                                                                            value={this.state.matchingPassword} onChange={::this.handleInputChange}/>
                                                                                         </InputGroup>
                                                                                    </FormGroup>
                                                                    <FormGroup>
                                                                        <Grid>
                                                                            <Row>
                                                                                <Col collapseLeft collapseRight
                                                                                    className='text-right' >
                                                                                    <Button className='btnLoginForgetPassword' lg type='submit' bsStyle='blue' onClick={::this.changePassword}>Submit</Button>
                                                                                                </Col>
                                                                                            </Row>
                                                                                            </Grid>
                                                                                        </FormGroup>
                                                                                </Form>
                                                                            </div>
                                                                            </div>
                                                    }
                                                                        </PanelBody>
                                                                        </Panel>
                                                                    </PanelContainer>
                                                              </Col>
                                                   </Row>
                                                </Grid >
                                             </Row >
                                            </Col>
                                       </Row >
                                    </Grid >
                                  </div >
                         </MainContainer >
            );
        }
    }
}
