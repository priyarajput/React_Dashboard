export function transformToGraph(apiData,dimensionToSort) {
    let graphData = [];
    if(dimensionToSort==="pageViews")
    {
    apiData.graphData.data.map(dataPoint=>{
        let graphDataElement={};
        graphDataElement.dt=dataPoint.dt;
        graphDataElement.pageViews=dataPoint.pageViews;
        graphData.push(graphDataElement);
        
    })
}
else if(dimensionToSort==="users")
{
  apiData.graphData.data.map(dataPoint=>{
        let graphDataElement={};
        graphDataElement.dt=dataPoint.dt;
        graphDataElement.users=dataPoint.users;
        graphData.push(graphDataElement);
        
    })   
}
else if(dimensionToSort==="session")
{
    apiData.graphData.data.map(dataPoint=>{
        let graphDataElement={};
        graphDataElement.dt=dataPoint.dt;
        graphDataElement.session=dataPoint.session;
        graphData.push(graphDataElement);
        
    })
}
    return graphData;
}

export function transformToTable(apiData) {
    let tableData = [];
    apiData.map(dataPoint=>{
        let tableDataElement={};
        tableDataElement.dimension=dataPoint.event.dimension;
        tableDataElement.pageViews=dataPoint.event.pageViews;
        tableDataElement.users=dataPoint.event.users;
        tableDataElement.session=dataPoint.event.session;
        tableData.push(tableDataElement);
        
    });
    return tableData;
}
