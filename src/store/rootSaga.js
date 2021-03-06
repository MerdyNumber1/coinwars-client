import { all } from 'redux-saga/effects'
import {
  watchLobbyPlayerConnect,
  watchLobbyPlayerDisconnect,
  watchLobbyPlayerUpdate,
} from 'store/lobbies/sagas'
import {
  watchPlayerArmyUpgrade,
  watchPlayerCoinsUpgrade,
  watchPlayerAttack,
} from 'store/players/sagas'

export function* rootSaga() {
  yield all([
    watchLobbyPlayerConnect(),
    watchLobbyPlayerDisconnect(),
    watchLobbyPlayerUpdate(),
    watchPlayerArmyUpgrade(),
    watchPlayerCoinsUpgrade(),
    watchPlayerAttack(),
  ])
}
