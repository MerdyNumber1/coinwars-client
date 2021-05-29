import React from 'react'
import { useSocket } from 'hooks/useSocket'
import { useProfile } from 'hooks/useProfile'
import { useParams } from 'react-router-dom'
import { BattleNav } from 'components/battle/BattleNav'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { lazyImport } from 'utils/lazyNamedImport';

const BattleDashboardPage = lazyImport(() => import('pages/BattleDashboardPage'), 'BattleDashboardPage')
const BattleTopPage = lazyImport(() => import('pages/BattleTopPage'), 'BattleTopPage')

export const BattlePage = () => {
  const { path } = useRouteMatch();
  const { lobbyId } = useParams()
  const { profileAuth } = useProfile()

  const { onEvent, disconnect, socket } = useSocket('battles', {
    lobby_id: lobbyId,
    token: profileAuth.token
  })

  return (
    <div>
      <BattleNav />
      <Switch>
        <Route exact path={path}><BattleDashboardPage /></Route>
        <Route path={`${path}/top`}><BattleTopPage /></Route>
      </Switch>
    </div>
  )
}

