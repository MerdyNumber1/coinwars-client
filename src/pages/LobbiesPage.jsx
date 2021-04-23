import { Helmet } from 'react-helmet';
import { LobbiesCard } from 'components/cards/LobbiesCard';
import styled from 'styled-components';
import { RefreshButton } from 'components/RefreshButton';
import { useLobbies } from 'hooks/useLobbies';

export const LobbiesPage = () => {
  const { getLobbies } = useLobbies()

  const onLobbiesRefresh = () => getLobbies()

  return (
    <>
      <Helmet>
        <title>Lobbies</title>
      </Helmet>
      <LobbiesWrapper>
        <RefreshWrapper>
          <RefreshButton onClick={onLobbiesRefresh} />
        </RefreshWrapper>
        <LobbiesCard />
      </LobbiesWrapper>
    </>
  )
}

const LobbiesWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 92%;
  max-width: 400px;
  margin: 0 auto;
  align-items: center;
`;

const RefreshWrapper = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;
