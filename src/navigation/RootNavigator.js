import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import PATH from './NavigationPath'
import { navigationRef } from './RootNavigation'
import HomeScreen from '../screens/HomeScreen/HomeScreen'
import BuildingDetail from '../screens/HomeScreen/component/BuildingDetail'
import SplashScreen from '../screens/SplashScreen/SplashScreen'
import LoginScreen from '../screens/LoginScreen/LoginScreen'
import LandingScreen from '../screens/LandingScreen/LandingScreen'
import RegisterForm from '../screens/RegisterScreen/RegisterScreen'
import TransactionHistoryScreen from '../screens/TransactionHistoryScreen/TransactionHistoryScreen'

const Stack = createNativeStackNavigator()

const AppNavigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={PATH.SPLASH}
        screenOptions={{ contentStyle: { backgroundColor: 'white' } }}
      >
        <Stack.Screen
          name={PATH.SPLASH}
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={PATH.LOGIN}
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={PATH.REGISTER}
          component={RegisterForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={PATH.LANDING}
          component={LandingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={PATH.HOME}
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={PATH.BUILDING_DETAIL}
          component={BuildingDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={PATH.TRANSACTIONS_HISTORY}
          component={TransactionHistoryScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation
