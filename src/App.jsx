import 'assets/styles/index.scss';
import { Routes } from 'routes';
import { store } from 'store';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';

export const App = () => (
  <Provider store={store}>
    <Helmet titleTemplate="%s - Coin Wars" defaultTitle="Coin Wars" />
    <Routes />
  </Provider>
)
