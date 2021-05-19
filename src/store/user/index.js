import { createSlice } from '@reduxjs/toolkit'

const userToken = window.localStorage.getItem('token') || null

const initialState = {
  info: {
    id: null,
    name: null,
  },
  auth: {
    token: userToken,
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, { payload }) {
      state.info = payload
    },
    setUserAuth(state, { payload }) {
      state.auth = payload
    },
    resetUserState(state) {
      state = { ...initialState }
    }
  },
})
