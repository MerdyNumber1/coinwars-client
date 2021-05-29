import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useLobbies } from 'hooks/useLobbies';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingFallback } from 'components/LoadingFallback';
import { PlayerCard } from 'components/cards/PlayerCard';
import { useSocket } from 'hooks/useSocket';
import { useProfile } from 'hooks/useProfile';
import { usePlayers } from 'hooks/usePlayers';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';


export const LobbyPage = () => {
  const [countdownIntervalId, setCountdownIntervalId] = useState()
  const [countdown, setCountdown] = useState(null)
  const history = useHistory()
  const { profileAuth } = useProfile()
  const { lobbyId } = useParams()
  const { onEvent, disconnect, socket } = useSocket('lobbies', {
    lobby_id: lobbyId,
    token: profileAuth.token
  })
  const { selectLobbyById, getLobbyById } = useLobbies()
  const lobby = selectLobbyById(lobbyId)
  const { selectPlayersByLobbyId, addPlayer, removePlayerById, removePlayerByConnectionId } = usePlayers()

  const players = selectPlayersByLobbyId(Number(lobbyId))

  useEffect(() => {
    getLobbyById(lobbyId)

    return () => {
      removePlayerByConnectionId(socket.id)
      disconnect()
      clearInterval(countdownIntervalId)
    }
  },[])

  const onPlayerConnect = useCallback((player) => addPlayer(JSON.parse(player)), [])
  const onPlayerDisconnect = useCallback((player) => removePlayerById(JSON.parse(player).id), [])

  const onCountdownStart = useCallback((seconds) => {
    setCountdown(seconds)
    const intervalId = setInterval(() => setCountdown(prev => prev - 1), 1000)
    setCountdownIntervalId(intervalId)
  }, [])

  const onCountdownEnd = useCallback(() => {
    clearInterval(countdownIntervalId)
    setCountdown(1)
    history.push(`/battles/${lobbyId}`)
  }, [countdownIntervalId])

  const onCountdownInterrupted = useCallback(() => {
    clearInterval(countdownIntervalId)
    setCountdown(null)
  }, [countdownIntervalId])


  onEvent('player_connect', onPlayerConnect)
  onEvent('player_disconnect', onPlayerDisconnect)
  onEvent('countdown_start', onCountdownStart)
  onEvent('countdown_end', onCountdownEnd)
  onEvent('countdown_interrupted', onCountdownInterrupted)

  return (
    <>
      <Helmet>
        <title>{lobby?.name}</title>
      </Helmet>
      {lobby ? (
        <div>
          <Link to="/lobbies">
            Back
          </Link>
          <h1 className="h1">{lobby.name}</h1>
          <h3 className="h3 mt-4">Connected players:</h3>
          {players.map(player => <PlayerCard key={player.id} player={player} />)}
          {countdown ?? <p>{countdown}</p>}
        </div>
      ) : (
        <LoadingFallback />
      )}
    </>
  )
}
