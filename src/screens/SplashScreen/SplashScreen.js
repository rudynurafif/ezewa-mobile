import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PATH from '../../navigation/NavigationPath'

export default function SplashScreen({navigation}) {

  React.useEffect(() => {
    setTimeout(() => {
      navigation.replace(PATH.LOGIN)
    }, 2000);
  }, [])

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../shared/assets/images/SplashScreen.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 400,
    height: 400,
  },
});