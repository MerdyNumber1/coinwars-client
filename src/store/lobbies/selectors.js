import { lobbiesAdapter } from './index'

export const lobbiesSelectors = lobbiesAdapter.getSelectors(
  (state) => state.lobbies
)
