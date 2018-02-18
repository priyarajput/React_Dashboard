import * as React from "react";
import ReactTable from 'react-table';
import "../../../../public/css/react-table.css";
import TableOverlay from "../../../common/TableOverlay.jsx";
import Overlay from "../../../common/Overlay.jsx";
import CsvDownloader from 'react-csv-downloader';
export default class AuthorAnalyticsPresentation extends React.Component {

    render() {
        return (
            <div>
                <CsvDownloader filename="authorAnalytics"
                               columns={this.props.columnsCSV}
                               datas={this.props.data}>
                    <button className="btn btn-lg btn-primary" style={{float: 'right', marginBottom: "15px"}} disabled={!this.props.data.length}>Download
                    </button>
                </CsvDownloader>
                <h3 style={{textAlign: "left"}}><img src='/imgs/common/piStats/authorAnalytics/Authors.png' alt=''
                                                     style={{marginRight: "5px"}}/> Authors List </h3>
                <div style={{height: "700px"}}>
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
                            style={{height: '700px'}}
                            filterable={true}
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

AuthorAnalyticsPresentation.defaultProps={
    columnsCSV : [{
        id: 'dimension',
        displayName: 'Author Name'
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
