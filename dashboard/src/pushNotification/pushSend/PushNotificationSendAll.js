import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {Col, Form, Panel, PanelBody, Row} from '@sketchpixy/rubix';
import Select from 'react-select-plus';
import {connect} from "react-redux";
import {titleCase} from "change-case";
import {Button, ButtonGroup, Radio, Well} from "@sketchpixy/rubix/lib/index";
import DateTimeField from 'react-bootstrap-datetimepicker';
import {calculateHeaderAndCallApi, calculateHeaderAndCallPostApi} from "../../services/api";
import {debounce} from "throttle-debounce";

const contentType = [{label: 'Story', value: 'story'},
    {label: 'Message', value: 'message'}];

const customContentId = [{label: 'Home', value: '1'}, {label: 'LiveTV', value: '-1'}, {
    label: 'Notification',
    value: '0'
}];

const mapStateToProps = (state) => {
    return {
        headerFilter: state.headerFilter,
        user: state.user
    }
};

const validate = values => {
    const errors = {};
    if (!values.languageList) {
        errors.languageList = 'Select a language';
    }
    if (!values.message) {
        errors.message = 'Write a push message';
    }
    if (!values.topic || values.topic.length < 1) {
        errors.topic = 'Select at least one topic to proceed';
    }
    if (!values.contentType) {
        errors.contentType = 'Select notification type to send one';
    }
    if (values.contentType && values.contentType === 'story' && (!values.content || !values.content.title)) {
        errors.content = 'Select a content to send notification';
    }
    if (values.contentType && values.contentType === 'message' && (!values.customContent || values.customContent === '')) {
        errors.content = 'Select a custom content to send custom notification';
    }
    if (values.scheduledDateTime && values.scheduledDateTime.scheduled && (!values.scheduledDateTime.scheduledTime || values.scheduledDateTime.scheduledTime === '')) {
        errors.scheduledDateTime = "Select a date to send notification at scheduled time";
    }
    return errors
};

@connect(mapStateToProps)
class PushNotificationSendAll extends React.Component {

    getPushTopics = (nextProps) => {
        let topicList = calculateHeaderAndCallApi({
            headerFilter: nextProps.headerFilter
        }, "/getCohort?propertyId=" + nextProps.user.propertyId);
        topicList.then(response => {
            let topics = response.response;
            let stateTopic = [];
            if (topics && topics.length > 0) {
                for (let i = 0; i < topics.length; i++) {
                    stateTopic.push({label: topics[i].topicDisplayName, value: topics[i].topicName});
                }
            }
            this.setState({topicList: stateTopic});
        });
    };

    filterOptions = (options, filter, values) => {
        if (!options) options = [];
        return options
    };
    handlerLanguage = (data, formEvent) => {
        let index = data.nativeEvent.target.selectedIndex;
        let text = data.nativeEvent.target[index].text;
        formEvent.onChange(data.target.value);
        this.props.touch("languageList");
        this.setState({languageSelection: {label: text, value: data.target.value}});
        this.mapLanguageToTopic(data.target.value);
    };

    getOptions = (value, callback) => {
        let rows = [];
        if (value.length > 3 && value && value.trim().length) {
            value = value.trim();
            let contentList = calculateHeaderAndCallApi({
                headerFilter: this.props.headerFilter
            }, "/searchContent?content=" + value + "&typeOfSearch=&language=" + this.state.languageSelection.value);
            contentList.then(response => {
                let content = response.response;
                if (content && content.length > 0) {
                    for (let i = 0; i < content.length; i++) {
                        let obj = {};
                        let date = new Date(content[i].publicationDate).toString();
                        obj.value = content[i].title;
                        obj.article = content[i];
                        obj.label = <li key={i}>
                            {content[i].title}
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Language -</b> {content[i].language}
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Publication Date</b> -{date}
                        </li>;
                        rows.push(obj);
                    }
                    return callback(null, {
                        options: rows,
                        complete: true
                    });
                }
            });
        }
        else {
            let text = "Search Content";
            return callback(null, {
                options: [
                    {value: "", label: text},
                ],
                complete: true
            });
        }
    };

