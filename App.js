import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import AppNavigation from './src/navigation/RootNavigator'
import DepProvider from './src/context/DependencyContext'
import configureStore from './src/store/store'
import apiClient from './src/service/ApiClient'
import { Provider } from 'react-redux'

export default function App() {
  const store = configureStore()
  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <DepProvider services={{ apiClient: apiClient }}>
          <AppNavigation />
          <StatusBar style='auto' />
        </DepProvider>
      </Provider>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
