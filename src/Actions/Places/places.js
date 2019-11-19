//ADD_PLACE
import uuid from 'uuid'
export const addPlace = ({ hooks = [], place_name = "", description = "", image = "", contact = "", createdAt = 0 } = {}) => ({
    type: 'ADD_PLACE',
    placeDetails: {
        id: uuid(),
        hooks,
        place_name,
        description,
        image,
        contact,
        createdAt
    }

})
//EDIT_PLACE
export const editPlace = (id, updates) => ({
    type: 'EDIT_PLACE',
    id,
    updates
})
//DELETE_PLACE
export const deletePlace = (id) => ({
    type: 'DELETE_PLACE',
    id
})