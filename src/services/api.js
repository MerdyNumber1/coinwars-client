import { default as axiosClient } from 'axios';

export const axios = axiosClient.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    common: {
      Accept: 'application/json',
    },
  },
});

export const fetchLobbies = () => axios.get('lobbies').then(res => res.data)
export const fetchLobbyById = (id) => axios.get(`lobbies/${id}`).then(res => res.data)
