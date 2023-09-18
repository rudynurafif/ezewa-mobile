import { Text, TextInput, View, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import loginStyles from './LoginScreen.style'

import { useSelector, useDispatch } from 'react-redux'
import SubmitButton from '../../shared/components/SubmitButton'
import { loginUser } from '../../store/UserSlice'
import { onNavigate } from '../../navigation/RootNavigation'

export default function LoginForm() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { loading, error } = useSelector((state) => state.user)

  const [inputErrors, setInputErrors] = useState({
    isValidEmail: '',
    isValidPassword: '',
  })

  const validateInputs = () => {
    const errors = {}
    if (email.trim() === '') {
      errors.isValidEmail = 'Username or email is required'
    }
    if (password.trim() === '') {
      errors.isValidPassword = 'Password is required'
    }
    return errors
  }

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error)
    }
  }, [error])

  const submitLogin = () => {
    const errors = validateInputs()

    if (Object.keys(errors).length > 0) {
      setInputErrors(errors)
    } else {
      let userCredentials = {
        email,
        password,
      }
      dispatch(loginUser(userCredentials)).then((result) => {
        if (result.payload) {
          setEmail('')
          setPassword('')
          onNavigate({
            routeName: PATH.HOME,
            isReplace: true,
          })
        }
      })
    }
  }

  const isErrorView = (errorValidation) => {
    if (errorValidation) {
      return <Text style={{ color: 'red', marginBottom: 7 }}>{errorValidation}</Text>
    }
  }

  return (
    <View style={loginStyles.container}>
      <View style={loginStyles.logoSection}>
        <Image
          style={{
            width: '80%',
            height: 250,
          }}
          source={require('../../shared/assets/undraw_apartment_rent_o0ut.png')}
        />
      </View>
      <View style={{ flex: 2, paddingHorizontal: 15 }}>
        <View style={loginStyles.form}>
          <View style={loginStyles.headerForm}>
            <Text style={loginStyles.title}>Welcome to Ezewa!</Text>
          </View>
          <Text style={loginStyles.label}>Email</Text>
          <TextInput
            onChangeText={(val) => {
              setEmail(val)
              setInputErrors({
                ...inputErrors,
                isValidEmail: '',
              })
            }}
            placeholder='Email'
            style={loginStyles.input}
          />
          {isErrorView(inputErrors.isValidEmail)}
          <Text style={loginStyles.label}>Password</Text>
          <TextInput
            onChangeText={(val) => {
              setPassword(val)
              setInputErrors({
                ...inputErrors,
                isValidPassword: '',
              })
            }}
            style={loginStyles.input}
            secureTextEntry={true}
            placeholder='password'
          />
          {isErrorView(inputErrors.isValidPassword)}
          <View
            style={{
              marginVertical: 6,
            }}
          >
            <SubmitButton
              title={loading ? 'Loading..' : 'Login'}
              additionalSyle={{ backgroundColor: '#233d90' }}
              colorText={{ color: 'white' }}
              onSubmit={submitLogin}
            />
          </View>
        </View>
      </View>
    </View>
  )
}
