import * as React from "react";
import { connect } from "react-redux";
import {
    Button, Col, Form, FormControl, FormGroup, HelpBlock, Grid, Icon, InputGroup, Jumbotron, Panel, PanelBody, PanelContainer, Row,
    MainContainer, ControlLabel, Label
} from '@sketchpixy/rubix';

import { clearError } from "./redux/userRegistrationAction";
import { Field, reduxForm } from 'redux-form';

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type} />
            {touched && ((error && <span style={{ display: "block", color: "#af331d" }}>{error}</span>))}
        </div>
    </div>
)



const validate = values => {
    const errors = {};
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/g;

    let matchingPasswordLength = values.matchingPassword ? values.matchingPassword.length : "";
    let passwordLength = values.newPassword ? values.newPassword.length : "";


    if (!values.newPassword) {
        errors.newPassword = 'Enter new password';
    }
    if (!values.matchingPassword) {
        errors.matchingPassword = 'Enter matching password';
    }
    if (passwordLength <= 8 || !regex.test(values.newPassword)) {
        errors.newPassword = 'Invalid Password'
    }
    if (values.matchingPassword != values.newPassword && !regex.test(values.matchingPassword)) {
        errors.matchingPassword = 'Invalid Password'
    }
    return errors
};

const mapStateToProps = (state) => {
    return {
        userRegistrationData: state.userRegistrationData,
        headerFilter: state.headerFilter,
        userName: state.userRegistrationData.userDetails ? state.userRegistrationData.userDetails.name : "",
        userEmail: state.userRegistrationData.userDetails ? state.userRegistrationData.userDetails.email : "",
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        userRegistrationRequest: (token) => {
            dispatch({ type: "USER_REGISTRATION_TOKEN_WATCHER", token: token });
        },
        userRegistration: (state, email) => {
            let requestBody = {
                password: state.newPassword,
                matchingPassword: state.matchingPassword,
                email: email
            };
            dispatch({ type: "USER_REGISTRATION_WATCHER", requestBody: requestBody });
        },
        clearError: () => {
            dispatch(clearError())
        },
    }
};

@connect(mapStateToProps, mapDispatchToProps)
class UserRegistrationForm extends React.Component {

    constructor(props) {
        super(props);
        props.userRegistrationRequest(this.props.location.query.token);
        this.state = {
            isNextPage: false,
            newPassword: '',
            matchingPassword: '',
            error: false, success: false,
            isSubmittingBtn: false
        };
    }
    componentWillUpdate(nextProps) {
        if (nextProps.userRegistrationData.error != null) {
            this.setState({ error: true, isSubmittingBtn: false });
            this.props.clearError();
        } else if (nextProps.userRegistrationData.isPasswordChanged === true) {
            this.setState({ success: true, isSubmittingBtn: false });
            this.props.clearError();
        }
    }


    updateStateNewPassword = (data) => {
        this.setState({ newPassword: data.target.value })
    };

    updateStateMatchingPassword = (data) => {
        this.setState({ matchingPassword: data.target.value })
    };

    handlerSubmitForm = (e, values) => {
        this.setState({ error: false, success: false, isSubmittingBtn: true });
        this.props.userRegistration(this.state, this.props.userEmail);

    }

    handlerNextPage() {
        this.setState({ isNextPage: true });
    }

    handlerPreviousPage() {
        this.setState({ isNextPage: false });
    }

