//VISIBILITY FOR PLACES

export const getPlacesVisibility = (placeReducer, placeFilter) => {
    return placeReducer.filter((place) => {
        const isTextFound = place.place_name.toLowerCase().includes(placeFilter.place_name.toLowerCase())

        return isTextFound
    })

}

export const getPlacesToJoinVisibility = (placeReducer, placeFilter, hookID) => {
    return placeReducer.filter((place) => {
        const isPlace = place.hooks.includes(hookID)
        const isTextFound = place.place_name.toLowerCase().includes(placeFilter.place_name.toLowerCase())

        return isPlace && isTextFound
    })

}

export const getPlacesJoinedVisibility = (placeReducer, placeFilter, joinHookReducer) => {
    return placeReducer.filter((place) => {
        const isPlace = place.id===joinHookReducer.place_id
        const isTextFound = place.place_name.toLowerCase().includes(placeFilter.place_name.toLowerCase())

        return isPlace && isTextFound
    })

}


