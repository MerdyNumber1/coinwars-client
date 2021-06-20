import React from 'react'
import { BattleResources } from 'components/battle/BattleResources'
import { usePlayers } from 'hooks/usePlayers'
import { LoadingFallback } from 'components/LoadingFallback'

export const BattleDashboardPage = () => {
  const { currentPlayer } = usePlayers()

  return (
    <section>
      {currentPlayer ? (
        <BattleResources player={currentPlayer} />
      ) : (
        <LoadingFallback />
      )}
    </section>
  )
}
