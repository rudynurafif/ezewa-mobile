import { Text, TextInput, View, Image, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import registerStyles from './RegisterScreen.style'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import SubmitButton from '../../shared/components/SubmitButton'
import { registerUser, registerVendor } from '../../store/UserSlice'
import { onNavigate } from '../../navigation/RootNavigation'
import { Card } from 'react-native-elements'
import PATH from '../../navigation/NavigationPath'

export default function RegisterScreen() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { loading, error } = useSelector((state) => state.user)
  const navigation = useNavigation()
  const [inputErrors, setInputErrors] = useState({
    isValidEmail: '',
    isValidPassword: '',
  })

  const [isVendorRegister, setIsVendorRegister] = useState(false)

  const toggleRegisterType = () => {
    setIsVendorRegister(!isVendorRegister)
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

  const submitRegister = () => {
    const errors = validateInputs()

    if (Object.keys(errors).length > 0) {
      setInputErrors(errors)
    } else {
      let userCredentials = {
        email,
        password,
      }

      if (isVendorRegister) {
        dispatch(registerVendor(userCredentials)).then((result) => {
          if (result.payload) {
            setEmail('')
            setPassword('')
            Alert.alert('Success', 'Successfully registered your vendor account!')
            onNavigate({
              routeName: PATH.LOGIN,
              isReplace: true,
            })
          }
        })
      } else {
        dispatch(registerUser(userCredentials)).then((result) => {
          if (result.payload) {
            setEmail('')
            setPassword('')
            Alert.alert('Success', 'Successfully registered your user account!')
            onNavigate({
              routeName: PATH.LOGIN,
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
    <View style={registerStyles.container}>
      <View style={registerStyles.logoSection}>
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
              {isVendorRegister ? 'Register Vendor' : 'Register User'}{' '}
            </Text>
          </Card.Title>
          <Card.Divider />
          <View style={registerStyles.form}>
            <TouchableOpacity
              onPress={toggleRegisterType}
              style={{ position: 'absolute', top: 10, right: 10 }}
            >
              <Text style={{ color: '#233d90' }}>
                {isVendorRegister
                  ? 'Tap here to Register as Customer'
                  : 'Tap here to Register as Vendor'}
              </Text>
            </TouchableOpacity>

            <Text style={registerStyles.label}>Email</Text>
            <TextInput
              onChangeText={(val) => {
                setEmail(val)
                setInputErrors({
                  ...inputErrors,
                  isValidEmail: '',
                })
              }}
              placeholder='Email'
              style={registerStyles.input}
            />
            {isErrorView(inputErrors.isValidEmail)}
            <Text style={registerStyles.label}>Password</Text>
            <TextInput
              onChangeText={(val) => {
                setPassword(val)
                setInputErrors({
                  ...inputErrors,
                  isValidPassword: '',
                })
              }}
              style={registerStyles.input}
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
                title={loading ? 'Loading..' : 'Register'}
                additionalSyle={{ backgroundColor: '#233d90' }}
                colorText={{ color: 'white' }}
                onSubmit={submitRegister}
              />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(PATH.LOGIN)
                }}
                style={{ marginTop: 10 }}
              >
                <Text style={{ color: '#233d90' }}>
                  Already have an account? Login here
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Card>
      </View>
    </View>
  )
}
