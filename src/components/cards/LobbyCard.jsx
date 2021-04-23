import { ListGroup, Button } from 'react-bootstrap';
import styled from 'styled-components';

export const LobbyCard = ({ lobby }) => <LobbyCardWrapper>
  <span>{lobby.name}</span>
  <div>
    <span>{lobby.entered} / {lobby.player_limit}</span>
    <JoinButton variant="primary">Join</JoinButton>
  </div>
</LobbyCardWrapper>

const LobbyCardWrapper = styled(ListGroup.Item)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const JoinButton = styled(Button)`
  margin-left: 10px;
`;
