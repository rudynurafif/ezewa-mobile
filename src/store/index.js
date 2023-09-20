import { configureStore } from '@reduxjs/toolkit'
import userReducer from './UserSlice'
import buildingReducer from './BuildingSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    building: buildingReducer,
  },
})

export default store
