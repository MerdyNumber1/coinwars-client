import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {
      name: null,
    }
  },
  reducers: {
    setName(state, payload) {
      state.userInfo.name = payload
    }
  },
})
