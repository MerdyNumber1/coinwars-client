import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

export const playersAdapter = createEntityAdapter()

export const playersSlice = createSlice({
  name: 'players',
  initialState: playersAdapter.getInitialState(),
  reducers: {
    addPlayers: playersAdapter.addMany,
    addPlayer: playersAdapter.addOne,
    setPlayers: playersAdapter.setAll,
    removePlayer: playersAdapter.removeOne,
    removePlayerByConnectionId(state, { payload }) {
      Object.values(state.entities).forEach((entity) => {
        if (entity.connection_id === payload) {
          playersAdapter.removeOne(state, entity.id)
        }
      })
    },
    removePlayersFromLobby(state, { payload }) {
      Object.values(state.entities).forEach((entity) => {
        if (entity.lobby_id === payload) {
          playersAdapter.removeOne(state, entity.id)
        }
      })
    }
  },
})
