import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import { getLobbies, getLobbyById } from 'store/lobbies/actions'

export const usersSelector = (state) => state.users

export const userAdapter = createEntityAdapter()

const usersSlice = createSlice({
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

export const { actions, reducer } = usersSlice
export const { upsertUsers, setUsers, removeUser } = actions
