export function updateDimensionPushOpen(dimensionPerformance) {
    return {
        type: 'DIMENSION_PERFORMANCE_DATA_UPDATE',
        dimensionPerformance
    }
}

export function updateDimensionSelection(dimensionSelection) {
    return {
        type: 'DIMENSION_PERFORMANCE_SELECTION_UPDATE',
        dimensionSelection
    }
}