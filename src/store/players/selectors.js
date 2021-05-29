import { createSelector } from '@reduxjs/toolkit';
import { playerAdapter } from './index';

export const playersSelector = (state) => state.players
export const playersSelectors = playerAdapter.getSelectors(playersSelector)


export const playersByLobbyIdSelector = (lobbyId) => createSelector(playersSelector, (state) =>
  Object.values(state.entities).filter(player => player.lobby_id === lobbyId)
)
