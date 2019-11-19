//JOIN ACTIONS
import uuid from 'uuid'
export const joinHook = ({ place_id = "",createdAt=undefined} = {}) => ({
    type: 'JOIN_HOOK',
    joinDetails: {
        id: uuid(),
        place_id,
        createdAt
    }
})

export const unJoinHook = (id) => ({
    type: 'UNJOIN_HOOK',
    id
})