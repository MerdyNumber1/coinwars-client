import { createSlice } from '@reduxjs/toolkit';

const userInfo = JSON.parse(window.localStorage.getItem('user'))

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {
      id: userInfo.id ?? null,
      name: userInfo.name || null,
    }
  },
  reducers: {
    setUserInfo(state, payload) {
      state.userInfo = payload
    }
  },
})
