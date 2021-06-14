import { call, take, put } from 'redux-saga/effects'
import { lobbySocket } from 'services/socket'
import { lobbyEvents } from 'services/socketEvents'
import { normalize } from 'normalizr'
import { playerSchema } from 'store/players/schema'
import { playersSlice } from 'store/players'
import { usersSlice } from 'store/users'

const { upsertPlayers, removePlayer } = playersSlice.actions
const { upsertUsers, removeUser } = usersSlice.actions

function* lobbyPlayerConnect(data) {
  const entities = normalize(JSON.parse(data), playerSchema).entities
  yield put(upsertUsers(entities.users || {}))
  yield put(upsertPlayers(entities.players || {}))
}

function* lobbyPlayerDisconnect(data) {
  const player = JSON.parse(data)
  yield put(removePlayer(player.id))
  yield put(removeUser(player.user))
}

export function* watchLobbyPlayerConnect() {
  const channel = yield call(
    lobbySocket.createEventChannel.bind(lobbySocket, lobbyEvents.playerConnect)
  )

  while (true) {
    const player = yield take(channel)
    yield call(lobbyPlayerConnect, player)
  }
}

export function* watchLobbyPlayerDisconnect() {
  const channel = yield call(
    lobbySocket.createEventChannel.bind(
      lobbySocket,
      lobbyEvents.playerDisconnect
    )
  )

  while (true) {
    const player = yield take(channel)
    yield call(lobbyPlayerDisconnect, player)
  }
}
