import * as React from "react";

import { connect } from "react-redux";
import UserListPresentation from "./UserListPresentation";

const mapStateToProps = (state) => {
    return {
        headerFilter: state.headerFilter,
        colorsArray: state.colors,
        isLoading: state.userListData.isLoading,
        userList: state.userListData.userLists ? state.userListData.userLists : [],
        userListData: state.userListData
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserList: (headerFilter) => {
            dispatch({
                type: "USER_LIST_DATA_UPDATE_WATCHER",
                headerFilter: headerFilter
            });
        }
    }
};

@connect(mapStateToProps, mapDispatchToProps)
export default class UserListContainer extends React.Component {

    componentWillMount() {
        this.props.getUserList(this.props.headerFilter);
    }

    handleAddUser = (event) => {
        this.props.router.push('/addUser');
    };


    render() {
        return (
            <UserListPresentation
                isLoading = { this.props.isLoading }
                colorsArray = { this.props.colorsArray }
                tableData = { this.props.userList }
                handleAddUser = {::this.handleAddUser } />
        )
};
}
