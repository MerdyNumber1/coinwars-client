import { Helmet } from 'react-helmet';
import { useLobbies } from 'hooks/useLobbies';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingFallback } from 'components/LoadingFallback';
import { PlayerCard } from 'components/cards/PlayerCard';
import { useSocket } from 'hooks/useSocket';

export const LobbyPage = () => {
  const { lobbyId } = useParams()
  const { onEvent } = useSocket(`${process.env.REACT_APP_SOCKET_URL}/lobbies/${lobbyId}`)
  const { selectLobbyById, getLobbyById, addPlayerToLobby } = useLobbies()
  const lobby = selectLobbyById(lobbyId)

  console.log(`${process.env.REACT_APP_SOCKET_URL}/lobbies`)

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
