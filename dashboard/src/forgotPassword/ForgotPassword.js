
import React from 'react';
import { Link } from 'react-router';
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
import { connect } from "react-redux";


import { clearForgotError } from "./redux/forgotPasswordAction";

const mapStateToProps = (state) => {
    return {
        forgotPasswordData: state.forgotPasswordData
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        forgotPasswordRequest: (email) => {
            dispatch({ type: "FORGOT_PASSWORD_WATCHER", email: email })
        },
        clearForgotError: () => {
            dispatch(clearForgotError())
        }
    }
};

@connect(mapStateToProps, mapDispatchToProps)

export default class ForgotPassword extends React.Component {

    changeUsername = (evt) => {
        this.setState({
            username: evt.target.value
        });
    };

    componentDidMount() {
        $('html').addClass('authentication');
    }

    componentWillUnmount() {
        $('html').removeClass('authentication');
    }

    submit(e) {
        e.preventDefault();
        if (this.validate() === 'success') {
            this.setState({ isSubmit: true, textError: "" })
            this.props.forgotPasswordRequest(this.state.username);
        }
    }
    componentWillUpdate(nextProps) {
        if (nextProps.forgotPasswordData.forgotAPISuccess === true) {
            this.setState({ success: true, isSubmit: false, textError: "An email has been sent to your registered account. Please click on the link provided in email to reset your password", errorColor: "#21c921" });
            this.props.clearForgotError();
        } else if (nextProps.forgotPasswordData.forgotAPIError !== null) {
            this.setState({ failure: true, isSubmit: false, textError: nextProps.forgotPasswordData.forgotAPIError, errorColor: "#d8e057" });
            this.props.clearForgotError();
        }
    }
    constructor(props) {
        super(props);
        this.state = { username: '', isSubmit: false, textError: "", errorColor: "" };
    }

    validate() {
        let email = this.state.username;
        let pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/;
        return (pattern.test(email)) ? 'success' : (email.length > 0) ? 'error' : null;
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

                                    <Grid style={{ alignContent: "center", padding: "50px" }}>
                                        <Row>
                                            <Col sm={4} smOffset={4} xs={10} xsOffset={1} collapseLeft collapseRight>
                                                <PanelContainer className='panelBGForgetPassword' controls={false}>
                                                    <Panel>
                                                        <PanelBody style={{ padding: 0 }}>
                                                             <Jumbotron className='newLoginHeaderForgetPassword'
                                                                       style={{alignItems: "center"}}>
                                                                <div className='newLoginLogoForgetPassword'>
                                                                    <img src='/imgs/common/logoLogin.png'
                                                                         alt='piStats'/>
                                                                </div>
                                                                </Jumbotron>
                                                                 <p className='verifyEmailTextForgetPassword'>Verify email ID</p>
                                                            <div>

                                                                <div style={{
                                                                    padding: 25,
                                                                    paddingTop: 0,
                                                                    paddingBottom: 0,
                                                                    margin: 'auto',
                                                                    marginBottom: 25,
                                                                    marginTop: 25
                                                                }}>
                                                                    <Form onSubmit={::this.submit}>
                                                                        <FormGroup controlId='emailaddress'  className='inputEmailForgetPassword'
                                                                        validationState={::this.validate()}>
                                                                            <InputGroup bsSize='large'>
                                                                        <FormControl autoFocus type='email'
                                                                            className='border-focus-blue'
                                                                            placeholder='email'
                                                                            value={this.state.username}
                                                                            onChange={::this.changeUsername}/>
                                                                                <FormControl.Feedback
                                                                            style={{ paddingTop: "10px" }} /></InputGroup>
                                                                        </FormGroup>

                                                                <FormGroup>
                                                                    <Grid>
                                                                        <Row>
                                                                            <Col collapseLeft collapseRight
                                                                                className='text-right'>
                                                                                <Button lg type='submit' className='btnLoginForgetPassword' disabled={this.state.isSubmit}
                                                                                    bsStyle='blue'
                                                                                    onClick={::this.submit}>Submit</Button>
                                                                                    </Col>
                                                                                </Row>
                                                                            </Grid>
                                                                        </FormGroup>
                                                                        <div className='loginErrorMessageForgetPassword'>
                                                            <span style={{  color: this.state.errorColor, fontSize: "150%" }}>
                                                                {this.state.textError} 
                                                            </span></div>
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
                    </Grid >
                </div >
            </MainContainer >
        );
    }
}
