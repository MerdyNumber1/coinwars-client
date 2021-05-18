import { createSelector } from '@reduxjs/toolkit';

export const userState = (state) => state.user
export const userInfoSelector = createSelector(userState, (state) => state.info)
export const userAuthSelector = createSelector(userState, (state) => state.auth)
export const isLoggedSelector = createSelector(userAuthSelector, ({ token }) => Boolean(token));