    getMenuItems = (data, label) => {
        let menuItems = [];
        menuItems.push(<option value=''>Select</option>);
        for (let i = 0; i < data.length; i++) {
            if (data[i].label === label) {
                menuItems.push(<option value={data[i].value} selected>{data[i].label}</option>);
            }
            else {
                menuItems.push(<option value={data[i].value}>{data[i].label}</option>);
            }
        }
        return menuItems;
    };
    handlerContentType = (data, formEvent) => {
        let index = data.nativeEvent.target.selectedIndex;
        let text = data.nativeEvent.target[index].text;
        if (text === 'Story') {
            this.setState({
                contentType: {label: text, value: data.target.value},
                customContentId: {label: "Select", value: ""}
            });
            this.props.change("customContent", "");
            this.props.touch("customContent");
        }
        else if (text === 'Message') {
            this.setState({contentType: {label: text, value: data.target.value}, content: {}});
            this.props.change("content", {});
            this.props.touch("content");
        }
        formEvent.onChange(data.target.value);
        this.props.touch("contentType");
    };
    handlerCustomContent = (data, formEvent) => {
        let index = data.nativeEvent.target.selectedIndex;
        let text = data.nativeEvent.target[index].text;
        this.setState({customContentId: {label: text, value: data.target.value}});
        formEvent.onChange(data.target.value);
        this.props.touch("customContent");
    };
    renderDropdownList = ({input, ...rest}) => {
        let dropData = rest.data;
        return (
            <div>
                <select className="form-control sendPushNotificationLanguageDropDown" placeholder="select"
                        onChange={(e) => rest.handler(e, input)}>
                    {::this.getMenuItems(dropData, rest.title)}
                </select>
                {rest.meta.touched && rest.meta.error && <span className="error">{rest.meta.error}</span>}
            </div>
        );
    };
    renderAjaxSelect = (input) => {
        return (
            <div style={{width:'80.3%'}}>
                <Select.Async  className='sendPushNotificationContentValue' value={{label: this.state.content.title, value: this.state.content.articleId}}
                              name="content-dynamic"
                              clearable={true}
                              ignoreCase={false}
                              loadOptions={debounce(500,false,::this.getOptions)}
                              filterOptions={::this.filterOptions}
                              onChange={(e) => this.contentOnChange(e, input)}
                              required/>
                {input.meta.touched && input.meta.error && <span className="error">{input.meta.error}</span>}
            </div>
        )
    };
    onChangeOfTopic = (data, formEvent) => {
        let selectedValue = data.map(singleValue => singleValue.value);
        this.setState({multiValue: data, multiValueSelected: selectedValue});
        formEvent.onChange(selectedValue);
        this.props.touch("topic");
    };
    renderSelectableTag = (formEvent) => {
        return (
            <div>
                <Select className='pushNotificationSentTo' name="form-field-name-multi"
                                  multi={formEvent.multi}
                                  options={formEvent.data}
                                  onChange={(e) => this.onChangeOfTopic(e, formEvent.input)}
                                  value={this.state.multiValue}/>
                {formEvent.meta.touched && formEvent.meta.error && <span className="error">{formEvent.meta.error}</span>}
            </div>
        )
    };
    renderDateTimeSelector = (formEvent) => {
        return (
            <div className='pushNotificationSendDateTime'>
                <DateTimeField  dateTime={this.state.scheduledTime} onChange={(e) => this.dateTime(e, formEvent.input)}/>
                {formEvent.meta.error && <span className="error">{formEvent.meta.error}</span>}
            </div>
        )
    };
    getMessage = () => {
        return this.state.message;
    };
    getDescription = () => {
        return this.state.description;
    };

    updateStateWithMessage = (data) => {
        this.setState({message: data.target.value})
    };

    updateStateWithDescription = (data) => {
        this.setState({description: data.target.value})
    };
    handlerSubmitForm = (values) => {
        this.setState({submitStatus:'Submitting..'});
        let urlEndpoint = '';
        let requestData = {
            message: this.state.message,
            topic: this.state.multiValueSelected,
            messageType: this.state.contentType.value,
            userId: this.props.user.userId,
            propertyId: this.props.user.propertyId,
            description: this.state.description,
            language: this.state.languageSelection.value,
            scheduledTime: this.state.scheduledTime
        };

        if (this.state.contentType.value === 'message') {
            requestData.contentId = this.state.customContentId.value;
            urlEndpoint = '/message';
        }
        if (this.state.contentType.value === 'story') {
            requestData.article = this.state.content;
            urlEndpoint = '/article';
        }
        let context = this;
        let submitStatus = calculateHeaderAndCallPostApi({headerFilter: this.props.headerFilter}, 'sendNotification' + urlEndpoint + '?scheduled=' + this.state.scheduled, requestData);
        context.props.reset();
        context.setState({
            multiValue: [],
            multiValueSelected: [],
            languageSelection: {value: "", label: "Select"},
            contentType: {label: 'Select', value: ''},
            content: {},
            thumbnail: "",
            message: "",
            description: "",
            customContentId: {label: "Select", value: ''},
            submitStatus:'Submit'
        });
    };

