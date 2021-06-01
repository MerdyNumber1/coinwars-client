import { ListGroup, Button } from 'react-bootstrap'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

export const LobbyCard = ({ lobby }) => {
  const history = useHistory()

  const onLobbyJoinClick = (lobbyId) => history.push(`lobbies/${lobbyId}`)

  return (
    <LobbyCardWrapper>
      <span>{lobby.name}</span>
      <div>
        <span>
          {lobby.entered} / {lobby.player_limit}
        </span>
        <JoinButton
          onClick={() => onLobbyJoinClick(lobby.id)}
          variant="primary"
        >
          Join
        </JoinButton>
      </div>
    </LobbyCardWrapper>
  )
}

const LobbyCardWrapper = styled(ListGroup.Item)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const JoinButton = styled(Button)`
  margin-left: 10px;
`
