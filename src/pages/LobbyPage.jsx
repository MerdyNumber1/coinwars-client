import { Helmet } from 'react-helmet';

export const LobbyPage = ({ lobbyId }) => (
  <>
    <Helmet>
      <title>Lobby {lobbyId}</title>
    </Helmet>
    <div>lobby</div>
  </>
)
