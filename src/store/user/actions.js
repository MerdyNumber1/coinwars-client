import { userSlice } from './index';

const { setName } = userSlice.actions

export const saveName = (name) => (dispatch) => {
  window.localStorage.setItem('name', name)
  dispatch(setName(name))
}
