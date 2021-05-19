import { nanoid } from 'nanoid'
import { userSlice } from './index'
import { postUser, patchUser, fetchCurrentUser } from 'services/api'
import { history } from 'routes'

const { setUserInfo, setUserAuth, resetUserState } = userSlice.actions

export const saveUser = ({ name }) => async (dispatch) => {
  const userInfo = { name, token: nanoid(8) }

  const userData = await postUser(userInfo)

  window.localStorage.setItem('token', userInfo.token)
  dispatch(setUserInfo(userData))
  dispatch(setUserAuth({ token: userInfo.token }))
}

export const updateUser = (userData) => async (dispatch) => {
  const updatedUser = await patchUser(userData)
  dispatch(setUserInfo(updatedUser))
}

export const logout = () => (dispatch) => {
  window.localStorage.removeItem('token')
  dispatch(resetUserState())
  history.push('/')
}

export const getCurrentUser = () => (dispatch) => (
  fetchCurrentUser().then(user => dispatch(setUserInfo(user)))
)
