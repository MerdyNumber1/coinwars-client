import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import { getLobbies, getLobbyById } from './actions'

export const lobbiesAdapter = createEntityAdapter()

export const lobbySlice = createSlice({
  name: 'lobbies',
  initialState: lobbiesAdapter.getInitialState(),
  reducers: {
    setLobbies: lobbiesAdapter.setAll,
    addLobbies: lobbiesAdapter.addMany,
    addLobby: lobbiesAdapter.addOne,
  },
  extraReducers: {
    [getLobbies.fulfilled]: (state, action) => {
      lobbiesAdapter.setAll(state, action.payload.lobbies || {})
    },
    [getLobbyById.fulfilled]: (state, action) => {
      lobbiesAdapter.upsertMany(state, action.payload.lobbies || {})
    },
  },
})
