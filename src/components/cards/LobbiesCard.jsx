import { Card, ListGroup } from 'react-bootstrap'
import styled from 'styled-components'
import { LobbyCard } from './LobbyCard'

export const LobbiesCard = ({ lobbies }) => (
  <CardWrapper>
    <ListGroup variant="flush">
      {lobbies.map((lobby) => (
        <LobbyCard key={lobby.id} lobby={lobby} />
      ))}
    </ListGroup>
  </CardWrapper>
)

const CardWrapper = styled(Card)`
  width: 100%;
`
