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
    removePlayersFromLobby(state, { payload }) {
      state.entities = Object.values(state.entities).reduce((prev, current) => {
        if (current.lobby_id !== payload.lobbyId) {
          return prev[current.id] = current
        }
        return prev
      }, {})
    }
  },
})
