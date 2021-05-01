import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

export const lobbiesAdapter = createEntityAdapter()

export const lobbySlice = createSlice({
  name: 'lobbies',
  initialState: lobbiesAdapter.getInitialState(),
  reducers: {
    setLobbies: lobbiesAdapter.setAll,
    addLobbies: lobbiesAdapter.addMany,
    addLobby: lobbiesAdapter.addOne,
  },
})
