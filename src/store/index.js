import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { profileSlice } from 'store/profile'
import { lobbySlice } from 'store/lobbies'
import { playersSlice } from 'store/players'
import { usersSlice } from 'store/users'
import { rootSaga } from 'store/rootSaga'

const sagaMiddleware = createSagaMiddleware()

const reducers = combineReducers({
  profile: profileSlice.reducer,
  lobbies: lobbySlice.reducer,
  players: playersSlice.reducer,
  users: usersSlice.reducer,
})

export const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)
