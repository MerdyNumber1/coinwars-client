import { schema } from 'normalizr'
import { userSchema } from 'store/users/schema';

export const playerSchema = new schema.Entity('players', {
  user: userSchema
})
