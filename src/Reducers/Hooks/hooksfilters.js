//HOOKS FILTER REDUCER
const currentFilterState = { hook_text: '' }
const HookFilterReducer = (state = currentFilterState, action) => {
    switch (action.type) {
        case 'SET_HOOK_TEXT':
            return { ...state, hook_text: action.hook_text }//if key exists, it will replace it as no two key can be the same
        default:
            return state;
    }

}

export default HookFilterReducer