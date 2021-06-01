import { default as axiosClient } from 'axios'
import { profileAuthSelector } from 'store/profile/selectors'
import { store } from 'store'
import { logout } from 'store/profile/actions'

const { getState, dispatch } = store

export const axios = axiosClient.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    common: {
      Accept: 'application/json',
    },
  },
})

axios.interceptors.response.use(
  (response) => Promise.resolve(response),
  async (error) => {
    if (error.response && error.response.status === 401) {
      dispatch(logout())
    }

    return Promise.reject(error)
  }
)

axios.interceptors.request.use(
  (config) => {
    const { token } = profileAuthSelector(getState())

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export const fetchLobbies = () =>
  axios.get('lobbies?not_started=true').then((res) => res.data)
export const fetchLobbyById = (id) =>
  axios.get(`lobbies/${id}`).then((res) => res.data)

export const postUser = (userData) =>
  axios.post('users', userData).then((res) => res.data)
export const patchUser = (userData) =>
  axios.patch('users/me', userData).then((res) => res.data)

export const fetchCurrentUser = () =>
  axios.get('users/me').then((res) => res.data)
