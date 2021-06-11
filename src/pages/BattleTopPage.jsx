import { BattleTopItem } from 'components/battle/BattleTopItem'
import { usePlayers } from 'hooks/usePlayers'
import { Tab, Tabs, ListGroup } from 'react-bootstrap'
import { useMemo } from 'react'

export const BattleTopPage = ({ lobbyId }) => {
  const { selectPlayersByLobbyId } = usePlayers()

  const players = selectPlayersByLobbyId(Number(lobbyId))

  const playersByTerritories = useMemo(
    () => players.sort((a, b) => a.territories - b.territories),
    [players]
  )

  const playersByCoins = useMemo(
    () => players.sort((a, b) => a.coins - b.coins),
    [players]
  )

  const playersByArmy = useMemo(
    () => players.sort((a, b) => a.army - b.army),
    [players]
  )

  return (
    <Tabs defaultActiveKey="territories">
      <Tab eventKey="territories" title="Territory">
        <ListGroup>
          {playersByTerritories.map((player, index) => (
            <BattleTopItem
              key={player.id}
              player={player}
              resource="territories"
              index={index}
            />
          ))}
        </ListGroup>
      </Tab>
      <Tab eventKey="coins" title="Coins">
        <ListGroup>
          {playersByCoins.map((player, index) => (
            <BattleTopItem
              key={player.id}
              player={player}
              resource="coins"
              index={index}
            />
          ))}
        </ListGroup>
      </Tab>
      <Tab eventKey="army" title="Army">
        <ListGroup>
          {playersByArmy.map((player, index) => (
            <BattleTopItem
              key={player.id}
              player={player}
              resource="army"
              index={index}
            />
          ))}
        </ListGroup>
      </Tab>
    </Tabs>
  )
}
