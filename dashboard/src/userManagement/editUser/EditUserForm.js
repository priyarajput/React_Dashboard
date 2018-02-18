
import * as React from "react";
import { connect } from "react-redux";
import { Panel, Row, PanelBody, ButtonGroup, Form, FormGroup, Button, Col, Checkbox, ControlLabel, FormControl } from "@sketchpixy/rubix/lib/index";

import ModalPresentation from "./ModalPresentation";
import { Field, reduxForm } from 'redux-form';

import { clearError, editUser } from "./redux/editUserAction";

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
        errors.email = 'Invalid email address';
    }
    return errors
};

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
        <label>{label}</label>
        <div>
            <input disabled={type === 'email' ? true : false} {...input} placeholder={label} type={type} className="inputBox" style={{ width: '80%' }} />
            {touched && ((error && <span style={{ display: "block", color: "#af331d" }}>{error}</span>))}
        </div>
    </div>
)

const mapStateToProps = (state) => {
    let updateData = getDataRoleList(state.userListData, state.editUserData.userId);
    return {
        propertyId:state.user.propertyId,
        userId: state.editUserData.userId,
        editUserData: state.editUserData,
        showModal: state.editUserData.showModal,
        isRedirect: state.editUserData.isRedirect,
        isLoading: state.editUserData.isLoading,
        headerFilter: state.headerFilter,
        updatedRoleList: updateData.roleMapList,
        updateList: updateData.update,
        userActive: updateData.userActive,
        mappingList: updateData.mappingList,

    }
};

const mapDispatchToProps = (dispatch) => {
    return {

        editUserRequest: (id) => {
            dispatch(editUser(id));
        },
        getUserList: (headerFilter) => {
            dispatch({
                type: "USER_LIST_DATA_UPDATE_WATCHER",
                headerFilter: headerFilter
            });
        },
        editUser: (data, headerFilter, email, active) => {
            dispatch({
                type: "EDIT_USER_WATCHER",
                data: data,
                headerFilter: headerFilter,
                email: email,
                active: active
            });
        },
        clearError: () => {
            dispatch(clearError())
        }
    }
};

var CheckBoxList = require('react-checkbox-list');
@connect(mapStateToProps, mapDispatchToProps)

class EditUserForm extends React.Component {

    constructor(props) {
        super(props);
        props.editUserRequest(this.props.params.id);
        this.state = {
            name: '',
            email: '',
            roles: props.updatedRoleList,
            rolesList: props.mappingList,
            showModal: props.showModal, statusErrorText: "",
            isSubmit: false, textError: "", updateRoleList: true, activeUser: props.userActive
        };
    }

    componentWillMount() {
        this.props.getUserList(this.props.headerFilter);
    }

