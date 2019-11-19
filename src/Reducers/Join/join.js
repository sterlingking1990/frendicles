//REDUCER FOR JOIN
const joinHookState = []
const JoinHookReducer = (state = joinHookState, action) => {
    switch (action.type) {
        case 'JOIN_HOOK':
            return [...state, action.joinDetails]
        case 'UNJOIN_HOOK':
            return state.filter((join) => join.id !== action.id)

        default:
            return state
    }

}

export default JoinHookReducer