import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { profileSlice } from 'store/profile'
import { lobbySlice } from 'store/lobbies'
import { playersSlice } from 'store/players'
import { usersSlice } from 'store/users'

const reducers = combineReducers({
  profile: profileSlice.reducer,
  lobbies: lobbySlice.reducer,
  players: playersSlice.reducer,
  users: usersSlice.reducer,
})

export const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== 'production',
})
