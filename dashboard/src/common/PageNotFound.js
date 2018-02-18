
import * as React from "react";
export default class PageNotFound extends React.Component {


    render() {
        var sectionStyle = {
            margin:"auto",
            width: "100%",
            height: "300px",
            backgroundImage: "url(imgs/common/piStats/Group_450.png)",
            backgroundSize:"contain",
            backgroundPosition:"top",
            Background: "cover",
            backgroundRepeat:"no-repeat"
          };
        return (
            <div style={{ textAlign: "center", color: "#6ED9C4",marginTop:"140px", }}>
                <div style={ sectionStyle }>
                    <img src='/imgs/common/piStats/Group 474.png' width="20%" style={{marginTop:"40px"}}/>
                <h4 style={{marginTop:"30px"}}>The page you're looking for doesn't exist.</h4>
                </div>
            </div>
        );
    }
}