import { all } from 'redux-saga/effects'
import {
  watchLobbyPlayerConnect,
  watchLobbyPlayerDisconnect,
} from 'store/lobbies/sagas'

export function* rootSaga() {
  yield all([watchLobbyPlayerConnect(), watchLobbyPlayerDisconnect()])
}
