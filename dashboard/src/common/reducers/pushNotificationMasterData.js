function pushNotificationMasterUpdate(state = [], action) {
    switch (action.type) {
        case "PUSH_NOTIFICATION_METADATA_REFRESH_DATA":
            return Object.assign({}, state, {
                pushNotification: action.pushNotification
            });
            break;
        default:
            return state
    }
}

module.exports = {
    pushNotificationMasterUpdate
};