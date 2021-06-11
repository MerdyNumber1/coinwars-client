import { ListGroup } from 'react-bootstrap'
import { useUsers } from 'hooks/useUsers'

export const BattleTopItem = ({ player, resource, index }) => {
  const { selectUserById } = useUsers()

  const user = selectUserById(player.user)

  return (
    <ListGroup.Item key={player.id}>
      {index + 1}. {user.name} {player[resource]}
    </ListGroup.Item>
  )
}
