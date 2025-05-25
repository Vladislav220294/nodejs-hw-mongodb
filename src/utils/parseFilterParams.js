function parseContactType(value) {
    
    if (typeof value === 'undefined') {
        return undefined
    };
    const contactTypes = ['work', 'home', 'personal'];
    if (contactTypes.includes(value) !== true) {
        return undefined
    };
    return value
};
function parseIsFavourite(value) {
    
    if (typeof value === 'string') {
        if (value.toLocaleLowerCase() === 'true') 
            return true
        
        if (value.toLocaleLowerCase() === 'false') return false
    }
    if (typeof value !== 'boolean') {
        return undefined
    };
    return value
}

export function parseFilterParams(query) {
    const { contactType, isFavourite } = query;
    const parsedContactType = parseContactType(contactType);
    const parsedIsFavourite = parseIsFavourite(isFavourite);
    return {
        contactType: parsedContactType,
        isFavourite: parsedIsFavourite
    }
}