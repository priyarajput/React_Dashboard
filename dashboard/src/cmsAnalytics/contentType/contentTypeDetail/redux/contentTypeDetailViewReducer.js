/**
 * Created by bluepi12 on 8/9/17.
 */
import {
    replaceAll, joinAll
} from  "../../../../common/utilityDownloadTableMethods";
import moment from 'moment-timezone';

function contentTypeDetailViewData(state = {isLoading:true}, action) {
    switch (action.type) {
        case "CONTENT_TYPE_DETAIL_VIEW_DATA_UPDATE":
            return Object.assign({}, state, {
                pageviews:action.contentTypeDetailData.pageviews,
                publishedViews:action.contentTypeDetailData.publishedViews,
                dualAreaGraphData: getPublishedVsPageviews(action.contentTypeDetailData.pageviews,action.contentTypeDetailData.publishedViews),
                authorPieData:transformForPieChart(action.contentTypeDetailData.publishedByAuthor),
                categoryPieData:transformForPieChart(action.contentTypeDetailData.publishedByCategory),
                contentTableData: action.contentTypeDetailData.contentList,
                isLoading: false,
                downloadTableData: prepareData(action.contentTypeDetailData.contentList)
            });
            break;
        case "CONTENT_TYPE_DETAIL_VIEW_FETCH":
            return Object.assign({}, state, {
                isLoading: true
            });
            break;
        case "CONTENT_TYPE_DETAIL_VIEW_FETCH_FAILED":
            return Object.assign({}, state, {
                isLoading: false
            });
            break;
        default:
            return state
    }
}

module.exports = {
    contentTypeDetailViewData
};

function prepareData(tableData) {
    let data = tableData;
    let array = [];
    var reformattedArray = data.map(function (obj) {
        var rObj = {};
        rObj["authorList"] = joinAll(obj.authorList);
        rObj["categoryList"] = joinAll(obj.categoryList);
        rObj["publicationDate"] = moment(new Date(obj.publicationDate)).format("Do MMM YY");
        rObj["tagList"] = joinAll(obj.tagList);
        rObj["title"] = replaceAll(obj.title, "");
        array.push(rObj);
    });
    return array;

}

function getPublishedVsPageviews(pageviews,publishedViews) {
    let pageVSpublishedDataArray=[];
    pageviews.map(singleDatapoint => {
        let dataObject={};
        for (var i = publishedViews.length - 1; i >= 0; i--) {
            if (publishedViews[i].timestamp===singleDatapoint.timestamp) {
             dataObject['timestamp']=singleDatapoint.timestamp;
             dataObject['pageViews']=singleDatapoint.result.pageViews;
             dataObject['publishedContent']= Math.round(publishedViews[i].result.publishedContent);
            pageVSpublishedDataArray.push(dataObject);
            break;
            }
            else
            {
            if(i===0)
            {
             dataObject['timestamp']=singleDatapoint.timestamp;
             dataObject['pageViews']=singleDatapoint.result.pageViews;
             dataObject['publishedContent']= 0;
            pageVSpublishedDataArray.push(dataObject);  
            break;
            } 
            }
        }
    });


    let dataArray=[];
    publishedViews.map(singleDatapoint => {
        let dataObject={};
        for (var i = pageVSpublishedDataArray.length - 1; i >= 0; i--) {
            if (singleDatapoint.timestamp===pageVSpublishedDataArray[i].timestamp) {
            break;
            }
            else
            {
            if(i===0)
            {
             dataObject['timestamp']=singleDatapoint.timestamp;
             dataObject['pageViews']=0;
             dataObject['publishedContent']= Math.round(pageVSpublishedDataArray[i].publishedContent);
            pageVSpublishedDataArray.push(dataObject);  
            break;
            } 
            }
        }
    });
     return pageVSpublishedDataArray;
}

export function transformForPieChart(apiData){
    let totalSum = apiData.map(single=>single.event.count).reduce(sum,0);
    let pieData = apiData.map(data=>{
        data['percent']=(data.event.count/totalSum)*100;
        return data;
    });
    let color =["#A06666", "#5EA0A0", "#D4CBE5", "#c45baa", "#DBD56E", "#88AB75", "#2D93AD", "#DFF2D8", "#C6DEA6", "#7EBDC3", "#8BB174", "#426B69", "#5C574F", "#48483A", "#93032E", "#A6A15E", "#034C3C", "#27474E", "#E1D89F"];
    let othersPie = pieData.filter(data=>data.percent<=3).map(single=>single.event.count).reduce(sum,0);
    let index = 0;
    let pieDataResult = pieData.filter(data=>data.percent>3).map(data=>{
        let dimensionOnGraph = data.event.count;
        let graphDataSinglePoint ={};
        graphDataSinglePoint.name=data.event.dimension;
        graphDataSinglePoint.value=Math.round(dimensionOnGraph);
        graphDataSinglePoint.color=color[index];
        index++;
        return graphDataSinglePoint;
    });
    if(othersPie>0)
        pieDataResult.push({name:'Others',value:Math.round(othersPie),color:'#f45866'});
    return pieDataResult;
}

export function sum(prev, next) {
    return prev + next
}
