import uuid from 'uuid'
const loginUser = ({ user_name = "", email = "", phone_number = "" }) => ({
    type: 'LOGIN_USER',
    userDetails: {
        id: uuid(),
        user_name,
        email,
        phone_number
    }

})

export default loginUser
