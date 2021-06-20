import { ListGroup, Button } from 'react-bootstrap'
import { useUsers } from 'hooks/useUsers'
import { usePlayers } from 'hooks/usePlayers'

export const BattleTopItem = ({ player, resource, index }) => {
  const { selectUserById, currentUser } = useUsers()
  const { attackPlayer } = usePlayers()
  const user = selectUserById(player.user)

  return (
    <ListGroup.Item key={player.id}>
      {index + 1}. {user.name} - {player[resource]} {resource}
      {user.id !== currentUser.id && (
        <Button className="w-100 mt-2" onClick={() => attackPlayer(player.id)}>
          Attack ({player.army + player.territories} army to win)
        </Button>
      )}
    </ListGroup.Item>
  )
}
