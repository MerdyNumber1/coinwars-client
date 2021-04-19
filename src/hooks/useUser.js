import { useDispatch, useSelector } from 'react-redux';
import { saveName } from 'store/user/actions';
import { isLoggedSelector, userInfoSelector } from 'store/user/selectors';

export const useUser = () => {
  const dispatch = useDispatch();

  return {
    saveName: (name) => dispatch(saveName(name)),
    userInfo: useSelector(userInfoSelector),
    isLogged: useSelector(isLoggedSelector),
  }
}

