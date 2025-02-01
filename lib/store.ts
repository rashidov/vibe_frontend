'use client'

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import messagesSlice from '@/lib/features/messages/messages.sliece'

const rootReducer = combineReducers({
  messagesSlice,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}

export type AppStore = ReturnType<typeof setupStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
