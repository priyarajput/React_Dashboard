import OverlayLoader from "react-overlay-loading/lib/OverlayLoader";
import * as React from "react";

export default class Overlay extends React.Component {
    render() {
        return (
            <OverlayLoader
                color={'#129B81'}
                loader="ScaleLoader"
                active={this.props.isLoading}
                backgroundColor={'black'}
                opacity=".6"
                zIndex={99}
            > {this.props.children}
            </OverlayLoader>)
    }
}