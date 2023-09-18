import { LOGIN, LOGOUT } from "../../utils/constants"

const initialState = {
  isLoggedIn: false,
}

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        isLoggedIn: true,
      }
    case LOGOUT:
      return {
        isLoggedIn: false,
      }
    default:
      return state
  }
}

export default LoginReducer
