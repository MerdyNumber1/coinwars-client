import { Suspense } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { lazyImport } from 'utils/lazyNamedImport'
import { LoadingFallback } from 'components/LoadingFallback'
import { Layout } from 'layout'
import { useProfile } from 'hooks/useProfile'
import { createBrowserHistory } from 'history'

const MainPage = lazyImport(() => import('pages/MainPage'), 'MainPage')
const LobbiesPage = lazyImport(() => import('pages/LobbiesPage'), 'LobbiesPage')
const HelpPage = lazyImport(() => import('pages/HelpPage'), 'HelpPage')

const LobbyContainer = lazyImport(
  () => import('containers/LobbyContainer'),
  'LobbyContainer'
)

export const history = createBrowserHistory()

export const Routes = () => {
  const { isLogged } = useProfile()

  return (
    <Router history={history}>
      <Switch>
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <Route path="/" component={MainPage} exact />
            {isLogged && (
              <>
                <Route path="/lobbies" component={LobbiesPage} exact />
                <Route path="/lobbies/:lobbyId" component={LobbyContainer} />
                <Route path="/help" component={HelpPage} />
              </>
            )}
          </Suspense>
        </Layout>
      </Switch>
    </Router>
  )
}
