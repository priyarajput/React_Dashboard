import * as React from "react";
import OverviewAnalyticsGraphPresentation from "./OverviewAnalyticsGraphPresentation";

import DistributionDropDownPresentation from "../header/distributionSelection/DistributionDropDownPresentation";
import moment from 'moment';
import LanguageDropDown from "../header/languageSelection/LanguageDropDownPresentation";
import DatePicker from "../reusable/DatePicker";
import {

  Modal, MenuItem,
  Button, Navbar, Nav, Row, NavItem
} from '@sketchpixy/rubix';

import { closeModelBox } from "./redux/overviewAnalyticsAction";
import { connect } from "react-redux";
import Overlay from "../common/Overlay.jsx";
// import {
//     computeGrain
// } from  '../header/redux/headerCreateReducer';

function computeGrain(fromDate, toDate) {
  if (moment(toDate).diff(moment(fromDate), 'hours') < 1) {
    return "minute";
  }
  else if (moment(toDate).diff(moment(fromDate), 'days') <= 1) {
    return "hour";
  }
  else if (moment(toDate).diff(moment(fromDate), 'days') <= 92) {
    return "day";
  }
  else if (moment(toDate).diff(moment(fromDate), 'days') > 90) {
    return "week";
  }
  else {
    return "day";
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.overviewAnalyticsGraphData.isLoading,
    isLoadingPageViewsGraphData: state.overviewAnalyticsGraphData.isLoadingPageViewsGraphData,
    isLoadingUsersViewsGraphData: state.overviewAnalyticsGraphData.isLoadingUsersViewsGraphData,
    isLoadingOptOutViewsGraphData: state.overviewAnalyticsGraphData.isLoadingOptOutViewsGraphData,
    isLoadingUninstallViewsGraphData: state.overviewAnalyticsGraphData.isLoadingUninstallViewsGraphData,
    isLoadingAcquisitionViewsGraphData: state.overviewAnalyticsGraphData.isLoadingAcquisitionViewsGraphData,
    isLoadingSessionViewsGraphData: state.overviewAnalyticsGraphData.isLoadingSessionViewsGraphData,
    modelGraphData: state.overviewAnalyticsGraphData.graphData,
    modelGraphKeys: state.overviewAnalyticsGraphData.graphKeys,
    isModelOpen: state.overviewAnalyticsGraphData.model ? state.overviewAnalyticsGraphData.model : false
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    closeModelBox: () => {
      dispatch(closeModelBox());
    },
    getOverviewAnalyticsPageViewsData: (headerFilter, title) => {
      dispatch({
        type: "OVERVIEW_ANALYTICS_PAGE_VIEWS_DATA_UPDATE_WATCHER",
        headerFilter: headerFilter,
        modelBox: true,
        title: title
      });
    },
    getOverviewAnalyticsUsersViewsData: (headerFilter) => {
      dispatch({
        type: "OVERVIEW_ANALYTICS_USERS_VIEWS_DATA_UPDATE_WATCHER",
        headerFilter: headerFilter,
        modelBox: true
      });
    },
    getOverviewAnalyticsOptOutViewsData: (headerFilter) => {
      dispatch({
        type: "OVERVIEW_ANALYTICS_DEVICE_OPTOUT_DATA_UPDATE_WATCHER",
        headerFilter: headerFilter,
        modelBox: true
      });
    },
    getOverviewAnalyticsAcquisitionViewsData: (headerFilter) => {
      dispatch({
        type: "OVERVIEW_ANALYTICS_ACQUISITIONS_VIEWS_DATA_UPDATE_WATCHER",
        headerFilter: headerFilter,
        modelBox: true
      });
    },

    getOverviewAnalyticsSessionViewsData: (headerFilter) => {
      dispatch({
        type: "OVERVIEW_ANALYTICS_SESSIONS_VIEWS_DATA_UPDATE_WATCHER",
        headerFilter: headerFilter,
        modelBox: true
      });
    },

    getOverviewAnalyticsUninstallsData: (headerFilter) => {
      dispatch({
        type: "OVERVIEW_ANALYTICS_UNINSTALL_VIEWS_DATA_UPDATE_WATCHER",
        headerFilter: headerFilter,
        modelBox: true
      });
    }
  }
};

@connect(mapStateToProps, mapDispatchToProps)

