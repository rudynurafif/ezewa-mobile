import { LOGIN, LOGOUT } from "../../utils/constants"

function loginAction() {
  return {
    type: LOGIN,
  }
}

function logoutAction() {
  return {
    type: LOGOUT,
  }
}

export { loginAction, logoutAction }
