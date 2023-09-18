import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { onNavigate } from '../../navigation/RootNavigation';

const LandingScreen = () => {
  const openLogin = () => {
    onNavigate({
      routeName: PATH.LOGIN,
      isReplace: true,
    });
  };

  const openGetStarted = () => {
    onNavigate({
      routeName: PATH.REGISTER,
      isReplace: true,
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../shared/assets/images/landing.jpg')}
        style={styles.bgImage}
      >
        <View style={styles.header}>
          <Text style={styles.title}>ezewa.</Text>
          <TouchableOpacity style={styles.loginButton} onPress={openLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text style={styles.subTitle}>ezewa</Text>
          <Text style={styles.description}>renting has never been simpler.</Text>
          <TouchableOpacity style={styles.getStartedButton} onPress={openGetStarted}>
            <Text style={styles.getStartedButtonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.footerText}>Made with 🤍 by Keluarga Cemara.</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: 'white',
  },
  loginButton: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  subTitle: {
    fontSize: 48,
    fontWeight: '600',
    color: 'white',
    marginBottom: 10,
  },
  description: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  getStartedButton: {
    backgroundColor: 'white',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 50,
  },
  getStartedButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
  },
  footerText: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontWeight: '600',
    color: '#6FA8AF',
    marginBottom: 20,
  },
});


export default LandingScreen;