    constructor(props) {
        super(props);
        this.state = {
            multiValue: [],
            multiValueSelected: [],
            languageSelection: {value: "", label: "Select"},
            contentType: {label: 'Select', value: ''},
            content: {},
            thumbnail: "",
            message: "",
            description: "",
            customContentId: {label: "Select", value: ''},
            topicList: [],
            languageList: [],
            scheduled: false,
            scheduledTime: '',
            submitStatus:'Submit'
        };
        this.props.change("scheduledDateTime", {scheduled: false, scheduledTime: ''});
    }

    contentOnChange(data, formEvent) {
        if (data) {
            this.setState({content: data.article, message: data.article.title, description: data.article.description});
            formEvent.input.onChange(data.article);
            this.props.change('message', data.article.title);
            this.props.change('description', data.article.description);
        }
        else {
            this.setState({content: {}, message: '', description: ''});
            formEvent.input.onChange({});
            this.props.change('message', '');
            this.props.change('description', '');
        }
        this.props.touch("message");
        this.props.touch("content");
        this.props.touch("description");
    };

    logChangesForDateType(val) {
        if (val === "scheduled") {
            this.setState({scheduled: true});
            let date = new Date();
            this.setState({scheduledTime: date});
            this.props.change("scheduledDateTime", {scheduled: true, scheduledTime: date});
            this.props.touch("scheduledDateTime");
        }
        else {
            this.setState({scheduled: false});
            this.setState({scheduledTime: ''});
            this.props.change("scheduledDateTime", {scheduled: false, scheduledTime: ''});
            this.props.touch("scheduledDateTime");
        }
    };

    dateTime(e, formEvent) {
        let date = new Date(+e);
        this.setState({scheduledTime: date});
        formEvent.onChange({scheduled: true, scheduledTime: date});
        this.props.touch("scheduledDateTime");
    }

    componentWillUpdate(nextProps) {
        if (!this.state.languageList || this.state.languageList.length < 1) {
            let userLanguage = nextProps.user.languageList.filter(language => language !== 'All').map(language => {
                return {label: titleCase(language), value: language}
            });
            this.setState({languageList: userLanguage})
        }
        if (!this.state.topicList || this.state.topicList.length < 1) {
            this.getPushTopics(nextProps);
        }
    }

    componentWillMount(){
        let userLanguage = this.props.user.languageList.filter(language => language !== 'All').map(language => {
            return {label: titleCase(language), value: language}
        });
        this.setState({languageList: userLanguage});
        this.getPushTopics(this.props);
    }

