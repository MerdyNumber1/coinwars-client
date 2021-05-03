import { Helmet } from 'react-helmet';
import { useLobbies } from 'hooks/useLobbies';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingFallback } from 'components/LoadingFallback';
import { PlayerCard } from 'components/cards/PlayerCard';
import { useSocket } from 'hooks/useSocket';
import { useUser } from 'hooks/useUser';
import { usePlayers } from 'hooks/usePlayers';
import { useHistory } from 'react-router-dom';


export const LobbyPage = () => {
  const history = useHistory()
  const { userInfo } = useUser()
  const { lobbyId } = useParams()
  const { onEvent, disconnect } = useSocket('lobbies', {
    lobby_id: lobbyId,
    user_id: userInfo.id,
    user_name: userInfo.name
  })
  const { selectLobbyById, getLobbyById } = useLobbies()
  const lobby = selectLobbyById(lobbyId)
  const { selectPlayersByLobbyId, addPlayer, removePlayerById } = usePlayers()

  const players = selectPlayersByLobbyId(Number(lobbyId))

  useEffect(() => {
    if (!lobby) {
      getLobbyById(lobbyId)
    }
    return () => {
      disconnect()
      removePlayerById()
    }
  },[])

  onEvent('player_connect', (player) => addPlayer(JSON.parse(player)))
  onEvent('player_disconnect', (player) => removePlayerById(JSON.parse(player).id))

  return (
    <>
      <Helmet>
        <title>{lobby?.name}</title>
      </Helmet>
      {lobby ? (
        <div>
          <p onClick={() => history.push('/lobbies')}>Back</p>
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
