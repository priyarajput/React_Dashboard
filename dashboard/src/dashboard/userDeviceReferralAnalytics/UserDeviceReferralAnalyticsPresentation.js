import {BPanel, Col, Grid, Row} from "@sketchpixy/rubix/lib/index";
import ActiveVisitorContainer from "./activeVsReturing/activeVisitor/ActiveVisitorContainer";
import ActiveVsReturningContainer from "./activeVsReturing/activeVsReturning/ActiveVsReturningContainer";
import DistributionSplitContainer from "./distributionSplit/DistributionSplitContainer";
import ReferralOriginSplitContainer from "./referralOriginSplit/ReferralOriginSplitContainer";
import * as React from "react";
export default class UserDeviceReferralAnalyticsPresentation extends React.Component {

    render() {

        return (
            <BPanel>
                <Grid>
                    <Row>
                        <Col md={4}>
                            <Grid>
                                <Row> <Col md={12}> <ActiveVisitorContainer/> </Col></Row>
                                <Row> <Col md={12}> <ActiveVsReturningContainer/> </Col></Row>
                            </Grid>
                        </Col>
                        <Col md={3}> <DistributionSplitContainer/> </Col>
                        <Col md={5}> <ReferralOriginSplitContainer/> </Col>
                    </Row>
                    <br/>
                    <br/>
                </Grid>
            </BPanel>
        );
    }

}