import { createSelector } from '@reduxjs/toolkit'
import { profileSelector } from './index'

export const profileInfoSelector = createSelector(
  profileSelector,
  (state) => state.info
)
export const profileAuthSelector = createSelector(
  profileSelector,
  (state) => state.auth
)
export const isLoggedSelector = createSelector(
  profileAuthSelector,
  ({ token }) => Boolean(token)
)
