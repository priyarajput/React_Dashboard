const initialState = {

    disableUserAPISuccess: false

};

function userListData(state = initialState, action) {
    switch (action.type) {
        case "USER_LIST_DATA_UPDATE":
            let data = transformData(action.userListData);
            return Object.assign({}, state, {
                isLoading: false,
                userLists: data
            });
            break;
        case "USER_LIST_DATA_FETCH":
            return Object.assign({}, state, {
                isLoading: true
            });
            break;
        case "USER_LIST_DATA_FETCH_FAILED":
            return Object.assign({}, state, {
                isLoading: false
            });
            break;
        default:
            return state
    }
}


module.exports = {
    userListData
};

export function transformData(data) {
    let unique = {};
    let distinct = [];
    data.map(list => {
        if (typeof (unique[list.email]) == "undefined") {
            distinct.push(list.email);
        }
        unique[list.email] = 0;
    });

    let mergeData = [];

    distinct.map(distinctDataList => {
        let arr = [];
        let obj = {};

        data.map(userList => {
            if (distinctDataList == userList.email) {
                arr.push(userList.role)
                obj["email"] = userList.email;
                obj["name"] = userList.name;
                obj["active"] = userList.active;
                obj["roleMap"] = arr;
            }
        });
        mergeData.push(obj);

    });
    return mergeData;
}