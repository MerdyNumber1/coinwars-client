import { default as axiosClient } from 'axios'
import { userAuthSelector } from 'store/user/selectors'
import { store } from 'store'
import { logout } from 'store/user/actions';

const { getState, dispatch } = store

export const axios = axiosClient.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    common: {
      Accept: 'application/json',
    },
  },
});

axios.interceptors.response.use(
  (response) => Promise.resolve(response),
  async (error) => {
    if (error.response.status === 401) {
      dispatch(logout());
    }

    throw new Error(error);
  }
);

axios.interceptors.request.use(
  (config) => {
    const { token } = userAuthSelector(getState());

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const fetchLobbies = () => axios.get('lobbies?not_started=true').then(res => res.data)
export const fetchLobbyById = (id) => axios.get(`lobbies/${id}`).then(res => res.data)

export const postUser = (userData) => axios.post('players', userData).then(res => res.data)
export const patchUser = (userData) => axios.patch('players/me', userData).then(res => res.data)
