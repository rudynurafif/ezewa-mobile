import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const getTransactionsHistory = createAsyncThunk(
  'transactions/getTransactionsHistory',
  async () => {
    try {
      const token = await AsyncStorage.getItem('token')

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await axios.get(`${BASE_URL}/api/transactions`, config)

      return response.data.data
    } catch (error) {
      throw error
    }
  }
)

const transactionSlice = createSlice({
  name: 'transactions',
  initialState: {
    loading: false,
    transactions: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTransactionsHistory.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getTransactionsHistory.fulfilled, (state, action) => {
        state.loading = false
        state.transactions = action.payload
        state.error = null
      })
      .addCase(getTransactionsHistory.rejected, (state, action) => {
        state.loading = false
        state.transactions = null
        state.error = action.error.message
      })
  },
})

export default transactionSlice.reducer
