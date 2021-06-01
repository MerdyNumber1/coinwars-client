import React from 'react'
import { useSocket } from 'hooks/useSocket'
import { useProfile } from 'hooks/useProfile'
import { useParams } from 'react-router-dom'
import { lazyImport } from 'utils/lazyNamedImport'
import { Tab, Tabs } from 'react-bootstrap'

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

  useSocket('battles', {
    lobby_id: lobbyId,
    token: profileAuth.token,
  })

  return (
    <Tabs defaultActiveKey="dashboard">
      <Tab eventKey="dashboard" title="Home">
        <BattleDashboardPage />
      </Tab>
      <Tab eventKey="top" title="Profile">
        <BattleTopPage />
      </Tab>
    </Tabs>
  )
}
