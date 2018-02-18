export function transformToTableAndDropDown(data, dimensionToSortOnFunction) {
    let uniqueDimensions = uniqueBy(data, getDimension); //this can be pushed into drop down
    let tableResult = [];
    uniqueDimensions.map(dimension => {

            let tableRow = {};
            let oneDimensionData = data.filter(data => getDimension(data) === dimension);

            let pageViewsSum = oneDimensionData.map(data => getPageViews(data)).reduce(sum, 0);
            let sessionsSum = oneDimensionData.map(getSession).reduce(sum, 0);
            let usersSum = oneDimensionData.map(getUsers).reduce(sum, 0);
            tableRow.pageViews = pageViewsSum;
            tableRow.sessions = sessionsSum;
            tableRow.users = usersSum;
            tableRow.dimension = dimension;
            tableResult.push(tableRow);
        }
    );
    let topFiveDimensionsForGraphWithValues = tableResult.sort(function (a, b) {
        return dimensionToSortOnFunction(b) - dimensionToSortOnFunction(a)
    }).slice(0, 5);
    let topFiveDimensions = topFiveDimensionsForGraphWithValues.map(top5 => top5.dimension);
    return {tableResult, uniqueDimensions, topFiveDimensions};
}

export function transformForPieChart(apiData,dimensionToExtract){
    let totalSum = apiData.map(dimensionToExtract).reduce(sum,0);
    let pieData = apiData.map(data=>{
        data['percent']=(dimensionToExtract(data)/totalSum)*100;
        return data;
    });
    let color =["#A06666", "#5EA0A0", "#D4CBE5", "#c45baa", "#DBD56E", "#88AB75", "#2D93AD", "#DFF2D8", "#C6DEA6", "#7EBDC3", "#8BB174", "#426B69", "#5C574F", "#48483A", "#93032E", "#A6A15E", "#034C3C", "#27474E", "#E1D89F"];
    let othersPie = pieData.filter(data=>data.percent<=3).map(dimensionToExtract).reduce(sum,0);
    let index = 0;
    let pieDataResult = pieData.filter(data=>data.percent>3).map(data=>{
        let dimensionOnGraph = dimensionToExtract(data);
        let graphDataSinglePoint ={};
        graphDataSinglePoint.name=data.dimension;
        graphDataSinglePoint.value=dimensionOnGraph;
        graphDataSinglePoint.color=color[index];
        index++;
        return graphDataSinglePoint;
    });
    pieDataResult.push({name:'Others',value:othersPie,color:'#f45866'});
    return pieDataResult;
}

export function transformToGraph(apiData,topFiveDimensionsForGraph, dimensionToSortOnFunction) {
    let top5DimensionData = apiData.filter(data => topFiveDimensionsForGraph.includes(getDimension(data)));
    let uniqueTimestamps = uniqueBy(apiData, getTimestamp);
    let graphData = [];
    uniqueTimestamps.map(timestamp => {
            let graphDataElement = {};
            graphDataElement.dt = timestamp;

            top5DimensionData.filter(data => data.timestamp === timestamp).map(data =>
                graphDataElement[getDimension(data)] = dimensionToSortOnFunction(data));
            graphData.push(graphDataElement);
        }
    );
    return graphData;
}


export function getSession(item) {
    return Math.round(item.session)
}

export function getDimension(item) {
    return item.dimension
}

export function getTimestamp(item) {
    return item.timestamp
}

export function getPageViews(item) {
    return Math.round(item.pageViews)
}

export function getUsers(item) {
    return Math.round(item.users)
}

export function sum(prev, next) {
    return prev + next
}

export function uniqueBy(arr, fn) {
    let unique = {};
    let distinct = [];
    arr.map(x => {
        let key = fn(x);
        if (!unique[key] && key) {
            distinct.push(key);
            unique[key] = true;
        }
    });
    return distinct.sort();
}