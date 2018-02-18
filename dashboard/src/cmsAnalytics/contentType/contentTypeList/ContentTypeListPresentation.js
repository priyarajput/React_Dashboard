import * as React from "react";
import ReactTable from 'react-table';
import "../../../../public/css/react-table.css";
import TableOverlay from "../../../common/TableOverlay.jsx";
import Overlay from "../../../common/Overlay.jsx";
import CsvDownloader from 'react-csv-downloader';

export default class ContentTypePresentation extends React.Component {

    render() {
        return (
            <div>
                <CsvDownloader filename="contentTypeAnalytics"
                               columns={this.props.columnsCSV}
                               datas={this.props.data}>
                    <button className="btn btn-lg btn-primary" style={{float: 'right', marginBottom: "15px"}} disabled={!this.props.data.length}>Download
                    </button>
                </CsvDownloader>
                <h3 style={{textAlign: "left"}}> Content Type </h3>
                    <div style={{minHeight: "500px"}}>
                        <Overlay isLoading={this.props.isLoadingTable}>
                        <ReactTable
                            LoadingComponent={TableOverlay}
                            loading={this.props.isLoading}
                            columns={this.props.columns}
                            data={this.props.data}
                            defaultPageSize={this.props.data.length}
                            className={this.props.className}
                            getNoDataProps={() => {
                                return {
                                    style: {
                                        display: "none"
                                    }
                                }
                            }}
                            filterable={true}
                            style={{height:'500px'}}
                            defaultFilterMethod={this.props.filterCaseInsensitive}
                            showPagination={false}
                            colorsArray={this.props.colorsArray}
                            defaultSorted={[
                                {
                                    id: "cmsPerformanceIndex",
                                    desc: true
                                }
                            ]}
                        />
                        </Overlay>
                    </div>
            </div>

        );
    }
}

ContentTypePresentation.defaultProps={
    columnsCSV : [{
        id: 'dimension',
        displayName: 'Content Type'
    }, {
        id: 'publishedContent',
        displayName: 'Published Content'
    }, {
        id: 'pageViews',
        displayName: 'Page Views'
    }, {
        id: 'cmsPerformanceIndex',
        displayName: 'Performance Index'
    }]
};
