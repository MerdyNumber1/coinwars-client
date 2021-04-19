import { Helmet } from 'react-helmet';
import { LobbiesCard } from 'components/cards/LobbiesCard';

export const LobbiesPage = () => (
  <>
    <Helmet>
      <title>Lobbies</title>
    </Helmet>
    <div>
      <LobbiesCard />
    </div>
  </>
)
