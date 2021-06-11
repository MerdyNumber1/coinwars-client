import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useLobbies } from 'hooks/useLobbies'
import { useParams } from 'react-router-dom'
import { LoadingFallback } from 'components/LoadingFallback'
import { UserCard } from 'components/cards/UserCard'
import { useProfile } from 'hooks/useProfile'
import { usePlayers } from 'hooks/usePlayers'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { playerSchema } from 'store/players/schema'
import { normalize } from 'normalizr'
import { useUsers } from 'hooks/useUsers'
import { useUnmount, useMount, useCounter } from '@umijs/hooks'
import { lobbySocket } from 'services/socket'

export const LobbyPage = () => {
  const [countdownIntervalId, setCountdownIntervalId] = useState()
  const [countdown, { dec: decrementCountdown, set: setCountdown }] =
    useCounter(10, { min: 1 })
  const history = useHistory()
  const { profileAuth } = useProfile()
  const { lobbyId } = useParams()
  const { selectLobbyById, getLobbyById } = useLobbies()
  const { removePlayerById, upsertPlayers, currentPlayer } = usePlayers()
  const { upsertUsers, selectUsersByLobbyId, removeUserById, currentUser } =
    useUsers()

  const onPlayerConnect = (player) => {
    const data = normalize(JSON.parse(player), playerSchema).entities
    upsertUsers(data.users || {})
    upsertPlayers(data.players || {})
  }

  const onPlayerDisconnect = (data) => {
    const player = JSON.parse(data)
    removePlayerById(player.id)
    removeUserById(player.user)
  }

  const onCountdownStart = (seconds) => {
    setCountdown(seconds)
    const intervalId = setInterval(decrementCountdown, 1000)
    setCountdownIntervalId(intervalId)
  }

  const onCountdownEnd = () => {
    clearInterval(countdownIntervalId)
    setCountdown(1)
    history.push(`/battles/${lobbyId}`)
  }

  const onCountdownInterrupted = () => {
    clearInterval(countdownIntervalId)
    setCountdown(10)
  }

  useMount(() => {
    getLobbyById(lobbyId)
    lobbySocket.connect({
      lobby_id: lobbyId,
      token: profileAuth.token,
    })

    lobbySocket.onEvent('player_connect', onPlayerConnect)
    lobbySocket.onEvent('player_disconnect', onPlayerDisconnect)
    lobbySocket.onEvent('countdown_start', onCountdownStart)
    lobbySocket.onEvent('countdown_end', onCountdownEnd)
  })

  useEffect(
    () =>
      lobbySocket.replaceListener(
        'countdown_interrupted',
        onCountdownInterrupted
      ),
    [countdownIntervalId]
  )

  useUnmount(() => {
    removePlayerById(currentPlayer.id)
    removeUserById(currentUser.id)
    lobbySocket.disconnect()
  })

  const users = selectUsersByLobbyId(Number(lobbyId))
  const lobby = selectLobbyById(lobbyId)

  return (
    <>
      <Helmet>
        <title>{lobby?.name}</title>
      </Helmet>
      {lobby ? (
        <div>
          <Link to="/lobbies">Back</Link>
          <h1 className="h1">{lobby.name}</h1>
          <h3 className="h3 mt-4">Connected players:</h3>
          {users.length
            ? users.map((user) => <UserCard key={user.id} user={user} />)
            : null}
          <p>Before the beginning: {countdown} sec</p>
        </div>
      ) : (
        <LoadingFallback />
      )}
    </>
  )
}
