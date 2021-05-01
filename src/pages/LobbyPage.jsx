import { Helmet } from 'react-helmet';
import { useLobbies } from 'hooks/useLobbies';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingFallback } from 'components/LoadingFallback';
import { PlayerCard } from 'components/cards/PlayerCard';
import { useSocket } from 'hooks/useSocket';
import { useUser } from 'hooks/useUser';
import { usePlayers } from 'hooks/usePlayers';

export const LobbyPage = () => {
  const { userInfo } = useUser()
  const { lobbyId } = useParams()
  const { onEvent } = useSocket('lobbies', {
    lobby_id: lobbyId,
    user_id: userInfo.id,
    user_name: userInfo.name
  })
  const { selectLobbyById, getLobbyById } = useLobbies()
  const lobby = selectLobbyById(lobbyId)
  const { selectPlayersByLobbyId, addPlayer } = usePlayers()

  const players = selectPlayersByLobbyId(Number(lobbyId))

  useEffect(() => {
    if (!lobby) {
      getLobbyById(lobbyId)
    }
  },[])

  onEvent('player_connect', (player) => addPlayer(JSON.parse(player)))

  return (
    <>
      <Helmet>
        <title>{lobby?.name}</title>
      </Helmet>
      {lobby ? (
        <div>
          <h1 className="h1">{lobby.name}</h1>
          <h3 className="h3 mt-4">Connected players:</h3>
          {players.map(player => <PlayerCard key={player.id} player={player} />)}
        </div>
      ) : (
        <LoadingFallback />
      )}
    </>
  )
}
