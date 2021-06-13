import React from 'react'
import { ListGroup, Button } from 'react-bootstrap'
import { lobbySocket } from 'services/socket'

export const BattleResources = ({ player }) => {
  const onArmyUpgrade = () => lobbySocket.emit('player_upgrade', { army: true })
  const onCoinsUpgrade = () =>
    lobbySocket.emit('player_upgrade', { coins: true })

  return (
    <div>
      <h3 className="mt-3 mb-3">Your resources:</h3>
      <ListGroup>
        <ListGroup.Item>
          Coins: {player.coins} (+{player.coins_increase} per second)
        </ListGroup.Item>
        <ListGroup.Item>
          Territory: {player.territories} (+{player.territories_increase} per
          second)
        </ListGroup.Item>
        <ListGroup.Item>
          Army: {player.army} (+{player.army_increase} per second)
        </ListGroup.Item>
      </ListGroup>
      <div className="mt-3 mb-3">
        <Button
          className="w-100 mb-2"
          variant="primary"
          onClick={onArmyUpgrade}
        >
          Upgrade the army
        </Button>
        <Button
          className="w-100 mb-2"
          variant="primary"
          onClick={onCoinsUpgrade}
        >
          Upgrade coin mining
        </Button>
      </div>
    </div>
  )
}