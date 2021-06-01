import React from 'react'
import { ListGroup, Button } from 'react-bootstrap'

export const BattleResources = () => (
  <div>
    <h3 className="mt-3 mb-3">Your resources:</h3>
    <ListGroup>
      <ListGroup.Item>Coins: (+5 per second)</ListGroup.Item>
      <ListGroup.Item>Territory: (+5 per second)</ListGroup.Item>
      <ListGroup.Item>Army: (+5 per second)</ListGroup.Item>
    </ListGroup>
    <div className="mt-3 mb-3">
      <Button className="w-100 mb-2" variant="primary">
        Upgrade the army
      </Button>
      <Button className="w-100 mb-2" variant="primary">
        Upgrade coin mining
      </Button>
    </div>
  </div>
)
