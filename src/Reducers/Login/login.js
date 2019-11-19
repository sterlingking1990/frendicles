const loginState = []
const LoginReducer = (state = loginState, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return [...state, action.userDetails]

        default:
            return state
    }
}

export default LoginReducer