    componentWillUpdate(nextProps) {
        if (this.state.updateRoleList && nextProps.updateList) {
            this.setState({
                updateRoleList: false, roles: this.props.updatedRoleList,
                activeUser: this.props.userActive, rolesList: this.props.mappingList
            });
        }
        if (nextProps.editUserData.editUserAPISuccess === true) {
            this.setState({ showModal: true, isSubmit: false, textError: nextProps.editUserData.editUserAPIError });
            this.props.clearError();
        } else if (nextProps.editUserData.editUserAPIError !== null) {
            if (nextProps.editUserData.isRedirect !== true) {
                this.setState({ isSubmit: false });
            } else {
                this.setState({
                    showModal: true, isSubmit: false, textError:
                        nextProps.editUserData.editUserAPIError
                });
            }
            this.props.clearError();
        }
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
        if (this.state.rolesList.length >= 1) {

            let data = {
                name: e.name,
                email: e.email,
                roles: this.state.rolesList,
                active: this.state.activeUser,
                propertyId:this.props.propertyId
            }
            this.props.editUser(data, this.props.headerFilter, this.props.userId, this.state.activeUser);
            this.setState({ isSubmit: true, textError: "" })
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

    handleCancelButton() {
        this.props.router.push('/userManagement');
    }

    handleMetricChange() {
        this.setState({ showModal: true, statusErrorText: "Are you sure you want " + (this.state.activeUser != true ? "enable" : "disable") + "?" });

    }

    handleDisabledButton(type) {
        switch (type) {
            case 'yes':
                let active;
                if (this.state.activeUser == true) {
                    active = false;
                    this.setState({ activeUser: false, showModal: false, statusErrorText: "" });
                } else {
                    active = true;
                    this.setState({ activeUser: true, showModal: false, statusErrorText: "" });
                }
                break;

            case 'no':
                this.setState({ showModal: false, statusErrorText: "" })
                break;
        }
    }

    renderCheckboxTag = (formEvent) => {
        return (
            <div className="checkBoxList">
                <CheckBoxList defaultData={formEvent.data}
                    onChange={(e) => this.handleCheckboxListChange(e, formEvent.input)} value={this.state.roles} />
                    {this.state.rolesList.length < 1 &&
                    formEvent.meta.touched && <span className="error">Select at least one role</span>
                }
                    </div>
        )
    };

    render() {
        const { handleSubmit, pristine, submitting } = this.props;
        return (
            <div>
                {this.state.showModal &&
                    <ModalPresentation isRedirect={this.props.isRedirect} statusErrorText={this.state.statusErrorText}
                        textError={this.state.textError}
                        showModal={this.state.showModal} close={::this.closeModal}
                        handleDisabledButton={::this.handleDisabledButton}/>
                }
                <Panel className="tablehead" style={{ padding: "0px" }}>
                    <h3 style={{ padding: "15px" }}>Edit User</h3>
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
                                    <Field name="roles"
                                        component={::this.renderCheckboxTag}
                                    data={this.state.roles}
                                    type="checkBox"
                                    />
                                </Col>
                            </Row>
                            <Row style={{ margin: "10px", marginBottom: "30px" }}>
                                <Col sm={2}>Status</Col>
                                <Col sm={10}>
                                    {this.state.activeUser}
                                    {this.state.activeUser &&
                                        <Button type="button" sm onClick={() => this.handleMetricChange()}>
                                        Enable
                                         </Button>}
                                    {!this.state.activeUser &&
                                        <Button bsStyle="primary" inverse sm onClick={() => this.handleMetricChange()}>
                                        Disable</Button>}
                                </Col>
                            </Row>
                            <Row style={{ margin: "10px" }}>
                                <Col sm={2} />
                                <Col sm={10}>
                                    <Button style={{ marginRight: "30px" }} bsSize="large" type="submit" bsStyle="primary"
                                        disabled={this.state.isSubmit} >Submit</Button>
                                    <Button bsSize="large" type="button" bsStyle="primary"
                                        onClick={() => this.handleCancelButton()} >Cancel</Button>
                                </Col>
                            </Row>
                        </form>
                    </PanelBody>
                </Panel>
            </div>
        )
    };
}

function getDataRoleList(state, userId) {
    let data = state.userLists ? state.userLists : [];
    let update = false, userActive = false, mappingList = [];
    let roleMapList = [
        { value: 'notificationManager', label: 'Notification Manager' },
        { value: 'cmsAnalyst', label: 'Cms Analyst' },
        { value: 'performanceManager', label: 'Performance Manager' },
        { value: 'userManager', label: 'User Admin' }
    ]
    data.map(list => {
        if (list.email == userId) {
            userActive = list.active == "true" ? true : false;
            roleMapList.map(roleList => {
                list.roleMap.map(mapList => {
                    if (roleList.value == mapList) {
                        roleList["checked"] = true;
                        update = true;
                    }
                });
                if (roleList.checked) {
                    mappingList = list.roleMap;
                }
                if (!update) {
                    update = true;
                }
            });
        }
    });
    return { roleMapList, update, userActive, mappingList };
}

function getData(state) {
    let data = state.userListData.userLists ? state.userListData.userLists : [];
    let formData = {};
    data.map(list => {
        if (list.email == state.editUserData.userId) {
            formData.email = list.email;
            formData.name = list.name;
        }
    });
    return {
        email: formData.email,
        name: formData.name
    }
}

EditUserForm = reduxForm({
    form: 'editUser',
    validate,
    enableReinitialize: true
})(EditUserForm);

EditUserForm = connect(
    (state) => {
        return {
            initialValues: getData(state)
        };
    }
)(EditUserForm)
export default EditUserForm