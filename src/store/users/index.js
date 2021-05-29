import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import { getLobbies, getLobbyById } from 'store/lobbies/actions'

export const userAdapter = createEntityAdapter()

export const usersSlice = createSlice({
  name: 'users',
  initialState: userAdapter.getInitialState(),
  reducers: {
    setUsers: userAdapter.setAll,
  },
  extraReducers: {
    [getLobbies.fulfilled]: (state, action) => {
      userAdapter.upsertMany(state, action.payload.users || {})
    },
    [getLobbyById.fulfilled]: (state, action) => {
      userAdapter.upsertMany(state, action.payload.users || {})
    }
  }
})
