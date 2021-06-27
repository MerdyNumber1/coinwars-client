import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useLobbies } from 'hooks/useLobbies'
import { useParams } from 'react-router-dom'
import { LoadingFallback } from 'components/LoadingFallback'
import { UserCard } from 'components/cards/UserCard'
import { useProfile } from 'hooks/useProfile'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useUsers } from 'hooks/useUsers'
import { useUnmount, useMount, useCounter } from '@umijs/hooks'
import { lobbySocket } from 'services/socket'
import { lobbyEvents } from 'services/socketEvents'

export const LobbyPage = () => {
  const [countdownIntervalId, setCountdownIntervalId] = useState()
  const [countdown, { dec: decrementCountdown, set: setCountdown }] =
    useCounter(10, { min: 1 })
  const history = useHistory()
  const { profileAuth } = useProfile()
  const { lobbyId } = useParams()
  const { selectLobbyById, getLobbyById } = useLobbies()
  const { selectUsersByLobbyId } = useUsers()

  const onCountdownStart = (seconds) => {
    setCountdown(seconds)
    const intervalId = setInterval(decrementCountdown, 1000)
    setCountdownIntervalId(intervalId)
  }

  const onCountdownEnd = () => {
    clearInterval(countdownIntervalId)
    history.push(`${lobbyId}/battle`)
  }

  const onCountdownInterrupted = () => {
    clearInterval(countdownIntervalId)
    setCountdown(10)
  }

  useMount(async () => {
    await getLobbyById(lobbyId)
    lobbySocket.connect({
      lobby_id: lobbyId,
      token: profileAuth.token,
    })

    lobbySocket.onEvent(lobbyEvents.countdownStart, onCountdownStart)
    lobbySocket.onEvent(lobbyEvents.countdownEnd, onCountdownEnd)
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
    clearInterval(countdownIntervalId)
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
