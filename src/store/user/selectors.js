import { createSelector } from '@reduxjs/toolkit';

export const userInfoSelector = createSelector((state) => state.user.userInfo)
export const isLoggedSelector = createSelector(userInfoSelector, ({ name }) => Boolean(name));
