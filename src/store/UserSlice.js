import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import AsyncStorage from '@react-native-async-storage/async-storage'


export const loginUser = createAsyncThunk('user/loginUser', async (userCredentials) => {
  const request = await axios.post(`${BASE_URL}/api/auth/login`, userCredentials)
  const response = await request.data.data
  await AsyncStorage.setItem('token', response.token)
  await AsyncStorage.setItem('id', response.id)
  return response
})

export const registerUser = createAsyncThunk('user/registerUser', async (userCredentials) => {
  const request = await axios.post(`${BASE_URL}/api/auth/register`, userCredentials)
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
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.error = null
      })
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.user = null
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
      .addCase(registerUser.pending, (state, action) => {
        state.loading = true
      })
  },
})

export default userSlice.reducer
