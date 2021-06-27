import React from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { lazyImport } from 'utils/lazyNamedImport'
import { useUnmount } from '@umijs/hooks'
import { lobbySocket } from 'services/socket'

const LobbyPage = lazyImport(() => import('pages/LobbyPage'), 'LobbyPage')

const BattlePage = lazyImport(() => import('pages/BattlePage'), 'BattlePage')

export const LobbyContainer = () => {
  const { path } = useRouteMatch()

  useUnmount(() => {
    lobbySocket.disconnect()
  })

  return (
    <>
      <Route path={`${path}/`} exact>
        <LobbyPage />
      </Route>
      <Route path={`${path}/battle`} exact>
        <BattlePage />
      </Route>
    </>
  )
}
