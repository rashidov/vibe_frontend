import { createSlice } from '@reduxjs/toolkit'

export interface MessagesState {
  messages: string[]
}

const initialState: MessagesState = {
  messages: [],
}

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    init: (state) => {
      state.messages = ['first msgs']
    },
  },
})

export const { init } = messagesSlice.actions
export default messagesSlice.reducer
