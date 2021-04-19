import { useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { useLobbies } from 'hooks/useLobbies';

export const LobbiesCard = () => {
  const { selectLobbies, getLobbies } = useLobbies()

  useEffect(() => {
    getLobbies()
  }, [])

  const lobbies = selectLobbies()

  return (
    <Card style={{width: '18rem'}}>
      <ListGroup variant="flush">
        {lobbies.map(lobby => (
          <ListGroup.Item key={lobby.id}>{lobby.name}</ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  )
}
