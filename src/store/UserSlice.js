import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import AsyncStorage from '@react-native-async-storage/async-storage'


export const loginUser = createAsyncThunk('user/loginUser', async (userCredentials) => {
  const request = await axios.post(`${BASE_URL}/api/auth/login`, userCredentials)
  const response = await request.data.data
  // console.log(response.token)
  await AsyncStorage.setItem('token', response.token)
  return response
})

export const registerUser = createAsyncThunk('user/registerUser', async (userCredentials) => {
  const request = await axios.post(`${BASE_URL}/api/auth/register`, userCredentials)
  const response = await request.data.data
  return response
})

export const registerVendor = createAsyncThunk('user/registerVendor', async (userCredentials) => {
  const request = await axios.post(`${BASE_URL}/api/auth/register-vendor`, userCredentials)
  const response = await request.data.data
  return response
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.user = null
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.user = null
        console.log(action.error.message)
        if (action.error.message === 'Request failed with status code 400') {
          state.error = 'Access Denied! Invalid credentials!'
        } else {
          state.error = action.error.message
        }
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.error = null
      })
      .addCase(registerVendor.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.error = null
      })
  },
})

export default userSlice.reducer
