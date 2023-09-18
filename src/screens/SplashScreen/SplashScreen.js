import { StyleSheet, View, Image, Text } from 'react-native'
import React from 'react'

import PATH from '../../navigation/NavigationPath'

export default function SplashScreen({ navigation }) {
  React.useEffect(() => {
    setTimeout(() => {
      navigation.replace(PATH.LOGIN)
    }, 2000)
  }, [])

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{
          uri: 'https://media.tenor.com/xzM6oRwPFrMAAAAi/rolling-jackass.gif',
        }}
      />
      <Text
        style={{
          fontSize: 25,
          fontWeight: 'bold',
          marginTop: 10,
          color: '#233D90',
        }}
      >
        Ezewa
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
})
