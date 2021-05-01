import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

export const playersAdapter = createEntityAdapter()

export const playersSlice = createSlice({
  name: 'players',
  initialState: playersAdapter.getInitialState(),
  reducers: {
    addPlayers: playersAdapter.addMany,
    addPlayer: playersAdapter.addOne,
  },
})
