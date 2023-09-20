import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import AppNavigation from './src/navigation/RootNavigator'
import { Provider } from 'react-redux'
import store from './src/store/index'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store} >
        <AppNavigation sty/>
        <StatusBar style='auto' />
      </Provider>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})
