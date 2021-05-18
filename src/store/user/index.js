import { createSlice } from '@reduxjs/toolkit'

const userInfo = JSON.parse(window.localStorage.getItem('user')) || {}

const initialState = {
  info: {
    id: userInfo.id ?? null,
    name: userInfo.name || null,
  },
  auth: {
    token: null,
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
