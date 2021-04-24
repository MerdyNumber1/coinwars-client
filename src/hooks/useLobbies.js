import { useDispatch, useSelector } from 'react-redux';
import { getLobbies, getLobbyById } from 'store/lobby/actions';
import { lobbiesSelectors } from 'store/lobby/selectors';
import { lobbySlice } from 'store/lobby';

const { addLobbyPlayer } = lobbySlice

export const useLobbies = () => {
  const dispatch = useDispatch();

  return {
    getLobbies: () => dispatch(getLobbies()),
    getLobbyById: (id) => dispatch(getLobbyById(id)),
    selectLobbyById: (id) => useSelector((state) => lobbiesSelectors.selectById(state, id)),
    addPlayerToLobby: (lobbyId, player) => dispatch(addLobbyPlayer({ id: lobbyId, player })),
    lobbies: useSelector(lobbiesSelectors.selectAll),
  }
}

