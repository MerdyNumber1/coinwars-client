import { useDispatch, useSelector } from 'react-redux';
import { saveProfile, updateProfile, getProfile } from 'store/profile/actions';
import { isLoggedSelector, profileInfoSelector, profileAuthSelector } from 'store/profile/selectors';

export const useProfile = () => {
  const dispatch = useDispatch();

  return {
    updateProfile: (userData) => dispatch(updateProfile(userData)),
    saveProfile: (name) => dispatch(saveProfile({ name })),
    profileInfo: useSelector(profileInfoSelector),
    profileAuth: useSelector(profileAuthSelector),
    isLogged: useSelector(isLoggedSelector),
    getProfile: () => dispatch(getProfile())
  }
}
