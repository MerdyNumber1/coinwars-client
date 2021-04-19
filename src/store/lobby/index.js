import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

export const lobbiesAdapter = createEntityAdapter()

export const lobbySlice = createSlice({
  name: 'lobby',
  initialState: lobbiesAdapter.getInitialState(),
  reducers: {
    setLobbies: lobbiesAdapter.addMany
  },
})
