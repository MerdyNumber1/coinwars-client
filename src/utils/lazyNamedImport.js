import { lazy } from 'react'

export const lazyImport = (resolver, name = 'default') =>
  lazy(async () => {
    const resolved = await resolver()
    return { default: resolved[name] }
  })
