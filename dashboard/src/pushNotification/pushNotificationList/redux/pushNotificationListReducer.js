
import moment from 'moment-timezone';
import {
    replaceAll, joinAll
} from  "../../../common/utilityDownloadTableMethods";


function pushNotificationListData(state = { tableData: [], CTRData:{}, isLoading: true, isCTRLoading: false, sortValue: 'desc', sortDim: 'dateOfSending', limit: 500, offset: 1 }, action) {
    switch (action.type) {
        case "PUSH_NOTIFICATION_LIST_DATA_UPDATE":
        let tableData = action.tableData;
            return Object.assign({}, state, {
                tableData: tableData && tableData.length>0?tableData:[],
                isLoading: false,
                sortValue: action.sortValue,
                sortDim: action.sortDim,
                limit: action.limit,
                offset: action.offset,
                downloadTableData: tableData && tableData.length>0 ? prepareData(tableData):[]
            });
            break;
        case "PUSH_NOTIFICATION_LIST_FETCH":
            return Object.assign({}, state, {
                isLoading: true
            });
            break;
        case "PUSH_NOTIFICATION_LIST_FETCH_FAILED":
            return Object.assign({}, state, {
                isLoading: false
            });
            break;
        case "PUSH_NOTIFICATION_CTR_DATA_UPDATE":
            let ctrObject = state.CTRData;
            ctrObject[action.pnId]=action.CTRData;
            ctrObject[action.isCTRLoading]=state.isCTRLoading;
            return Object.assign({}, state, {
                CTRData: ctrObject,
                isCTRLoading: false,
            });
            break;
        case "PUSH_NOTIFICATION_CTR_FETCH":
            return Object.assign({}, state, {
                isCTRLoading: true
            });
            break;
        case "PUSH_NOTIFICATION_CTR_FETCH_FAILED":
            return Object.assign({}, state, {
                isCTRLoading: false
            });
            break;    
        default:
            return state
    }
}

function prepareData(tableData) {
    let data = tableData;
    let array = [];
    var reformattedArray = data.map(function(obj) { 
        var rObj = {};
        rObj["auth"] = obj.auth;
        rObj["cat"] = joinAll(obj.cat);
        rObj["cntId"] = obj.cntId;
        rObj["dt"] = moment(new Date(obj.dt)).format("Do MMM YY");
        rObj["lang"] = obj.lang;
        rObj["rule"] = obj.rule;
        
        rObj["title"] = replaceAll(obj.title, "");
        rObj["topic"] = obj.topic;
        rObj["type"] = obj.type;
        rObj["name"] = obj.name;
        array.push(rObj);
    });
    return array;

}


module.exports = {
    pushNotificationListData
};

