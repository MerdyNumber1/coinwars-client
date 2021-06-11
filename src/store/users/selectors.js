import { userAdapter } from './index'
import { createSelector } from '@reduxjs/toolkit'
import { playersByLobbyIdSelector } from 'store/players/selectors'
import { profileInfoSelector } from 'store/profile/selectors'

export const usersSelector = (state) => state.users

export const usersSelectors = userAdapter.getSelectors(usersSelector)

export const localUsersSelectors = userAdapter.getSelectors((state) => state)

export const usersByLobbyIdSelector = (lobbyId) =>
  createSelector(
    playersByLobbyIdSelector(lobbyId),
    usersSelector,
    (players, state) =>
      players.map((player) =>
        localUsersSelectors.selectById(state, player.user)
      )
  )

export const usersEntitiesByLobbyIdSelector = (lobbyId) =>
  createSelector(
    playersByLobbyIdSelector(lobbyId),
    usersSelector,
    (players, state) =>
      players.map((player) => ({
        [player.user]: localUsersSelectors.selectById(state, player.user),
      }))
  )

export const currentUserSelector = createSelector(
  profileInfoSelector,
  usersSelector,
  ({ id }, state) => localUsersSelectors.selectById(state, id)
)
