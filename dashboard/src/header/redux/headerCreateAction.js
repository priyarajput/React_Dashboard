//update language in header
export function updateHeaderLanguage(language) {
    return {
        type: 'HEADER_LANGUAGE_SELECTION',
        language
    }
}

export function updateHeaderDistribution(distribution) {
    return {
        type: 'HEADER_DISTRIBUTION_SELECTION',
        distribution
    }
}

//update date in header
export function updateHeaderDate(keyVal,key,date) {
    return {
        type: 'HEADER_DATE_SELECTION',
        date,
        key,
        keyVal
    }
}

//update property in header
export function updatePropertyHeader(propertyId) {
    return {
        type: 'HEADER_PROPERTY_SELECTION',
        propertyId
    }
}


export function changeDateSelection(date) {
    return  {
        type: 'CHANGE_DATE',
            date
    };
}