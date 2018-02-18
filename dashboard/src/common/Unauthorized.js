import * as React from "react";
import {Alert, Button} from "@sketchpixy/rubix/lib/index";
import {getUserRoles} from "../services/api";

export default class Unauthorized extends React.Component {
    redirect(){
        let array = getUserRoles();
        console.log("getUserRoles",array);
        if(array.indexOf("performanceManager")!==-1){
            this.props.router.push('/dashboard');
        }else if(array.indexOf("notificationManager")!==-1){
            this.props.router.push('/piStats/pushNotifications/list');
        }
        else if(array.indexOf("cmsAnalyst")!==-1){
            this.props.router.push('/cmsAnalytics/content');
        }else{
            this.props.router.push('/dashboard');
        }
    }
    render() {
        return (
            <div style={{textAlign: "center"}}>
                <Alert style={{backgroundColor: "#283232"}}>
                    <h4 style={{color: "white"}}>Oh snap! You are not authorized to view that page!</h4>
                    <p style={{color: "white"}}>Reach out to your organizations administrator to request for access</p>
                    <p>
                        <Button bsStyle="danger" style={{backgroundColor: "orange"}} onClick={::this.redirect} >Go back to home</Button>
                    </p>
                </Alert>
            </div>
        );
    }

}