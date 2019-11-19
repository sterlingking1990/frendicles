const placeState = [];
const PlaceReducer = (state = placeState, action) => {
    switch (action.type) {
        case 'ADD_PLACE':
            return [...state, action.placeDetails]
        case 'EDIT_PLACE':
            return state.map((place) => {
                if (place.id === action.id) {
                    return {
                        ...place,
                        ...action.updates
                    };
                }
                else {
                    return place
                }
            });
        case 'DELETE_PLACE':
            return state.filter((place) => place.id !== action.id)

        default:
            return state
    }
}

export default PlaceReducer