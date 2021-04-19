import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { lazyImport } from 'utils/lazyNamedImport';
import { LoadingFallback } from 'components/LoadingFallback';
import { Layout } from 'layout';

const MainPage = lazyImport(() => import('pages/MainPage'), 'MainPage')
const LobbiesPage = lazyImport(() => import('pages/LobbiesPage'), 'LobbiesPage')
const LobbyPage = lazyImport(() => import('pages/LobbyPage'), 'LobbyPage')
const HelpPage = lazyImport(() => import('pages/HelpPage'), 'HelpPage')

export const Routes = () => (
  <Router>
    <Switch>
      <Layout>
        <Suspense fallback={<LoadingFallback />}>
          <Route path="/" component={MainPage} exact />
          <Route path="/lobbies" component={LobbiesPage} exact />
          <Route path="/lobbies/:lobbyId" component={LobbyPage} />
          <Route path="/help" component={HelpPage} />
        </Suspense>
      </Layout>
    </Switch>
  </Router>
)

