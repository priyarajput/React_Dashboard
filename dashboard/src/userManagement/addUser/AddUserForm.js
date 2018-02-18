import * as React from "react";
import { connect } from "react-redux";
import { Panel, Row, PanelBody, ButtonGroup, Form, FormGroup, Button, Col, Checkbox, ControlLabel, FormControl } from "@sketchpixy/rubix/lib/index";

import ModalPresentation from "./ModalPresentation";
import { Field, reduxForm } from 'redux-form';

import { clearError } from "./redux/addUserAction";

const validate = values => {
    const errors = {};
    let pattern = /(\w+)\@(\w+)\.[a-zA-Z]/g;
    if (!values.name) {
        errors.name = 'Enter User name';
    }
    if (!values.email) {
        errors.email = 'Enter User email-id';
    }
    if (values.email && !pattern.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if (!values.roles || values.roles.roles.length < 1) {
        errors.roles = 'Select at least one role';
    }
    return errors
};

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type} className="inputBox" style={{ width: '80%' }} />
            {touched && ((error && <span style={{ display: "block", color: "#af331d" }}>{error}</span>))}
        </div>
    </div>
)

const mapStateToProps = (state) => {
    return {
        addUserData: state.addUserData,
        showModal: state.addUserData.showModal,
        isRedirect: state.addUserData.isRedirect,
        isLoading: state.addUserData.isLoading,
        headerFilter: state.headerFilter,
        roleMapList: [
            { value: 'notificationManager', label: 'Notification Manager' },
            { value: 'cmsAnalyst', label: 'Cms Analyst' },
            { value: 'performanceManager', label: 'Performance Manager' },
            { value: 'userManager', label: 'User Admin' }
        ]
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

        addUser: (data, headerFilter) => {
            dispatch({
                type: "ADD_USER_WATCHER",
                data: data,
                headerFilter: headerFilter
            });
        },
        clearError: () => {
            dispatch(clearError())
        }
    }
};

var CheckBoxList = require('react-checkbox-list');
@connect(mapStateToProps, mapDispatchToProps)
class AddUserForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            roles: props.roleMapList,
            rolesList: [],
            showModal: props.showModal,
            isSubmit: false, textError: ""
        };
    }

    closeModal() {
        this.setState({ showModal: false, isSubmit: false, textError: "" })
        if (this.props.isRedirect) {
            this.props.router.push('/userManagement');
        }
        this.props.clearError();
    }

    updateStateName = (data) => {
        this.setState({ name: data.target.value })
    };

    updateStateEmail = (data) => {
        this.setState({ email: data.target.value })
    };

    handlerSubmitForm = (e, values) => {
        let data = {
            name: this.state.name,
            email: this.state.email,
            roles: this.state.rolesList,
            active: true
        }
        this.props.addUser(data, this.props.headerFilter);
        this.setState({ isSubmit: true, textError: "" })
    }

    componentWillUpdate(nextProps) {
        if (nextProps.addUserData.addUserAPISuccess === true) {
            this.setState({ showModal: true, isSubmit: false, textError: nextProps.addUserData.addUserAPIError });
            this.props.clearError();
        } 
        else if (nextProps.addUserData.addUserAPIError !== null) {
            if (nextProps.addUserData.addUserAPIError === "error") {
                this.setState({ isSubmit: false });   
                this.props.clearError();
            } else {
                this.setState({ showModal: true, isSubmit: false, textError: nextProps.addUserData.addUserAPIError });
                this.props.clearError();
            }
        }
    }

    handleCheckboxListChange = (data, formEvent) => {

        var selectedValues = [];
        this.state.roles.forEach(function (item) {
            if (item.value === data) {
                item.checked = true;
            }
            if (item.checked) {
                selectedValues.push(item.value);
            }
        });
        this.setState({ rolesList: data });
        formEvent.onChange({ roles: selectedValues });
        this.props.touch("checkBox");
    }

    renderCheckboxTag = (formEvent) => {
        return (
            <div className="checkBoxList">
                <CheckBoxList defaultData={formEvent.data}
                    onChange={(e) => this.handleCheckboxListChange(e, formEvent.input)} value={this.state.roles} />
                {formEvent.meta.touched && formEvent.meta.error && <span className="error">{formEvent.meta.error}</span>}
            </div>
        )
    };

    render() {
        const { handleSubmit, pristine, submitting } = this.props;
        return (
            <div>
                {this.state.showModal &&
                    <ModalPresentation isRedirect={this.props.isRedirect}
                        textError={this.state.textError} showModal={this.state.showModal} close={::this.closeModal}/>
                }
                <Panel className="tablehead" style={{ padding: "0px" }}>
                    <h3 style={{ padding: "15px" }}>Add User</h3>
                    <PanelBody style={{ backgroundColor: "#283232", padding: "20px", minHeight: 450 }}>
                        <form onSubmit={handleSubmit(this.handlerSubmitForm)}>
                            <Row style={{ margin: "10px", marginBottom: "30px", marginTop: "20px" }}>
                                <Col sm={2}>Name</Col>
                                <Col sm={5}>
                                    <Field name="name" component={renderField} type="text"
                                        onChange={::this.updateStateName}  />
                                </Col>
                            </Row>
                            <Row style={{ margin: "10px", marginBottom: "30px" }}>
                                <Col sm={2}>Email Id</Col>
                                <Col sm={5}>
                                    <Field name="email" component={renderField} type="email"
                                        onChange={::this.updateStateEmail} />
                                </Col>
                            </Row>

                            <Row style={{ margin: "10px", marginBottom: "30px" }}>
                                <Col sm={2}>Role</Col>
                                <Col sm={5}>
                                    <Field name="roles" type="checkBox" component={::this.renderCheckboxTag}
                                           data={this.state.roles}
                                    />
                                </Col>
                            </Row>

                            <Row style={{ margin: "10px" }}>
                                <Col sm={2} />
                                <Col sm={10}>
                                    <ButtonGroup>
                                        <Button bsSize="large" type="submit" bsStyle="primary"
                                            disabled={this.state.isSubmit} >Submit</Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                        </form>
                    </PanelBody>
                </Panel>
            </div>
        )
    };
}


export default reduxForm({
    form: 'addUser',
    validate
})(AddUserForm);
