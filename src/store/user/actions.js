import { nanoid } from 'nanoid'
import { userSlice } from './index';

const { setUserInfo } = userSlice.actions

export const saveUser = ({ name }) => (dispatch) => {
  const userInfo = { name, id: nanoid(8) }

  window.localStorage.setItem('user', JSON.stringify(userInfo))
  dispatch(setUserInfo(userInfo))
}
