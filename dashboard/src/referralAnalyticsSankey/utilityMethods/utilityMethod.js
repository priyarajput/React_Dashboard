let uniqueOrigins = [];

export function getOrigin(data){
    return data.event.referralOrigin
}

export function getMedium(data){
    return data.event.referralMedium
}

export function getIndex(data){
    return data.event.referralIndex
}

export function getPageViews(item) {
    return Math.round(item.event.pageViews)
}

export function getUsers(item) {
    return Math.round(item.event.users)
}

export function getSession(item) {
    return Math.round(item.event.session)
}

export function sum(prev, next) {
    return prev + next
}

export function transformDataOrigin(dataArray,funDistinct,funSum,metric){
    let {distinctArr,sumData,sumKey}=uniqueByAndSum(dataArray,funDistinct,funSum);
    let othersArray=[];
    let nonOthersArray=[];
    let othersSum=0;
    distinctArr.map(data=>{
        let dataPercent =  (sumKey[data]/sumData)*100;
        if(dataPercent<2){
            othersArray.push(data);
            othersSum+=sumKey[data];
        }
        else{
            nonOthersArray.push(data);
        }
    });
    let filteredOrigins = dataArray.filter(data=>nonOthersArray.indexOf(data.event["referralOrigin"])!==-1);
    let filteredMediumArray=[];
    nonOthersArray.map(uniqueArray=>{
        filteredMediumArray=filteredMediumArray.concat(transformDataMedium(filteredOrigins.filter(data=>uniqueArray===data.event["referralOrigin"]),getMedium,funSum,metric,uniqueArray))
    });
    let othersObject ={};
    othersObject[metric]=othersSum;
    othersObject["referralOrigin"]="Others";
    filteredMediumArray.push(othersObject);
    filteredMediumArray=getFlowAndNodes(filteredMediumArray,metric);
    return filteredMediumArray;
}

export function transformDataMedium(dataArray,funDistinct,funSum,metric,origin){

    let {distinctArr,sumData,sumKey}=uniqueByAndSum(dataArray,funDistinct,funSum);
    let othersArray=[];
    let nonOthersArray=[];
    let othersSum=0;
    distinctArr.map(data=>{
        let dataPercent =  (sumKey[data]/sumData)*100;
        if(dataPercent<10){
            othersArray.push(data);
            othersSum+=sumKey[data];
        }
        else{
            nonOthersArray.push(data);
        }
    });
    let filteredMedium = dataArray.filter(data=>nonOthersArray.indexOf(data.event["referralMedium"])!==-1);
    let filteredIndexesArray=[];
    nonOthersArray.map(uniqueArray=>{
        filteredIndexesArray= filteredIndexesArray.concat(transformDataIndex(filteredMedium.filter(data=>uniqueArray===data.event["referralMedium"]),getIndex,funSum,metric,uniqueArray,origin))
    });
    let othersObject ={};
    othersObject[metric]=othersSum;
    othersObject["referralMedium"]="Others";
    othersObject["referralOrigin"]=origin;
    filteredIndexesArray.push(othersObject);
    return filteredIndexesArray;
}

export function transformDataIndex(dataArray,funDistinct,funSum,metric,medium,origin){

    let {distinctArr,sumData,sumKey}=uniqueByAndSum(dataArray,funDistinct,funSum);
    let othersArray=[];
    let nonOthersArray=[];
    let othersSum=0;
    distinctArr.map(data=>{
        let dataPercent =  (sumKey[data]/sumData)*100;
        if(dataPercent<8){
            othersArray.push(data);
            othersSum+=sumKey[data];
        }
        else{
            nonOthersArray.push(data);
        }
    });
    let anotherArr=[];
    let filteredIndex = dataArray.filter(data=>nonOthersArray.indexOf(data.event["referralIndex"])!==-1).map(a=>{
        if(anotherArr.indexOf(a.event["referralIndex"])===-1){
            let sumAll = dataArray.filter(data=>a.event["referralIndex"]===data.event["referralIndex"]).map(a=>funSum(a)).reduce(sum,0);
            let returnObj ={};
            returnObj[metric]=sumAll;
            returnObj["referralIndex"]=a.event["referralIndex"];
            returnObj["referralMedium"]=medium;
            returnObj["referralOrigin"]=origin;
            anotherArr.push(a.event["referralIndex"]);
            return returnObj;
        }
    });
    let othersObject ={};
    othersObject[metric]=othersSum;
    othersObject["referralIndex"]="Others";
    othersObject["referralMedium"]=medium;
    othersObject["referralOrigin"]=origin;
    filteredIndex.push(othersObject);
    return filteredIndex;
}