export default class ModalPresentation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      filter: {
        fromDate: moment().subtract(24, 'hour').format("YYYY-MM-DDTHH:mm:00.sssZ"),
        toDate: moment().format("YYYY-MM-DDTHH:mm:00.sssZ"),
        key: "Last 24 Hours",
        keyVal: "last24Hours",
        grain: "hour",
        distribution: props.headerFilter.distribution,
        dateNonDashboard: props.headerFilter.dateNonDashboard,
        grainNonDashboard: props.headerFilter.grainNonDashboard,
        language: props.headerFilter.language,
      }
    };
  }

  close() {
    this.setState({
      showModal: false,
      filter: {
        distribution: this.props.headerFilter.distribution,
        dateNonDashboard: this.props.headerFilter.dateNonDashboard,
        grainNonDashboard: this.props.headerFilter.grainNonDashboard,
        language: this.props.headerFilter.language,
      }
    });
    this.props.closeModelBox();
  }

  open() {
    this.setState({ showModal: true });
  }

  changeModelBoxDateSelection = (date) => {
    this.setState({
      showModal: true,
      filter: {
        distribution: this.state.filter.distribution,
        dateNonDashboard: date,
        grainNonDashboard: computeGrain(date.startDate, date.endDate),
        language: this.state.filter.language,
      }
    });

    setTimeout(() => {
      this.getData();
    }, 1000);
  };

  setOptions = () => {
    const dropDownKeys = this.props.user.languageList;
    if (dropDownKeys.indexOf("All") === -1)
      dropDownKeys.push("All");
    let rows = [];
    for (let i = 0; i < dropDownKeys.length; i++) {
      rows.push(<MenuItem key={dropDownKeys[i]} eventKey={dropDownKeys[i]}>{dropDownKeys[i]}</MenuItem>)
    }
    return rows;
  };

  updateFilterLanguage = (language) => {
    var value = language;
    if (value === 'All')
    { value = null; }
    this.setState({
      showModal: true,
      filter: {
        distribution: this.state.filter.distribution,
        dateNonDashboard: this.state.filter.dateNonDashboard,
        grainNonDashboard: this.state.filter.grainNonDashboard,
        language: value
      }
    });

    setTimeout(() => {
      this.getData();
    }, 1000);
  };

  updateDistribution = (display, appFilter, appColumn, subDimension, subDimensionValue) => {
    this.setState({
      showModal: true,
      filter: {
        distribution: {
          levelOneFilter: appFilter,
          levelOneValue: appColumn, levelTwoFilter: subDimension,
          levelTwoValue: subDimensionValue, display: display
        },
        dateNonDashboard: this.state.filter.dateNonDashboard,
        grainNonDashboard: this.state.filter.grainNonDashboard,
        language: this.state.filter.language
      }
    });
    setTimeout(() => {
      this.getData();
    }, 1000);
  };

  getData() {
    if (this.props.title === "Pageviews") {
      this.props.getOverviewAnalyticsPageViewsData(this.state.filter, "Pageviews");
    } else if (this.props.title === "Users") {
      this.props.getOverviewAnalyticsUsersViewsData(this.state.filter);
    } else if (this.props.title === "OptOut") {
      this.props.getOverviewAnalyticsOptOutViewsData(this.state.filter);
    } else if (this.props.title === "Acquisition") {
      this.props.getOverviewAnalyticsAcquisitionViewsData(this.state.filter);
    } else if (this.props.title === "Session") {
      this.props.getOverviewAnalyticsSessionViewsData(this.state.filter);
    } else if (this.props.title === "Page/Session") {
      this.props.getOverviewAnalyticsPageViewsData(this.state.filter, "PageSession");
    } else if (this.props.title === "Uninstall") {
      this.props.getOverviewAnalyticsUninstallsData(this.state.filter);
    }
  }

  render() {
    return (
      <div>
        <Button style={{ marginTop: "10px" }} disabled={this.props.count <= 0 ? true : false}
          bsStyle='primary' bsSize='small' onClick={::this.open}> {this.props.title} </Button>  
      <Modal show={this.state.showModal} onHide={::this.close} id = "modalBox" lg>


    

      <Overlay isLoading={this.props.isLoadingPageViewsGraphData ||
        this.props.isLoadingUsersViewsGraphData ||
        this.props.isLoadingOptOutViewsGraphData ||
        this.props.isLoadingUninstallViewsGraphData ||
        this.props.isLoadingAcquisitionViewsGraphData ||
        this.props.isLoadingSessionViewsGraphData}>
        <Modal.Header closeButton style={{ borderBottom: 0 }}>

          <Navbar fixedTop fluid id='rubix-nav-header'>
            <Row>
              <Nav bsStyle="pills" className='nav-orange45' activeKey={1}>
                <DistributionDropDownPresentation id="distributionPreference"
                  distribution={this.state.filter.distribution}
                  update={::this.updateDistribution}/>
                <NavItem style={{ padding: 0 }}>
                  <DatePicker date={this.state.filter.dateNonDashboard} changeDateSelection={this.changeModelBoxDateSelection} />
                </NavItem>
                <LanguageDropDown id="languagePreference" setOptions={::this.setOptions} language={this.state.filter.language} update={::this.updateFilterLanguage}/>
              </Nav>
            </Row>
          </Navbar>
          <Modal.Title>
            <img src={this.props.image ? this.props.image : '/imgs/common/piStats/overviewScreen/Pageview.png'} alt=''
              style={{ marginRight: "10px" }} />
            {this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <OverviewAnalyticsGraphPresentation
            rounded={this.props.rounded}
            graphData={this.props.isModelOpen ? this.props.modelGraphData : this.props.graphData}
            keys={this.props.isModelOpen ? this.props.modelGraphKeys : this.props.keys} />
        </Modal.Body>
      </Overlay>
     </Modal >
   </div >
    );
}
}