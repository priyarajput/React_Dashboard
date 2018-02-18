import moment from 'moment';

import iText from "../../common/iText.json";

const granularity={last30Minutes:"minute",last24Hours:"hour",today:"hour",yesterday:"hour",lastWeek:"day"};
const initialState={
    fromDate:moment().subtract(24,'hour').format("YYYY-MM-DDTHH:mm:00.sssZ"),
    toDate:moment().format("YYYY-MM-DDTHH:mm:00.sssZ"),
    key:"Last 24 Hours",
    keyVal:"last24Hours",
    grain:"hour",
    distribution:{levelOneFilter:'',levelOneValue:'channel',levelTwoFilter:'',levelTwoValue:'deviceType',display:'All'},
    dateNonDashboard:{startDate:moment().subtract(1,'week').add(1,'day').format("YYYY-MM-DDTHH:mm:00.sssZ"),endDate:moment().format("YYYY-MM-DDTHH:mm:00.sssZ")},
    grainNonDashboard:"day",
    iText: iText
};
const colorsPicker = ["#a06666", "#5ea0a0", "#7b9ba0", "#a0a07b", "#8c79a0", "#a06666", "#5ea0a0", "#7b9ba0", "#a0a07b", "#8c79a0", "#a06666", "#5ea0a0", "#7b9ba0", "#a0a07b", "#8c79a0", "#a06666", "#5ea0a0", "#7b9ba0", "#a0a07b", "#8c79a0"];

function headerFilter(state=initialState,action){
    switch(action.type){
        case 'HEADER_LANGUAGE_SELECTION':
            let language=action.language;
            if(language==='All')
                language=null;
            return Object.assign({}, state, {language: language});
            break;

        case 'HEADER_DATE_SELECTION':
            return Object.assign({}, state, {fromDate: action.date.startDate.format("YYYY-MM-DDTHH:mm:00.sssZ"),
                        toDate: action.date.endDate.format("YYYY-MM-DDTHH:mm:00.sssZ"),
                        key:action.key,
                        keyVal:action.keyVal,
                        grain:granularity[action.keyVal]});
            break;

        case 'HEADER_DISTRIBUTION_SELECTION':
            return Object.assign({}, state, {
                distribution:{
                    display:action.distribution.display,
                    levelOneFilter:action.distribution.appFilter,
                    levelOneValue:action.distribution.appColumn,
                    levelTwoFilter:action.distribution.subDimension,
                    levelTwoValue:action.distribution.subDimensionValue,
            }});
            break;

        case 'HEADER_PROPERTY_SELECTION':
            return Object.assign({}, state, {propertyId: action.propertyId});
            break;

        case 'CHANGE_DATE':
            return Object.assign({}, state, {
                dateNonDashboard: action.date,
                grainNonDashboard: computeGrain(action.date.startDate,action.date.endDate)
            });

        default: return state;
    }
}

function colors(state = colorsPicker, action) {
    return state
}

function computeGrain(fromDate,toDate){
    if(moment(toDate).diff(moment(fromDate), 'hours')<1){
        return "minute";
    }
    else if(moment(toDate).diff(moment(fromDate), 'days')<=1){
        return "hour";
    }
    else if(moment(toDate).diff(moment(fromDate), 'days')<=92){
        return "day";
    }
    else if(moment(toDate).diff(moment(fromDate), 'days')>90){
        return "week";
    }
    else{
        return "day";
    }
}

module.exports={
    headerFilter, colors
};