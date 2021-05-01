import { useDispatch, useSelector } from 'react-redux';
import { playersByLobbyIdSelector } from 'store/players/selectors';
import { playersSlice } from 'store/players';

const { addPlayer, addPlayers } = playersSlice.actions

export const usePlayers = () => {
  const dispatch = useDispatch();

  return {
    addPlayer: (player) => dispatch(addPlayer(player)),
    addPlayers: (players) => dispatch(addPlayers(players)),
    selectPlayersByLobbyId: (lobbyId) => useSelector(playersByLobbyIdSelector(lobbyId))
  }
}

