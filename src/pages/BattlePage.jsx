import { useEffect } from 'react'
import { useProfile } from 'hooks/useProfile'
import { useParams } from 'react-router-dom'
import { lazyImport } from 'utils/lazyNamedImport'
import { Tab, Tabs } from 'react-bootstrap'
import { usePlayers } from 'hooks/usePlayers'
import { useLobbies } from 'hooks/useLobbies'
import { battleSocket } from 'services/socket'
import { normalize } from 'normalizr'
import { playerSchema } from 'store/players/schema'

const BattleDashboardPage = lazyImport(
  () => import('pages/BattleDashboardPage'),
  'BattleDashboardPage'
)
const BattleTopPage = lazyImport(
  () => import('pages/BattleTopPage'),
  'BattleTopPage'
)

export const BattlePage = () => {
  const { lobbyId } = useParams()
  const { profileAuth } = useProfile()
  const { updatePlayersResources, upsertPlayers } = usePlayers()
  const { getLobbyById } = useLobbies()

  const onPlayerUpdate = (player) => {
    const data = normalize(JSON.parse(player), playerSchema).entities
    upsertPlayers(data.players)
  }

  useEffect(() => {
    battleSocket.connect({
      lobby_id: lobbyId,
      token: profileAuth.token,
    })
    battleSocket.onEvent('player_update', onPlayerUpdate)

    getLobbyById(lobbyId)
    const interval = setInterval(() => updatePlayersResources(), 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Tabs defaultActiveKey="dashboard">
      <Tab eventKey="dashboard" title="Dashboard">
        <BattleDashboardPage />
      </Tab>
      <Tab eventKey="top" title="Top">
        <BattleTopPage lobbyId={lobbyId} />
      </Tab>
    </Tabs>
  )
}
