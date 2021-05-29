import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import { getLobbies, getLobbyById } from 'store/lobbies/actions'

export const playerAdapter = createEntityAdapter()

export const localPlayersSelectors = playerAdapter.getSelectors(state => state)

export const playersSlice = createSlice({
  name: 'players',
  initialState: playerAdapter.getInitialState(),
  reducers: {
    addPlayers: playerAdapter.addMany,
    addPlayer: playerAdapter.addOne,
    setPlayers: playerAdapter.setAll,
    removePlayer: playerAdapter.removeOne,
    removePlayerByConnectionId(state, { payload }) {
      localPlayersSelectors.selectAll(state).forEach((entity) => {
        if (entity.connection_id === payload) {
          playerAdapter.removeOne(state, entity.id)
        }
      })
    },
    removePlayersFromLobby(state, { payload }) {
      localPlayersSelectors.selectAll(state).forEach((entity) => {
        if (entity.lobby_id === payload) {
          playerAdapter.removeOne(state, entity.id)
        }
      })
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLobbies.fulfilled, (state, action) => {
        playerAdapter.upsertMany(state, action.payload.players || {})
      })
      .addCase(getLobbyById.fulfilled, (state, action) => {
        playerAdapter.upsertMany(state, action.payload.players || {})
      })
  }
})
