export function updateOpenRate(openRate) {
    return {
        type: 'PUSH_PERFORMANCE_OPEN_RATE_REFRESH',
        openRate
    }
}

export function updateReach(totalReach) {
    return {
        type: 'PUSH_PERFORMANCE_REACH_DATA_REFRESH',
        totalReach
    }
}

export function updateActiveDevices(activeDevices) {
    return {
        type: 'PUSH_PERFORMANCE_ACTIVE_DEVICES_DATA_REFRESH',
        activeDevices
    }
}

export function updatePushInfluencedViews(pushViews) {
    return {
        type: 'PUSH_PERFORMANCE_INFLUENCED_VIEWS_REFRESH',
        pushViews
    }
}