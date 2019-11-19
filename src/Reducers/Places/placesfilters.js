//FILTER FOR PLACES
const place_filter_state = { place_name: "" }
const PlaceFilterReducer = (state = place_filter_state, action) => {
    switch (action.type) {
        case 'SET_PLACE_FILTER':
            return { ...state, place_name: action.place_name }

        default:
            return state
    }
}

export default PlaceFilterReducer