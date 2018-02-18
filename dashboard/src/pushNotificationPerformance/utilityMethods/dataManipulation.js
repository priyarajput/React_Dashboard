export function sum(prev, next) {
    return prev + next
}

export function transformToTable(apiData) {
    let tableData = [];
    apiData.result.map(dataPoint=>{
        if(dataPoint.openRate>0 && dataPoint.pushInfluencedViews>0) {
            let tableDataElement = {};
            tableDataElement.openRate = dataPoint.openRate;
            tableDataElement.pushInfluencedViews = dataPoint.pushInfluencedViews;
            tableDataElement.dimension = dataPoint.dimension;
            tableData.push(tableDataElement);
        }
    });
    return tableData;
}

