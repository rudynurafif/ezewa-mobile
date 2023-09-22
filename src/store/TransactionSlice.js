import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'


export const createTransaction = createAsyncThunk('transactions/createTransactions', async (transaction) => {
    try {
        const token = await AsyncStorage.getItem('token')
        
        const config = {
            headers: {
                Authorization: Bearer`${token}`,
            },
        }

        const response = await axios.post(`${BASE_URL}/api/transactions`)
        return response.data.data

    } catch (error) { throw error }
})


export const getAllTransaction = createAsyncThunk('transactions/getAllTransactions', async () => {
    try {
        const token = await AsyncStorage.getItem('token')
        const config = {
            headers: {
                Authorization: Bearer`${token}`
            },
        }

        const response = await axios.get(`${BASE_URL}/api/transactions/customer`)
        return response.data.data

    } catch (error) { throw error }
})

const transactionSlice = createSlice({
    name: 'transactions',
    initialState: {
        loading: false,
        error: null,
        transactions: [],
    },
    extraReducers: (builder) => {
        builder
        .addCase(createTransaction.fulfilled, (state, action) => {
            state.loading = false
            state.transactions = action.payload
            state.error = null
        })
        .addCase(createTransaction.pending, (state, action) => {
            state.loading = true
        })
        .addCase(createTransaction.rejected, (state,action) => {
            state.loading = false
            state.transactions = null
            if (action.error.message) {
                state.error = action.error.message
            }
        })
        .addCase(getAllTransaction.fulfilled, (state,action) => {
            state.loading = false
            state.error = null
            state.transactions = action.payload
        })
        .addCase(getAllTransaction.pending, (state, action) => {
            state.loading = true
        })
        .addCase(getAllTransaction.rejected, (state, action) => {
          state.loading = false
          state.transactions = null
          if(action.error.message){
           state.error = action.error.message 
          }
        })
    },
})

export default transactionSlice.reducer

