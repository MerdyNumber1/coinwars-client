import { createSelector } from '@reduxjs/toolkit';

export const userState = (state) => state.user
export const userInfoSelector = createSelector(userState, (state) => state.userInfo)
export const isLoggedSelector = createSelector(userInfoSelector, ({ name }) => Boolean(name));
