import { useDispatch } from 'react-redux'
import { showError, showLoading } from '../../store/AppAction'
import { onNavigate } from '../../navigation/RootNavigation'
import PATH from '../../navigation/NavigationPath'
import { loginAction } from '../../store/login/LoginAction'

export const Login = (service) => {
  const dispatch = useDispatch()
  const { login } = service()

  const onAuthenticate = async (email, password) => {
    try {
      dispatch(showLoading(true))
      await login(email, password)
      dispatch(loginAction())
      onNavigate({
        routeName: PATH.HOME,
        isReplace: true,
      })
    } catch (error) {
      dispatch(showError(error))
    } finally {
      dispatch(showLoading(false))
    }
  }

  const onDismissError = () => dispatch(showError(''))
  return {
    onAuthenticate,
    onDismissError,
  }
}
