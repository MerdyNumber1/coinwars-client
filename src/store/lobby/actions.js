import { lobbySlice } from './index';
import { fetchLobbies, fetchLobbyById } from 'services/api';

const { setLobbies, addLobby } = lobbySlice.actions

export const getLobbies = () => (dispatch) => fetchLobbies().then((data) => dispatch(setLobbies(data)))
export const getLobbyById = (id) => (dispatch) => fetchLobbyById(id).then((data) => dispatch(addLobby(data)))
