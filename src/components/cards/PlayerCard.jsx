import { ListGroup } from 'react-bootstrap';
import styled from 'styled-components';

export const PlayerCard = ({ player }) => (
  <PlayerCardWrapper>
    <span>{player.name}</span>
  </PlayerCardWrapper>
)

const PlayerCardWrapper = styled(ListGroup.Item)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
