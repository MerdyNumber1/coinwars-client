import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from 'store/user';
import { lobbySlice } from 'store/lobbies';
import { playersSlice } from './players';

const reducers = combineReducers({
  user: userSlice.reducer,
  lobbies: lobbySlice.reducer,
  players: playersSlice.reducer
})

export const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== 'production',
});
