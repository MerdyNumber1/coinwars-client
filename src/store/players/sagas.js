import { call, delay, take } from 'redux-saga/effects'
import { lobbySocket } from 'services/socket'
import {
  playerArmyUpgradeAction,
  playerCoinsUpgradeAction,
  playerAttackAction,
} from 'store/players/actions'
import { lobbyEvents } from 'services/socketEvents'

function* playerArmyUpgrade() {
  yield call(lobbySocket.emit.bind(lobbySocket), lobbyEvents.playerUpgrade, {
    army: true,
  })
  yield delay(1000)
}

function* playerCoinsUpgrade() {
  yield call(lobbySocket.emit.bind(lobbySocket), lobbyEvents.playerUpgrade, {
    coins: true,
  })
  yield delay(1000)
}

function* playerAttack(targetId) {
  yield call(lobbySocket.emit.bind(lobbySocket), lobbyEvents.playerAttack, {
    target_id: targetId,
  })
  yield delay(1000)
}

export function* watchPlayerArmyUpgrade() {
  while (true) {
    yield take(playerArmyUpgradeAction.type)
    yield call(playerArmyUpgrade)
  }
}

export function* watchPlayerCoinsUpgrade() {
  while (true) {
    yield take(playerCoinsUpgradeAction.type)
    yield call(playerCoinsUpgrade)
  }
}

export function* watchPlayerAttack() {
  while (true) {
    const action = yield take(playerAttackAction.type)
    yield call(playerAttack, action.payload.targetId)
  }
}