export function getFlowAndNodes(transformData,dimensionToSortOnFunction)
{

     let flowArray=[];

    transformData.filter(data=>data).map(data =>{
      let flowObject={};
      let interFlowArray=[];

        if(!data.referralMedium && !data.referralIndex)
       {
       }
       else if(!data.referralOrigin)
       {
        interFlowArray.push(data.referralIndex+"other");
        interFlowArray.push(data.referralIndex);
        flowObject.thru=interFlowArray;
        flowObject.value=Math.round(data[dimensionToSortOnFunction]);
        flowArray.push(flowObject);

       }
       else if(!data.referralMedium)
       {
        interFlowArray.push(data.referralOrigin);
        interFlowArray.push(data.referralOrigin+"other");
        flowObject.thru=interFlowArray;
        flowObject.value=Math.round(data[dimensionToSortOnFunction]);
        flowArray.push(flowObject);


       }
       else if(!data.referralIndex)
       {
        interFlowArray.push(data.referralOrigin);
        interFlowArray.push(data.referralOrigin+"other");
        flowObject.thru=interFlowArray;
        flowObject.value=Math.round(data[dimensionToSortOnFunction]);
        flowArray.push(flowObject);

       }

       else
       {
        if (data.referralOrigin==="Others" || data.referralMedium==="Others" || data.referralIndex==="Others" ) {
        interFlowArray.push(data.referralOrigin);
        interFlowArray.push(data.referralMedium);
        interFlowArray.push(data.referralMedium+"other");
        flowObject.thru=interFlowArray;
        flowObject.value=Math.round(data[dimensionToSortOnFunction]);
        }
        else
        {
        interFlowArray.push(data.referralOrigin);
        interFlowArray.push(data.referralMedium);
        if (isNaN(data.referralIndex)) {
            interFlowArray.push(data.referralIndex);
        }
        else
        {
            interFlowArray.push(data.referralIndex+"-"+data.referralMedium+"-"+data.referralOrigin);
        }
        flowObject.thru=interFlowArray;

        flowObject.value=Math.round(data[dimensionToSortOnFunction]);
    }
        flowArray.push(flowObject);
       
       }

    });

     let flows=flowArray;
    
    let nodesArray=[];
    flows.map(data =>{
      for (var i = data.thru.length - 1; i >= 0; i--) {
      let nodesObject={};
        nodesObject.disp=data.thru[i];
      nodesObject.name=data.thru[i];
      
      nodesArray.push(nodesObject);
      }
      
    });

    let distinct=uniqueNodes(nodesArray);
    let Nodes=uniqueNodeswithoutUndefine(distinct);
    let indextest=uniqueNodesWithOther(Nodes);
    let distinctNodes=uniqueNodesWithIndex(indextest);


    return {flows,distinctNodes}
}

export function uniqueByAndSum(arr, fnUn,fnSum) {
    let unique = {};
    let sumKey = {};
    let distinct = [];
    let sumData = arr.map(x => {
        let key = fnUn(x);
        if (!unique[key] && key) {
            distinct.push(key);
            unique[key] = true;
            sumKey[key]=fnSum(x);
        }
        else{
            sumKey[key]=sumKey[key]+fnSum(x);
        }
        return fnSum(x);
    }).reduce(sum,0);
    return {distinctArr:distinct.sort(),sumData:sumData,sumKey:sumKey};
}

export function uniqueNodes(arr) {
var flags = [], output = [], l = arr.length, i;
for( i=0; i<l; i++) {
    let nodes={};
    if( flags[arr[i].disp]) continue;
    flags[arr[i].disp] = true;
    nodes.disp=arr[i].disp;
    nodes.name=arr[i].name;
    output.push(nodes);
}
    return output.sort();
}

export function uniqueNodesWithOther(arr) {
var output = [], l = arr.length, i;
for( i=0; i<l; i++) {
    let nodes={};
    if( arr[i].disp.includes("other"))
    {
     nodes.disp="Other";
    nodes.name=arr[i].name;   
    }
    else
    {
      nodes.disp=arr[i].disp;
    nodes.name=arr[i].name;  
    }
    
    output.push(nodes);
}
    return output.sort();
}

export function uniqueNodeswithoutUndefine(data)
{    let nodesArray=[];
    for (var i = data.length - 1; i >= 0; i--) {
        if (data[i].disp) {
            nodesArray.push(data[i]);
        }
    }
    return nodesArray;
}

export function uniqueNodesWithIndex(arr) {
var output = [], l = arr.length, i;
for( i=0; i<l; i++) {
    let nodes={};
    if(!isNaN(arr[i].disp.substring(0, 1)))
    {
        if (arr[i].disp.substring(0, 2).includes('-')) {
           nodes.disp=arr[i].disp.substring(0, 1); 
        }
        else
        {
           nodes.disp=arr[i].disp.substring(0, 2);
        }
    nodes.name=arr[i].name;   
    }
    else
    {
      nodes.disp=arr[i].disp;
    nodes.name=arr[i].name;  
    }
    
    output.push(nodes);
}
    return output.sort();
}

