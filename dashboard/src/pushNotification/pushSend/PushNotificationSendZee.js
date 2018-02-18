import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {Col, Form, Panel, PanelBody, Row,Checkbox} from '@sketchpixy/rubix';
import Select from 'react-select-plus';
import {connect} from "react-redux";
import {titleCase} from "change-case";
import {Button, ButtonGroup, Radio, Well} from "@sketchpixy/rubix/lib/index";
import DateTimeField from 'react-bootstrap-datetimepicker';
import {calculateHeaderAndCallApi, calculateHeaderAndCallPostApi} from "../../services/api";
import {debounce} from "throttle-debounce";

const contentType = [{label :'Story', value: 'story'},
    {label: 'Message', value: 'message'}];

const customContentId = [{label: 'Home', value: '1'}, {label: 'LiveTV', value: '-1'}, {
    label: 'Notification',
    value: '0'
}];

const notificationCategory = [{label:'BreakingNews',value:'Breakingnews'},
    {label:'Sports',value:'Sports'},
    {label:'DailyBrief',value:'Dailybrief'},
    {label:'News',value:'News'},
    {label:'BusinessUpdate',value:'Businessupdate'},
    {label:'Entertainment',value:'Entertainment'}];

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
    if (!values.categoryList) {
        errors.categoryList = 'Select a category';
    }
    if (!values.message) {
        errors.message = 'Write a push message';
    }
     else if (values.message.length>=150) {
        errors.message = 'Message can not be more than 150 characters';
    }
    if (!values.distribution || values.distribution.length < 1) {
        errors.distribution = 'Select at least one distribution to proceed';
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
class PushNotificationSendZee extends React.Component {

    filterOptions = (options, filter, values) => {
        if (!options) options = [];
        return options
    };
    handlerLanguage = (data, formEvent) => {
        let index = data.nativeEvent.target.selectedIndex;
        let text = data.nativeEvent.target[index].text;
        formEvent.onChange(data.target.value);
        this.props.touch("languageList");
        this.props.touch("categoryList");
        this.props.touch("distribution");
        this.setState({languageSelection: {label: text, value: data.target.value}});
        this.mapLanguageToTopic(data.target.value);
    };

    handlerCategory = (data, formEvent) => {
        let index = data.nativeEvent.target.selectedIndex;
        let text = data.nativeEvent.target[index].text;
        formEvent.onChange(data.target.value);
        this.props.touch("categoryList");
        this.props.touch("distribution");
        this.setState({categorySelection: {label: text, value: data.target.value}});
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

    getMenuItemsCategory = (data, label) => {
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
                <select className="form-control sendPushNotificationLanguageDropDownZee" placeholder="select"
                        onChange={(e) => rest.handler(e, input)}>
                    {::this.getMenuItems(dropData, rest.title)}
                </select>
                {rest.meta.touched && rest.meta.error && <span className="error">{rest.meta.error}</span>}
            </div>
        );
    };


    renderDropdownListCategory = ({input, ...rest}) => {
        let dropData = rest.data;
        return (
            <div>
                <select className="form-control sendPushNotificationDropdownListCategoryZee" placeholder="select"
                        onChange={(e) => rest.handler(e, input)}>
                    {::this.getMenuItemsCategory(dropData, rest.title)}
                </select>
                {rest.meta.touched && rest.meta.error && <span className="error">{rest.meta.error}</span>}
            </div>
        );
    };

    onSelectCheckBoxDistribution(input){
        let deviceArray = this.state.distributionList;
        if(deviceArray.indexOf(input.target.labels[0].innerText)!==-1){
            deviceArray=deviceArray.filter(value=>value!==input.target.labels[0].innerText);
        }
        else
            deviceArray.push(input.target.labels[0].innerText);
        this.setState({distributionList:deviceArray});
        this.props.change("distribution", deviceArray);
        this.props.touch("distribution");
    }

    renderCheckBoxDistribution= ({input, ...rest}) => {
        return (
            <div className='pushNotificationSendCheckBoxDistribution'>
                <Checkbox
                    inline
                    label="Android"
                    onClick={(e)=>this.onSelectCheckBoxDistribution(e)}
                    handleCheckboxChange={(e)=>this.onSelectCheckBoxDistribution(e)}
                    key="Android"
                    checked={this.state.distributionList.indexOf("Android")!==-1}
                >Android</Checkbox>
                <Checkbox
                    inline
                    label="iOS"
                    onClick={(e)=>this.onSelectCheckBoxDistribution(e)}
                    handleCheckboxChange={(e)=>this.onSelectCheckBoxDistribution(e)}
                    key="iOS"
                    checked={this.state.distributionList.indexOf("iOS")!==-1}
                >iOS</Checkbox>
                <Checkbox
                    inline
                    label="Web"
                    onClick={(e)=>this.onSelectCheckBoxDistribution(e)}
                    handleCheckboxChange={(e)=>this.onSelectCheckBoxDistribution(e)}
                    key="Web"
                    checked={this.state.distributionList.indexOf("Web")!==-1}
                >Web</Checkbox>
            </div>
        );
    };

    renderAjaxSelect = (input) => {
        
        return (
            <div style={{width:'80.1%'}}>
                <Select.Async className='sendPushNotificationContentValueZee' value={{label: this.state.content.title, value: this.state.content.articleId}}
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

    renderDateTimeSelector = (formEvent) => {
        return (
            <div  className='pushNotificationSendDateTimeZee'>
                <DateTimeField dateTime={this.state.scheduledTime} onChange={(e) => this.dateTime(e, formEvent.input)}/>
                {formEvent.meta.error && <span className="error">{formEvent.meta.error}</span>}
            </div>
        )
    };

    renderTextAreaField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
        <label>{label}</label>
        <div>
            <textArea {...input} placeholder={label} type={type} className="inputBox PNSendTextAreaZee"  id="myTextBox" />
            {touched && ((error && <span className="error" style={{ display: "block",marginTop:'-7px'}}>{error}</span>))}
        </div>
    </div>
     )

     renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type} className="inputBox PNSendInputTextAreaZee" id="myTextBox"  />
            {touched && ((error && <span style={{ display: "block", color: "#af331d" }}>{error}</span>))}
        </div>
    </div>
     )


    updateStateWithMessage = (data) => {
        this.setState({message: data.target.value})
    };


     onChangeSelect = (data) => {
        this.setState({thumbnail: data.target.value})
        this.props.touch("imageUrl");
    };
   
    handlerSubmitForm = (values) => {
        this.setState({submitStatus:'Submitting..'});
        let urlEndpoint = '';
        let imageUrl='';
        let topic=this.state.distributionList.map(dist=>{
            return this.state.languageSelection.value+this.state.categorySelection.value+dist;
        });
        let requestData = {
            message: values.message,
            topic: topic,
            messageType: this.state.contentType.value,
            userId: this.props.user.userId,
            propertyId: this.props.user.propertyId,
            description: values.message,
            language: this.state.languageSelection.value,
            scheduledTime: this.state.scheduledTime,
            imageUrl:this.state.thumbnail
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
        calculateHeaderAndCallPostApi({headerFilter: this.props.headerFilter}, 'sendNotification' + urlEndpoint + '?scheduled=' + this.state.scheduled, requestData);
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
            distribution:[],
            customContentId: {label: "Select", value: ''},
            categorySelection:{value: "", label: "Select"},
            submitStatus:'Submit',
            distributionList:[]
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
            filteredTopicList:[],
            languageList: [],
            scheduled: false,
            scheduledTime: '',
            submitStatus:'Submit',
            categorySelection:{value: "", label: "Select"},
            categoryList:notificationCategory,
            singleValue:{},
            distributionList:[]
        };
        this.props.change("scheduledDateTime", {scheduled: false, scheduledTime: ''});
    }

    contentOnChange(data, formEvent) {
        if (data) {
            this.setState({content: data.article});
            formEvent.input.onChange(data.article);
            this.setState({thumbnail: data.article.thumbnail});
            this.props.change('imageUrl', data.article.thumbnail);
        }
        else {
            this.setState({content: {}});
            formEvent.input.onChange({});
        }
        this.props.touch("content");
        this.props.touch("imageUrl");

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
    }

    componentWillMount(){
        let userLanguage = this.props.user.languageList.filter(language => language !== 'All').map(language => {
            return {label: titleCase(language), value: language}
        });
        this.setState({languageList: userLanguage});
    }

    render() {
        const {handleSubmit, pristine, submitting} = this.props;
        return (
            <div className='sendPushNotificationPageZee'>
                <link rel="stylesheet" href="https://unpkg.com/react-select-plus/dist/react-select-plus.css"/>
                
                <Panel className="tablehead " style={{padding: "0px"}}>
                    <h3 className='sendPushNotificationTextZee'>Send Push Notification</h3>

                    <PanelBody className='pushNotificationSendPanelBodyZee'>
                         <Row>
                         <Col sm={8} style={{paddingRight:0}}>
                        <Form  className='pushNotificationSendFormZee' onSubmit={handleSubmit(this.handlerSubmitForm)}>
                         
                            <Row className='sendPushNotificationLanguageListZee'>
                                <Col className='sendPushNotificationLanguageTextZee'>Language</Col>
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
                            <Row className='sendPushNotificationContentTypeZee'>
                                <Col className='sendPushNotificationContentTypeTextZee'>Content Type</Col>
                                <Col>
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
                                <Row  className='sendPushNotificationCustomContentZee'>
                                    <Col  className='sendPushNotificationCustomContentTextZee'>Custom Content</Col>
                                    <Col>
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
                                <Row  className='sendPushNotificationContentZee'>
                                    <Col  className='sendPushNotificationContentTextZee'> Content</Col>
                                    <Col>
                                        <Field placeholder="Search Content"
                                               name="content"
                                               component={::this.renderAjaxSelect}
                                             />
                                    </Col>
                                </Row>
                            }

                            
                            <Row className='sendPushNotificationMessageZee'>
                                <Col className='sendPushNotificationMessageTextZee'>Message</Col>
                                <Col>
                                 <Field className='pushNotificationSendMessageTextAreaZee'
                                           id="myTextBox" type="text" 
                                           name="message" 
                                           component={this.renderTextAreaField} 
                                           placeholder="Message"
                                           onChange={::this.updateStateWithMessage}
                                          />
                                </Col>
                            </Row>
                            <Row className='sendPushNotificationMessageZee'>
                                <Col className='sendPushNotificationMessageTextZee'>Image URL</Col>
                                <Col>
                                 <Field className='pushNotificationSendMessageTextAreaZee'
                                           type="text" 
                                           name="imageUrl" 
                                           component={this.renderField} 
                                           placeholder="Image URL"
                                           onChange={::this.onChangeSelect}
                                           value={this.state.thumbnail}
                                          />
                                </Col>          
                            </Row>
                            <Row className='sendPushNotificationCategoryZee'>
                                <Col className='sendPushNotificationCategoryTextZee'>Category</Col>
                                <Col><Field
                                    name="categoryList"
                                    component={::this.renderDropdownListCategory}
                                    data={this.state.categoryList}
                                    handler={::this.handlerCategory}
                                    title={this.state.categorySelection.label}
                                    valueField="value"
                                    textField="label"/>
                                </Col>
                            </Row>
                            <Row className='sendPushNotificationDistributionZee'>
                                <Col className='sendPushNotificationDescriptionTextZee'>Distribution</Col>
                                <Col><Field
                                    name="distribution"
                                    component={::this.renderCheckBoxDistribution}
                                    valueField="value"
                                    textField="label"/>
                                </Col>
                            </Row>
                            <Row  className='sendPushNotificationNowLaterZee' style={{zIndex: 0}}>
                                <Col  className='sendZeePushNotificationNowLaterTextZee'> Now/Later</Col>
                                <Col className='sendZeePushNotificationNowScheduledTextAreaZee'>
                                    <Row className='sendZeePushNotificationNowScheduledZee'>
                                        <Col className='sendPushNotificationNowZee'>
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
                                    <Field name="scheduledDateTime"
                                           component={::this.renderDateTimeSelector}
                                           placeholder="DateTime"/>
                                    }
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <ButtonGroup  style={{fontSize:'15px'}} className='sendZeepushNotificationSubmitButton'>
                                        <Button bsSize="large" type="submit" bsStyle="primary"
                                                disabled={submitting || pristine}>Submit</Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                            
                        </Form>
                        </Col>
                        <Col sm={4} style={{paddingLeft:0}}>
                        <div style={{height:220,width:"95%",backgroundColor: "#293233",marginTop:50,marginRight:20,textAlign:"center",borderRadius:10}}>
                        <div style={this.state.thumbnail?{height:"40%",backgroundColor:"#fff",borderTopLeftRadius:10,borderTopRightRadius:10,padding:4}:{height:"40%",backgroundColor:"#fff",borderRadius:10,padding:4}}>
                        <span style={(screen.width)>=990?{width:"20%",float:"left",verticalAlign:"middle",lineHeight:5.5,marginRight:10,marginLeft:5}:{width:"8%",float:"left",verticalAlign:"middle",lineHeight:5.5,marginRight:10,marginLeft:5}}><img style={(screen.width)>=990?{ width: "100%"}:{width:50}}src='/imgs/common/piStats/zee.png'/></span>
                        <span style={{width:"80%"}}><p style={{lineHeight:1.3,padding:5,textAlign:"left",wordWrap:"break-word",color:"#000"}}>{this.state.message?this.state.message.length>110?this.state.message.substring(0,110)+"...":this.state.message:
                            <span style={{verticalAlign:"middle",lineHeight:3}}><h5>Notification Message Here...</h5></span>}</p></span>
                        </div>
                        <div style={{borderBottomLeftRadius:10,borderBottomRightRadius:10,height:"60%"}}>
                          <img style={{height: "120px", width: "100%",borderBottomLeftRadius:10,borderBottomRightRadius:10}}
                            src={this.state.thumbnail} alt="">
                          </img> 
                        </div>
                        </div>
                        </Col>
                        </Row>
                    </PanelBody>
                </Panel>

            </div>
        )
    }

    mapLanguageToTopic(language) {
        let topic = null;
        if(this.props.user.propertyId==='ZEE-ZMCL'){
            topic = {
                'english': ['englishBreakingnewsAndroid', 'englishBreakingnewsiOS','englishDailybriefiOS','englishNewsiOS','englishBusinessupdateiOS','englishEntertainmentiOS','englishDailybriefAndroid','englishNewsAndroid','englishBusinessupdateAndroid','englishEntertainmentAndroid'],
                'hindi': ['hindiBreakingnewsAndroid', 'hindiBreakingnewsiOS','hindiDailybriefiOS','hindiNewsiOS','hindiBusinessupdateiOS','hindiEntertainmentiOS','hindiDailybriefAndroid','hindiNewsAndroid','hindiBusinessupdateAndroid','hindiEntertainmentAndroid'],
                'bengali': ['bengaliBreakingnewsAndroid', 'bengaliBreakingnewsiOS','bengaliDailybriefiOS','bengaliNewsiOS','bengaliBusinessupdateiOS','bengaliEntertainmentiOS','bengaliDailybriefAndroid','bengaliNewsAndroid','bengaliBusinessupdateAndroid','bengaliEntertainmentAndroid'],
                'marathi': ['marathiBreakingnewsAndroid', 'marathiBreakingnewsiOS','marathiDailybriefiOS','marathiNewsiOS','marathiBusinessupdateiOS','marathiEntertainmentiOS','marathiDailybriefAndroid','marathiNewsAndroid','marathiBusinessupdateAndroid','marathiEntertainmentAndroid'],
                'tamil': ['tamilBreakingnewsAndroid', 'tamilBreakingnewsiOS','tamilDailybriefiOS','tamilNewsiOS','tamilBusinessupdateiOS','tamilEntertainmentiOS','tamilDailybriefAndroid','tamilNewsAndroid','tamilBusinessupdateAndroid','tamilEntertainmentAndroid']
            };
        }
        let topics = topic[language]?topic[language]:[];
        let topicMap = topics.map(singleTopic=>{
            let displayName = singleTopic.replace(/\b[a-z]/g,function(f){return f.toUpperCase();});
            return {value:singleTopic,label:displayName}
        });
        this.setState({multiValue: {}, multiValueSelected: [],filteredTopicList:topicMap});
        this.props.change("topic",[]);
        this.props.touch("topic");
    };
}

export default reduxForm({
    form: 'pushNotificationSend',
    validate
})(PushNotificationSendZee);