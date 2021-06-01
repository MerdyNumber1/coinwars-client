import { createSelector } from '@reduxjs/toolkit'

export const profileState = (state) => state.profile
export const profileInfoSelector = createSelector(
  profileState,
  (state) => state.info
)
export const profileAuthSelector = createSelector(
  profileState,
  (state) => state.auth
)
export const isLoggedSelector = createSelector(
  profileAuthSelector,
  ({ token }) => Boolean(token)
)
