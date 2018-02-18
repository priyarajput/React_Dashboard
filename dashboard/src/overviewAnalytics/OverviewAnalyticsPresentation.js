import * as React from "react";

import PageViewsPresentation from "./PageViewsPresentation";
import UsersPresentation from "./UsersPresentation";
import SessionPresentation from "./SessionPresentation";
import AcquisitionPresentation from "./AcquisitionPresentation";
import OptOutPresentation from "./OptOutPresentation";
import UninstallPresentation from "./UninstallPresentation";
import PageSessionPresentation from "./PageSessionPresentation";
import { Col, Row } from "@sketchpixy/rubix/lib/index";

export default class OverviewAnalyticsPresentation extends React.Component {

    render() {
        return (
            <Row>
                <Col md={12} >
                    <h3 style={{ marginTop: 0 }}>OverView</h3>
                </Col>
                <Col md={3}>
                    <PageViewsPresentation
                        language={this.props.language}
                        user={this.props.user}
                        headerFilter={this.props.headerFilter}
                        pageViews={this.props.pageViews}
                        isLoading={this.props.isLoadingPageView}
                        pageViewsGraphData={this.props.pageViewsGraphData}
                        pageViewsGraphKeys={this.props.pageViewsGraphKeys} />
                </Col>

                <Col md={3}>
                    <UsersPresentation
                        language={this.props.language}
                        user={this.props.user}
                        headerFilter={this.props.headerFilter}
                        usersViewsGraphData={this.props.usersViewsGraphData}
                        usersViewsGraphKeys={this.props.usersViewsGraphKeys}
                        usersViews={this.props.usersViews}
                        isLoading={this.props.isLoadingUsersView} />
                </Col>


                <Col md={3}>
                    <SessionPresentation
                        language={this.props.language}
                        user={this.props.user}
                        headerFilter={this.props.headerFilter}
                        sessionViewsGraphData={this.props.sessionViewsGraphData}
                        sessionViewsGraphKeys={this.props.sessionViewsGraphKeys}
                        sessionViews={this.props.sessionViews}
                        isLoading={this.props.isLoadingSessionView} />
                </Col>

                <Col md={3}>
                    <AcquisitionPresentation
                        language={this.props.language}
                        user={this.props.user}
                        headerFilter={this.props.headerFilter}
                        acquisitionGraphData={this.props.acquisitionGraphData}
                        acquisitionGraphKeys={this.props.acquisitionGraphKeys}
                        acquisitionViews={this.props.acquisitionViews}
                        isLoading={this.props.isLoadingAcquisitionView} />
                </Col>

                <Col md={3}>
                    <OptOutPresentation
                        language={this.props.language}
                        user={this.props.user}
                        headerFilter={this.props.headerFilter}
                        optOutGraphData={this.props.optOutGraphData}
                        optOutGraphKeys={this.props.optOutGraphKeys}
                        optOutViews={this.props.optOutViews}
                        isLoading={this.props.isLoadingOptOutView} />
                </Col>

                <Col md={3}>
                    <UninstallPresentation
                        language={this.props.language}
                        user={this.props.user}
                        headerFilter={this.props.headerFilter}
                        uninstallViewsGraphData={this.props.uninstallViewsGraphData}
                        uninstallViewsGraphKeys={this.props.uninstallViewsGraphKeys}
                        uninstallViews={this.props.uninstallViews}
                        isLoading={this.props.isLoadingUninstallView} />
                </Col>

                <Col md={3}>
                    <PageSessionPresentation
                        language={this.props.language}
                        user={this.props.user}
                        headerFilter={this.props.headerFilter}
                        pageSessionViewsGraphData={this.props.pageSessionViewsGraphData}
                        pageSessionViewsGraphKeys={this.props.pageSessionViewsGraphKeys}
                        pageSessionViews={this.props.pageSessionViews}
                        isLoading={this.props.isLoadingPageView} />
                </Col>
            </Row>
        )
    };
}