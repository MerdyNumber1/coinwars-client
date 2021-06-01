import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import { getLobbies, getLobbyById } from 'store/lobbies/actions'
import { userAdapter } from '../users'

export const playerAdapter = createEntityAdapter()

export const playersSlice = createSlice({
  name: 'players',
  initialState: playerAdapter.getInitialState(),
  reducers: {
    addPlayers: playerAdapter.addMany,
    addPlayer: playerAdapter.addOne,
    setPlayers: playerAdapter.setAll,
    removePlayer: playerAdapter.removeOne,
    upsertPlayer: playerAdapter.upsertOne,
    upsertPlayers: playerAdapter.upsertMany,
  },
  extraReducers: {
    [getLobbies.fulfilled]: (state, action) => {
      userAdapter.setAll(state, action.payload.players || {})
    },
    [getLobbyById.fulfilled]: (state, action) => {
      userAdapter.upsertMany(state, action.payload.players || {})
    },
  },
})
