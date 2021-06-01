import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import { getLobbies, getLobbyById } from 'store/lobbies/actions'

export const userAdapter = createEntityAdapter()

export const usersSlice = createSlice({
  name: 'users',
  initialState: userAdapter.getInitialState(),
  reducers: {
    upsertUsers: userAdapter.upsertMany,
    setUsers: userAdapter.setAll,
    removeUser: userAdapter.removeOne,
  },
  extraReducers: {
    [getLobbies.fulfilled]: (state, action) => {
      userAdapter.setAll(state, action.payload.users || {})
    },
    [getLobbyById.fulfilled]: (state, action) => {
      userAdapter.upsertMany(state, action.payload.users || {})
    },
  },
})
