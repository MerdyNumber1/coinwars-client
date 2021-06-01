import { createSlice } from '@reduxjs/toolkit'

const token = window.localStorage.getItem('token') || null

const initialState = {
  info: {
    id: null,
    name: null,
  },
  auth: {
    token: token,
  },
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setInfo(state, { payload }) {
      state.info = payload
    },
    setAuth(state, { payload }) {
      state.auth = payload
    },
    reset(state) {
      state = { ...initialState }
    },
  },
})
