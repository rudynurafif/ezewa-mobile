import { configureStore } from '@reduxjs/toolkit'
import userReducer from './UserSlice'
import buildingReducer from './BuildingSlice'
import transactionReducer from './TransactionSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    building: buildingReducer,
    transaction: transactionReducer,
  },
})

export default store
