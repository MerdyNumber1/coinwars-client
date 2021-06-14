import { call, delay, take } from 'redux-saga/effects'
import { lobbySocket } from 'services/socket'
import {
  playerArmyUpgradeAction,
  playerCoinsUpgradeAction,
} from 'store/players/actions'

function* playerArmyUpgrade() {
  yield call(lobbySocket.emit.bind(lobbySocket), 'player_upgrade', {
    army: true,
  })
  yield delay(1000)
}

function* playerCoinsUpgrade() {
  yield call(lobbySocket.emit.bind(lobbySocket), 'player_upgrade', {
    coins: true,
  })
  yield delay(1000)
}

export function* watchPlayerArmyUpgrade() {
  let task

  while (true) {
    yield take(playerArmyUpgradeAction.type)

    if (!task) {
      yield call(playerArmyUpgrade)
      task = null
    }
  }
}

export function* watchPlayerCoinsUpgrade() {
  let task

  while (true) {
    yield take(playerCoinsUpgradeAction.type)

    if (!task) {
      yield call(playerCoinsUpgrade)
      task = null
    }
  }
}
