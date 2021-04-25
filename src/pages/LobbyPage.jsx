import { Helmet } from 'react-helmet';
import { useLobbies } from 'hooks/useLobbies';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingFallback } from 'components/LoadingFallback';
import { PlayerCard } from 'components/cards/PlayerCard';
import { useSocket } from 'hooks/useSocket';
import { useUser } from 'hooks/useUser';

export const LobbyPage = () => {
  const { userInfo } = useUser()
  const { lobbyId } = useParams()
  const { onEvent } = useSocket('lobbies', {
    lobbyId,
    user: JSON.stringify(userInfo)
  })
  const { selectLobbyById, getLobbyById, addPlayerToLobby } = useLobbies()
  const lobby = selectLobbyById(lobbyId)

  useEffect(() => {
    if (!lobby) {
      getLobbyById(lobbyId)
    }
  },[])

  onEvent('player_connect', (player) => addPlayerToLobby(lobbyId, player))

  return (
    <>
      <Helmet>
        <title>{lobby?.name}</title>
      </Helmet>
      {lobby ? (
        <div>
          <h1 className="h1">{lobby.name}</h1>
          <h3 className="h3 mt-4">Connected players:</h3>
          {lobby.players.map(player => <PlayerCard key={player.id} player={player} />)}
        </div>
      ) : (
        <LoadingFallback />
      )}
    </>
  )
}
