import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import SplashScreen from '../screens/SplashScreen/SplashScreen'

import PATH from './NavigationPath'
import LoginScreen from '../screens/LoginScreen/LoginScreen'
import { navigationRef } from './RootNavigation'
import { Login } from '../screens/LoginScreen/Login'
import LoginService from '../service/LoginService'
import HomeScreen from '../screens/HomeScreen/HomeScreen'

const Stack = createNativeStackNavigator()

const AppNavigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={PATH.SPLASH}>
        <Stack.Screen
          name={PATH.SPLASH}
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name={PATH.LOGIN} options={{ headerShown: false }}>
          {() => <LoginScreen login={() => Login(LoginService)} />}
        </Stack.Screen>
        <Stack.Screen
          name={PATH.HOME}
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation
