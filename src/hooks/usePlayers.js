import { useDispatch, useSelector } from 'react-redux'
import {
  playersByLobbyIdSelector,
  currentPlayerSelector,
} from 'store/players/selectors'
import {
  addPlayer,
  addPlayers,
  removePlayer,
  upsertPlayer,
  upsertPlayers,
  updatePlayersResources,
} from 'store/players'
import {
  playerCoinsUpgradeAction,
  playerArmyUpgradeAction,
  playerAttackAction,
} from 'store/players/actions'

export const usePlayers = () => {
  const dispatch = useDispatch()

  return {
    upsertPlayer: (player) => dispatch(upsertPlayer(player)),
    upsertPlayers: (players) => dispatch(upsertPlayers(players)),
    addPlayer: (player) => dispatch(addPlayer(player)),
    addPlayers: (players) => dispatch(addPlayers(players)),
    removePlayerById: (id) => dispatch(removePlayer(id)),
    updatePlayersResources: () => dispatch(updatePlayersResources()),
    upgradeArmy: () => dispatch(playerArmyUpgradeAction()),
    upgradeCoins: () => dispatch(playerCoinsUpgradeAction()),
    attackPlayer: (targetId) => dispatch(playerAttackAction({ targetId })),
    selectPlayersByLobbyId: (lobbyId) =>
      useSelector(playersByLobbyIdSelector(lobbyId)),
    currentPlayer: useSelector(currentPlayerSelector),
  }
}