    render() {
        const { handleSubmit, pristine, submitting, initialValues } = this.props;
        return (
            <div>
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
                                                                        <p className='verifyEmailTextForgetPassword' style={{ marginTop: "60px", marginBottom: "60px" }}> The password has been created successfully. Please <a href="/login" style={{ color: 'white' }}>login</a> using the new password.</p>

                                                                    </div>
                                                                }

                                                                {!this.state.success && <div>

                                                                    {!this.state.isNextPage && <div>
                                                                        <div style={{ padding: 25, paddingTop: 0, paddingBottom: 0, margin: 'auto', marginBottom: 25, marginTop: 25 }}>

                                                                            <Form >

                                                                                <FormGroup className='inputPassword' controlId='userName'>
                                                                                    <InputGroup bsSize='large'>
                                                                                        <Col sm={4}>
                                                                                            <ControlLabel>Name</ControlLabel>
                                                                                        </Col>
                                                                                        <Col sm={8} >
                                                                                            <FormControl type='input' disabled name="userName" className='border-focus-blue'
                                                                                                value={this.props.userName} />
                                                                                        </Col>
                                                                                    </InputGroup>
                                                                                </FormGroup>

                                                                                <FormGroup className='inputPassword' controlId='email'>
                                                                                    <InputGroup bsSize='large'>
                                                                                        <Col sm={4}>
                                                                                            <ControlLabel>Email-id</ControlLabel>
                                                                                        </Col>
                                                                                        <Col sm={8} >
                                                                                            <FormControl type='input' disabled name="email" className='border-focus-blue'
                                                                                                value={this.props.userEmail} />
                                                                                        </Col>
                                                                                    </InputGroup>
                                                                                </FormGroup>
                                                                                <FormGroup>
                                                                                    <Grid>
                                                                                        <Row>
                                                                                            <Col collapseLeft collapseRight className='text-right' >
                                                                                                <Button className='btnLoginForgetPassword' lg type='button' bsStyle='blue' onClick={::this.handlerNextPage}>Next
                                                                                                
                                                                                            </Button>
                                                                                        </Col>
                                                                                            </Row>
                                                                                            </Grid>
                                                                                        </FormGroup>
                                                                            </Form>
                                                                    </div>
                                                                    </div>}
                                                                    {this.state.isNextPage && <div>

                                                                        <p className='changePasswordText'>Create Password</p>
                                                                        <div style={{ padding: 25, paddingTop: 0, paddingBottom: 0, margin: 'auto', marginBottom: 25, marginTop: 25 }}>
                                                                            <form onSubmit={handleSubmit(this.handlerSubmitForm)}>
                                                                                <HelpBlock className='passwordHint'>Note : Password must contain minimum 8 characters at least 1 Uppercase Alphabet, 1 Lowercase Alphabet, 1 Number and 1 Special Character.</HelpBlock>
                                                                                <Row style={{ margin: "10px" }}>
                                                                                    <Field name="newPassword" component={renderField} type="password"
                                                                                        placeholder='Enter new password' onChange={::this.updateStateNewPassword} style={{ width: '100%' }} />

                                                                                </Row>
                                                                                <Row style={{ margin: "10px" }}>
                                                                                    <Field name="matchingPassword" component={renderField} type="password"
                                                                                        placeholder='Re-enter new password' onChange={::this.updateStateMatchingPassword}  style={{ width: '100%' }} />

                                                                                </Row>

                                                                                <Row style={{ margin: "10px" }}>
                                                                                    <Col sm={2} />
                                                                                    <Col sm={10}>
                                                                                        <Button className='btnLoginForgetPassword' style={{ marginRight: "15px" }} lg type='button' bsStyle='blue' onClick={::this.handlerPreviousPage}>Previous</Button>
                                                                                    <Button className='btnLoginForgetPassword' lg type='submit' bsStyle='blue'>Submit</Button>

                                                                            </Col>
                                                                        </Row>
                                                                    </form>
                                                                    </div>
                                                                  </div>}
                                                                </div>
                                                                }




                                                            </PanelBody>
                                                        </Panel>
                                                    </PanelContainer>
                                                </Col>
                                            </Row>
                                        </Grid >
                                    </Row >
                                </Col >
                            </Row >
                        </Grid >
                    </div >
                </MainContainer >
            </div>
        )
    };
}


export default reduxForm({
    form: 'userRegistration',
    validate
})(UserRegistrationForm);
