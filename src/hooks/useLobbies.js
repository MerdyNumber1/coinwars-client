import { useDispatch, useSelector } from 'react-redux';
import { getLobbies } from 'store/lobby/actions';
import { lobbiesSelectors } from 'store/lobby/selectors';

export const useLobbies = () => {
  const dispatch = useDispatch();

  return {
    getLobbies: () => dispatch(getLobbies()),
    selectLobbies: () => useSelector(lobbiesSelectors.selectAll)
  }
}

