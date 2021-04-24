import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

export const lobbiesAdapter = createEntityAdapter()

export const lobbySlice = createSlice({
  name: 'lobby',
  initialState: lobbiesAdapter.getInitialState(),
  reducers: {
    setLobbies: lobbiesAdapter.setAll,
    addLobbies: lobbiesAdapter.addMany,
    addLobby: lobbiesAdapter.addOne,
    addLobbyPlayer(state, { lobbyId, player }) {
      state.find(lobby => lobby.id === lobbyId).players.push(player)
    }
  },
})
