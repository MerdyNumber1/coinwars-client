import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import { getLobbies, getLobbyById } from 'store/lobbies/actions'
import { userAdapter } from 'store/users'

export const playerAdapter = createEntityAdapter()

const localPlayersSelectors = playerAdapter.getSelectors((state) => state)

const playersSlice = createSlice({
  name: 'players',
  initialState: playerAdapter.getInitialState(),
  reducers: {
    addPlayers: playerAdapter.addMany,
    addPlayer: playerAdapter.addOne,
    setPlayers: playerAdapter.setAll,
    removePlayer: playerAdapter.removeOne,
    upsertPlayer: playerAdapter.upsertOne,
    upsertPlayers: playerAdapter.upsertMany,
    updatePlayersResources(state) {
      localPlayersSelectors.selectAll(state).forEach((player) => {
        playerAdapter.updateOne(state, {
          id: player.id,
          changes: {
            coins: player.coins + player.coins_increase,
            army: player.army + player.army_increase,
            territories: player.territories + player.territories_increase,
          },
        })
      })
    },
  },
  extraReducers: {
    [getLobbies.fulfilled]: (state, action) => {
      userAdapter.setAll(state, action.payload.players || {})
    },
    [getLobbyById.fulfilled]: (state, action) => {
      userAdapter.upsertMany(state, action.payload.players || {})
    },
  },
})

export const { actions, reducer } = playersSlice
export const {
  addPlayers,
  addPlayer,
  setPlayers,
  removePlayer,
  upsertPlayer,
  upsertPlayers,
  updatePlayersResources,
} = actions
