import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { lazyImport } from 'utils/lazyNamedImport'
import { Tab, Tabs } from 'react-bootstrap'
import { usePlayers } from 'hooks/usePlayers'
import { useLobbies } from 'hooks/useLobbies'
import { lobbySocket } from 'services/socket'
import { normalize } from 'normalizr'
import { playerSchema } from 'store/players/schema'
import { useUnmount } from '@umijs/hooks'
import { useUsers } from 'hooks/useUsers'
import { Helmet } from 'react-helmet'
import { PlayerWonModal } from 'components/modals/PlayerWonModal'
import { PlayerLostModal } from 'components/modals/PlayerLostModal'

const BattleDashboardPage = lazyImport(
  () => import('pages/BattleDashboardPage'),
  'BattleDashboardPage'
)
const BattleTopPage = lazyImport(
  () => import('pages/BattleTopPage'),
  'BattleTopPage'
)
const BattleChatPage = lazyImport(
  () => import('pages/BattleChatPage'),
  'BattleChatPage'
)

export const BattlePage = () => {
  const { lobbyId } = useParams()
  const {
    updatePlayersResources,
    upsertPlayers,
    removePlayerById,
    currentPlayer,
  } = usePlayers()
  const { getLobbyById } = useLobbies()
  const { removeUserById, currentUser } = useUsers()

  const onPlayerUpdate = (player) => {
    const data = normalize(JSON.parse(player), playerSchema).entities
    upsertPlayers(data.players)
  }

  useUnmount(() => {
    removePlayerById(currentPlayer.id)
    removeUserById(currentUser.id)
    lobbySocket.disconnect()
  })

  useEffect(() => {
    getLobbyById(lobbyId).then(() => {
      lobbySocket.onEvent('player_update', onPlayerUpdate)
    })

    const interval = setInterval(updatePlayersResources, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  console.log(currentPlayer)

  return (
    <>
      <Helmet>
        <title>Battle</title>
      </Helmet>
      <>
        {currentPlayer?.won && <PlayerWonModal />}
        {currentPlayer?.lost && <PlayerLostModal />}
        <Tabs defaultActiveKey="dashboard">
          <Tab eventKey="dashboard" title="Dashboard">
            <BattleDashboardPage />
          </Tab>
          <Tab eventKey="top" title="Top">
            <BattleTopPage lobbyId={lobbyId} />
          </Tab>
          <Tab eventKey="chat" title="Chat">
            <BattleChatPage />
          </Tab>
        </Tabs>
      </>
    </>
  )
}
