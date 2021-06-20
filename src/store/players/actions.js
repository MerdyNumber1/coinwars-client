import { createAction } from '@reduxjs/toolkit'

export const playerArmyUpgradeAction = createAction('players/playerArmyUpgrade')
export const playerCoinsUpgradeAction = createAction(
  'players/playerCoinsUpgrade'
)
export const playerAttackAction = createAction('players/playerAttack')
