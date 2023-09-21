import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'

export const getBuildings = createAsyncThunk('buildings/getBuildings', async () => {
  const response = await axios.get(`${BASE_URL}/api/buildings`)
  // console.log(response.data.data)

  return response.data.data
})

export const getBuildingById = createAsyncThunk(
  'buildings/getBuildingById',
  async (id) => {
    const response = await axios.get(`${BASE_URL}/api/buildings/${id}`)

    return response.data.data
  }
)

const buildingSlice = createSlice({
  name: 'buildings',
  initialState: {
    loading: false,
    buildings: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBuildings.fulfilled, (state, action) => {
        state.loading = false
        state.buildings = action.payload
        state.error = null
      })
      .addCase(getBuildings.pending, (state, action) => {
        state.loading = true
      })
  },
})

export default buildingSlice.reducer
