import { playersAdapter } from './index';
import { createSelector } from '@reduxjs/toolkit';

export const playersSelectors = playersAdapter.getSelectors(
  (state) => state.players
)
export const playersSelector = (state) => state.players

export const playersByLobbyIdSelector = (lobbyId) => createSelector(playersSelector, (state) =>
  Object.values(state.entities).filter(player => player.lobby_id === lobbyId)
)
