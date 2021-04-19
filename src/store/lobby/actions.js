import { lobbySlice } from './index';
import { fetchLobbies } from 'services/api';

const { setLobbies } = lobbySlice.actions


export const getLobbies = () => (dispatch) => fetchLobbies().then((data) => dispatch(setLobbies(data)))
