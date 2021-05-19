import { Suspense } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { lazyImport } from 'utils/lazyNamedImport'
import { LoadingFallback } from 'components/LoadingFallback'
import { Layout } from 'layout'
import { useUser } from 'hooks/useUser'
import { createBrowserHistory } from 'history'

const MainPage = lazyImport(() => import('pages/MainPage'), 'MainPage')
const LobbiesPage = lazyImport(() => import('pages/LobbiesPage'), 'LobbiesPage')
const LobbyPage = lazyImport(() => import('pages/LobbyPage'), 'LobbyPage')
const HelpPage = lazyImport(() => import('pages/HelpPage'), 'HelpPage')

export const history = createBrowserHistory()

export const Routes = () => {
  const { isLogged } = useUser()

  return (
    <Router history={history}>
      <Switch>
        <Layout>
          <Suspense fallback={<LoadingFallback/>}>
            <Route path="/" component={MainPage} exact/>
            {isLogged && (
              <>
                <Route path="/lobbies" component={LobbiesPage} exact/>
                <Route path="/lobbies/:lobbyId" component={LobbyPage}/>
                <Route path="/help" component={HelpPage}/>
              </>
            )}
          </Suspense>
        </Layout>
      </Switch>
    </Router>
  )
}
