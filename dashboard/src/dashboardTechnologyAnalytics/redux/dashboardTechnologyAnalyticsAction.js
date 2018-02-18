export function updateGraphTabSelection(selectedGraphTab) {
    return {
        type: 'TECHNOLOGY_ANALYTICS_GRAPH_TAB_SELECTION_UPDATE',
        selectedGraphTab
    }
}

export function updateTableTabSelection(selectedTableTab) {
    return {
        type: 'TECHNOLOGY_ANALYTICS_TABLE_TAB_SELECTION_UPDATE',
        selectedTableTab
    }
}
