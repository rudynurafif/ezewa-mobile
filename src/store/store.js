import { combineReducers, createStore } from 'redux'
import LoginReducer from './login/LoginReducer'
import AppReducer from './AppReducer'

const rootReducer = combineReducers({
  LoginReducer,
  AppReducer,
})

const configureStore = () => {
  return createStore(rootReducer)
}

export default configureStore
