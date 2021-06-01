import { useDispatch, useSelector } from 'react-redux'
import { getLobbies, getLobbyById } from 'store/lobbies/actions'
import { lobbiesSelectors } from 'store/lobbies/selectors'

export const useLobbies = () => {
  const dispatch = useDispatch()

  return {
    getLobbies: () => dispatch(getLobbies()),
    getLobbyById: (id) => dispatch(getLobbyById(id)),
    selectLobbyById: (id) =>
      useSelector((state) => lobbiesSelectors.selectById(state, id)),
    selectLobbies: () => useSelector(lobbiesSelectors.selectAll),
  }
}