    render() {
        const {handleSubmit, pristine, submitting} = this.props;
        return (
            <div className='sendPushNotificationPageAllUser'>
                <link rel="stylesheet" href="https://unpkg.com/react-select-plus/dist/react-select-plus.css"/>
                <Panel className="tablehead" style={{padding: "0px"}}>
                    <h3 className='sendPushNotificationText'>Send Push Notification</h3>

                    <PanelBody className='pushNotificationSendPanelBodyForAll'>

                        <Form  className='pushNotificationSendForm' onSubmit={handleSubmit(this.handlerSubmitForm)}>
                            <Row className='sendPushNotificationLanguageList'>
                                <Col  className='sendPushNotificationLanguageText'>Language</Col>
                                <Col><Field
                                    name="languageList"
                                    component={::this.renderDropdownList}
                                    data={this.state.languageList}
                                    handler={::this.handlerLanguage}
                                    title={this.state.languageSelection.label}
                                    valueField="value"
                                    textField="label"/>
                                </Col>
                            </Row>
                            <Row className='sendPushNotificationContentType'>
                                <Col className='sendPushNotificationContentTypeText'>Content Type</Col>
                                <Col >
                                    <Field
                                        name="contentType"
                                        component={::this.renderDropdownList}
                                        data={contentType}
                                        handler={::this.handlerContentType}
                                        title={this.state.contentType.label}
                                        valueField="value"
                                        textField="label"/>
                                </Col>
                            </Row>

                            {
                                this.state.contentType.value === 'message' &&
                                <Row  className='sendPushNotificationCustomContent'>
                                    <Col  className='sendPushNotificationCustomContentText'> Custom Content</Col>
                                    <Col >
                                        <Field
                                            name="customContent"
                                            component={::this.renderDropdownList}
                                            data={customContentId}
                                            handler={::this.handlerCustomContent}
                                            title={this.state.customContentId.label}
                                            valueField="value"
                                            textField="label"/>
                                    </Col>

                                </Row>
                            }

                            {
                                this.state.contentType.value === 'story' &&
                                <Row  className='sendPushNotificationContent'>
                                    <Col  className='sendPushNotificationContentText'> Content</Col>
                                    <Col>
                                        <Field placeholder="Search Content"
                                               name="content"
                                               component={::this.renderAjaxSelect}/>
                                    </Col>
                                </Row>
                            }
                            <Row  className='sendPushNotificationMessage'>
                                <Col className='sendPushNotificationMessageText'>Message</Col>
                                <Col>
                                    <input className='pushNotificationSendMessageTextArea' id="myTextBox" type="text" name="message" component="textarea"
                                           placeholder="Message"
                                           onChange={::this.updateStateWithMessage}
                                           format={::this.getMessage}/>
                                </Col>
                            </Row>
                            <Row  className='sendPushNotificationDescription'>
                                <Col className='sendPushNotificationDescriptionText'>Description</Col>
                                <Col>
                                    <input className='pushNotificationSendDescriptionTextArea' id="myTextBox" type="text" name="description" component="textarea"
                                           placeholder="Description"
                                           onChange={::this.updateStateWithDescription}
                                           format={::this.getDescription}/>
                                </Col>
                            </Row>
                            <Row  className='sendPushNotificationTopic'>
                                <Col className='sendPushNotificationSendToText'>Send To</Col>
                                <Col className='sendPushNotificationSendToEditor'>
                                    <Field className='pushNotificationSendDescriptionTextArea' name="topic" component={::this.renderSelectableTag}
                                           data={this.state.topicList} placeholder="Topic"
                                           multi={true}/>
                                </Col>
                            </Row>
                            <Row  className='sendPushNotificationNowLater' style={{zIndex: 0}}>
                                <Col className='sendPushNotificationNowLaterText'> Now/Later</Col>
                                <Col >
                                    <Row className='sendPushNotificationNowScheduled'>
                                        <Col className='sendPushNotificationNow'>
                                            <Radio value="now"
                                                   name="schedule"
                                                   onClick={this.logChangesForDateType.bind(this, "now")}
                                                   checked={!this.state.scheduled}> Now </Radio>
                                        </Col>
                                        <Col className='sendPushNotificationScheduled'>
                                            <Radio value="scheduled"
                                                   name="schedule"
                                                   onClick={this.logChangesForDateType.bind(this, "scheduled")}
                                                   checked={this.state.scheduled}>Scheduled
                                            </Radio>
                                        </Col>
                                    </Row>

                                    {this.state.scheduled &&
                                    <Field className='pushNotificationSendDateTime' name="scheduledDateTime"
                                           component={::this.renderDateTimeSelector}
                                           placeholder="DateTime"/>
                                    }
                                </Col>
                            </Row>
                            <Row>

                                <Col>
                                    <ButtonGroup className='pushNotificationSubmitButton'>
                                        <Button style={{fontSize:'15px'}} bsSize="large" type="submit" bsStyle="primary"
                                                disabled={submitting || pristine}>Submit</Button>
                                    </ButtonGroup>

                                </Col>
                            </Row>
                        </Form>
                    </PanelBody>
                </Panel>
            </div>
        )
    }

    mapLanguageToTopic(language) {
        let topic = null;
        if(this.props.user.propertyId==='ABP-Live'){
            topic = {
                'english': ['englishAndroid', 'englishiOS','englishWeb'],
                'hindi': ['hindiAndroid', 'hindiiOS','hindiWeb'],
                'bengali': ['bengaliAndroid', 'bengaliiOS','bengaliWeb'],
                'marathi': ['marathiAndroid', 'marathiiOS','marathiWeb'],
                'punjabi': ['punjabiAndroid', 'punjabiiOS','punjabiWeb'],
                'gujarati': ['gujaratiAndroid', 'gujaratiiOS','gujaratiWeb']
            };
        }
        let topics = topic[language]?topic[language]:[];
        let topicMap = topics.map(singleTopic=>{
            let displayName = singleTopic.replace(/\b[a-z]/g,function(f){return f.toUpperCase();});
            return {value:singleTopic,label:displayName}
        });
        this.setState({multiValue: topicMap, multiValueSelected: topics});
        this.props.change("topic",topics);
        this.props.touch("topic");
    };
}

export default reduxForm({
    form: 'pushNotificationSend',
    validate
})(PushNotificationSendAll);