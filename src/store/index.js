import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from 'store/user';
import { lobbySlice } from 'store/lobby';

const reducers = combineReducers({
  user: userSlice.reducer,
  lobby: lobbySlice.reducer,
})

export const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== 'production',
});
