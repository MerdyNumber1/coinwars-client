import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { reducer as profileReducer } from 'store/profile'
import { reducer as lobbyReducer } from 'store/lobbies'
import { reducer as playersReducer } from 'store/players'
import { reducer as usersReducer } from 'store/users'
import { rootSaga } from 'store/rootSaga'

const sagaMiddleware = createSagaMiddleware()

const reducers = combineReducers({
  profile: profileReducer,
  lobbies: lobbyReducer,
  players: playersReducer,
  users: usersReducer,
})

export const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)
