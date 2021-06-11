import { useDispatch, useSelector } from 'react-redux'
import {
  playersByLobbyIdSelector,
  currentPlayerSelector,
} from 'store/players/selectors'
import { playersSlice } from 'store/players'

const {
  addPlayer,
  addPlayers,
  removePlayer,
  upsertPlayer,
  upsertPlayers,
  updatePlayersResources,
} = playersSlice.actions

export const usePlayers = () => {
  const dispatch = useDispatch()

  return {
    upsertPlayer: (player) => dispatch(upsertPlayer(player)),
    upsertPlayers: (players) => dispatch(upsertPlayers(players)),
    addPlayer: (player) => dispatch(addPlayer(player)),
    addPlayers: (players) => dispatch(addPlayers(players)),
    removePlayerById: (id) => dispatch(removePlayer(id)),
    updatePlayersResources: () => dispatch(updatePlayersResources()),
    selectPlayersByLobbyId: (lobbyId) =>
      useSelector(playersByLobbyIdSelector(lobbyId)),
    currentPlayer: useSelector(currentPlayerSelector),
  }
}
