import uuid from 'uuid'
export const addHook = ({hook='',description=''}) => ({
    type: 'ADD_HOOK',
    hookDetails: {
        id: uuid(),
        hook,
        description
    }
})
//EDIT_HOOK
export const editHook = (id, updates) => ({
    type: 'EDIT_HOOK',
    id: id,
    updates

})
//DELETE_HOOK
export const deleteHook = (id) => ({
    type: 'DELETE_HOOK',
    id
})