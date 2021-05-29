import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchLobbies, fetchLobbyById } from 'services/api'
import { normalize } from 'normalizr'
import { lobbySchema } from './schema'

export const getLobbies = createAsyncThunk('lobbies/fetchLobbies',
  () => fetchLobbies().then((data) => normalize(data.lobbies, [lobbySchema]).entities)
)

export const getLobbyById = createAsyncThunk('lobbies/fetchLobby',
  (id) => fetchLobbyById(id).then((data) => normalize(data.lobbies, lobbySchema).entities)
)
