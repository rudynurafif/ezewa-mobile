import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigation from './src/navigation/RootNavigator';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import BuildingDetail from './src/screens/HomeScreen/component/BuildingDetail';

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {/* <AppNavigation /> */}
        <HomeScreen />
        {/* <BuildingDetail /> */}
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
