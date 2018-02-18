import * as React from "react";
import ReactTable from 'react-table';
import "../../../public/css/react-table.css";
import TableOverlay from "../../common/TableOverlay.jsx";
import CsvDownloader from 'react-csv-downloader';
import CtrDataPresentation from "./CtrDataPresentation";



export default class PushNotificationListPresentation extends React.Component {

    render() {
        return (
            <div>
                <CsvDownloader filename="PushNotificationTable"
                    columns={this.props.columnsCsv}
                    datas={this.props.downloadTableData} >
                    <button className="btn btn-lg btn-primary pushNotificationListDownloadButton" disabled={!this.props.downloadTableData.length}>Download</button>
                </CsvDownloader>
                <h3 className='pushNotificationListText'> Push Notification List </h3>
                <div style={{ height: "700px" }}>
                    <ReactTable
                        LoadingComponent={TableOverlay}
                        columns={this.props.columns}
                        data={this.props.data}
                        defaultPageSize={this.props.data.length}
                        className={this.props.className}
                        onFetchData={this.props.fetchData}
                        colorsArray={this.props.colorsArray}
                        manual
                        loading={this.props.isLoading}
                        getNoDataProps={() => {
                            return {
                                style: {
                                    display: "none"
                                }
                            }
                        }}
                        style={{ height: '700px' }}
                        filterable={false}
                        showPagination={false}
                        defaultSorted={[
                            {
                                id: "dateOfSending",
                                desc: true
                            }
                        ]}
                        expanderDefaults= {{
                            sortable: true,
                            resizable: true,
                            filterable: false,
                        }}
                         SubComponent={row => {
                            if (row.original.topic.includes("Android"))
                             {
                                 return (
                                 <CtrDataPresentation
                                 pnId={row.original.id}
                                 row={row}
                                 CTRData={this.props.CTRData}
                                 ctrData={this.props.ctrData}
                                 isCTRLoading={this.props.isCTRLoading}
                                 colorsArray={this.props.colorsArray}
                                 />

                                  );
                             }
                         }
                    }
                    />
                </div>
            </div>

        );
    }

}

PushNotificationListPresentation.defaultProps = {
    columnsCsv: [{
        id: 'cntId',
        displayName: 'Content Id'
    }, {
        id: 'title',
        displayName: 'Notification Message'
    }, {
        id: 'type',
        displayName: 'Content Type'
    }, {
        id: 'cat',
        displayName: 'Category'
    }, {
        id: 'dt',
        displayName: 'Date Of Send'
    }, {
        id: 'rule',
        displayName: 'Rule'
    }, {
        id: 'lang',
        displayName: 'Language'
    }, {
        id: 'topic',
        displayName: 'Topic'
    },, {
        id: 'name',
        displayName: 'Sent By'
    }]
};

