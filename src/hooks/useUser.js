import { useDispatch, useSelector } from 'react-redux';
import { saveUser, updateUser, getCurrentUser } from 'store/user/actions';
import { isLoggedSelector, userInfoSelector } from 'store/user/selectors';

export const useUser = () => {
  const dispatch = useDispatch();

  return {
    updateUser: (userData) => dispatch(updateUser(userData)),
    saveUser: (name) => dispatch(saveUser({ name })),
    userInfo: useSelector(userInfoSelector),
    isLogged: useSelector(isLoggedSelector),
    getCurrentUser: () => dispatch(getCurrentUser())
  }
}

