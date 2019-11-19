//HOOKS REDUCER
const currentHookState = []
const HookReducer = (state = currentHookState, action) => {
    switch (action.type) {
        case 'ADD_HOOK':
            return [...state, action.hookDetails]

        case 'DELETE_HOOK':
            return state.filter(({ id }) => id !== action.id)

        case 'EDIT_HOOK':
            return state.map((hook) => {
                if (hook.id === action.id) {
                    return {
                        ...hook,
                        ...action.updates
                    };
                }
                else {
                    return hook

                };
            });

        default:
            return state;
    }
}

export default HookReducer