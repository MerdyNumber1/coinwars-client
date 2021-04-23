import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {
      id: null,
      name: null,
    }
  },
  reducers: {
    setUserInfo(state, payload) {
      state.userInfo = payload
    }
  },
})
