import { nanoid } from '@reduxjs/toolkit'
import { setInfo, setAuth, reset } from './index'
import { postUser, patchUser, fetchCurrentUser } from 'services/api'
import { history } from 'routes'

export const saveProfile =
  ({ name }) =>
  async (dispatch) => {
    const profileInfo = { name, token: nanoid(8) }

    const profileData = await postUser(profileInfo)

    window.localStorage.setItem('token', profileInfo.token)
    dispatch(setInfo(profileData))
    dispatch(setAuth({ token: profileInfo.token }))
  }

export const updateProfile = (profileData) => async (dispatch) => {
  const updateProfile = await patchUser(profileData)
  dispatch(setInfo(updateProfile))
}

export const logout = () => (dispatch) => {
  window.localStorage.removeItem('token')
  dispatch(reset())
  history.push('/')
}

export const getProfile = () => (dispatch) =>
  fetchCurrentUser().then((profile) => dispatch(setInfo(profile)))
