import { Text, TextInput, View, Image, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import loginStyles from './LoginScreen.style'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import SubmitButton from '../../shared/components/SubmitButton'
import { loginUser } from '../../store/UserSlice'
import { onNavigate } from '../../navigation/RootNavigation'
import { Card } from 'react-native-elements'
import PATH from '../../navigation/NavigationPath'

export default function LoginForm() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { loading, error } = useSelector((state) => state.user)
  const navigation = useNavigation()
  const [inputErrors, setInputErrors] = useState({
    isValidEmail: '',
    isValidPassword: '',
  })

  const [isVendorLogin, setIsVendorLogin] = useState(false)

  const toggleLoginType = () => {
    setIsVendorLogin(!isVendorLogin)
  }

  const validateInputs = () => {
    const errors = {}
    if (email.trim() === '') {
      errors.isValidEmail = 'Email is required'
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

      if (isVendorLogin) {
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
      } else {
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
        <Card>
          <Card.Title>
            <Text style={{ fontSize: 20 }}>
              {isVendorLogin ? 'Vendor Login' : 'User Login'}
            </Text>
          </Card.Title>
          <Card.Divider />
          <View style={loginStyles.form}>
            <TouchableOpacity
              onPress={toggleLoginType}
              style={{ position: 'absolute', top: 10, right: 10 }}
            >
              <Text style={{ color: '#233d90' }}>
                {isVendorLogin
                  ? 'Tap here to Login as Customer'
                  : 'Tap here to Login as Vendor'}
              </Text>
            </TouchableOpacity>

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
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(PATH.REGISTER)
                }}
                style={{ marginTop: 10 }}
              >
                <Text style={{ color: '#233d90' }}>New to Ezewa? Register here</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Card>
      </View>
    </View>
  )
}
