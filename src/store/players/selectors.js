import { createSelector } from '@reduxjs/toolkit'
import { playerAdapter } from './index'
import { profileInfoSelector } from 'store/profile/selectors'
import { localUsersSelectors } from 'store/users/selectors'
import { usersSelector } from 'store/users'

export const playersSelector = (state) => state.players
export const playersSelectors = playerAdapter.getSelectors(playersSelector)

export const playersByLobbyIdSelector = (lobbyId) =>
  createSelector(playersSelectors.selectAll, (players) =>
    players.filter((player) => player.lobby_id === lobbyId)
  )

export const currentPlayerSelector = createSelector(
  profileInfoSelector,
  playersSelectors.selectAll,
  usersSelector,
  ({ id }, players, usersState) =>
    players.find((player) =>
      localUsersSelectors.selectById(usersState, player.user)
    )
)
