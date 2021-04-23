import { useDispatch, useSelector } from 'react-redux';
import { saveUser } from 'store/user/actions';
import { isLoggedSelector, userInfoSelector } from 'store/user/selectors';

export const useUser = () => {
  const dispatch = useDispatch();

  return {
    saveUser: (name) => dispatch(saveUser({ name })),
    userInfo: useSelector(userInfoSelector),
    isLogged: useSelector(isLoggedSelector),
  }
}

