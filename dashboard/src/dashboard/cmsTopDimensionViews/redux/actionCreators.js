export function refresh(dimensionData, dimension) {
    return {
        type: 'CMS_TOP_DIMENSION_DATA_REFRESH',
        dimensionData,
        dimension
    }
}