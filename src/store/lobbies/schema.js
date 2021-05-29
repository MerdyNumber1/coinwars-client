import { schema } from 'normalizr'
import { playerSchema } from 'store/players/schema'

export const lobbySchema = new schema.Entity('lobbies', {
  players: [playerSchema]
})
