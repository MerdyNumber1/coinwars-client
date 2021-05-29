import React from 'react'
import { useRouteMatch } from 'react-router-dom'

export const BattleTopPage = () => {
  const { url } = useRouteMatch()

  console.log(url)

  return <div>top stats</div>
}
