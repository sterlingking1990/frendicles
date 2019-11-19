//HOOKS VISIBILITY
export const getHooksVisibility = (hookReducer, { hook_text }) => {
    return hookReducer.filter((hook) => hook.description.toLowerCase().includes(hook_text.toLowerCase()))
}

export const getHooksToJoinVisibility = (hookReducer, { hook_text }) => {
    return hookReducer.filter((hook) => hook.description.toLowerCase().includes(hook_text.toLowerCase()))
}

