import { useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { useLobbies } from 'hooks/useLobbies';
import styled from 'styled-components';
import { LobbyCard } from './LobbyCard';

export const LobbiesCard = () => {
  const { selectLobbies, getLobbies } = useLobbies()
  const lobbies = selectLobbies()

  useEffect(() => {
    getLobbies()
  }, [])

  return (
    <CardWrapper>
      <ListGroup variant="flush">
        {lobbies.map(lobby => (
          <LobbyCard key={lobby.id} lobby={lobby} />
        ))}
      </ListGroup>
    </CardWrapper>
  )
}

const CardWrapper = styled(Card)`
  width: 100%;
`;
