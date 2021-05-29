import { userAdapter } from './index';

export const usersSelectors = userAdapter.getSelectors(
  (state) => state.users
)
export const usersSelector = (state) => state.users
