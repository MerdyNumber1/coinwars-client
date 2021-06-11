import { useDispatch, useSelector } from 'react-redux'
import { usersSlice } from 'store/users'
import {
  usersSelectors,
  usersByLobbyIdSelector,
  currentUserSelector,
  usersEntitiesByLobbyIdSelector,
} from 'store/users/selectors'

const { upsertUsers, removeUser } = usersSlice.actions

export const useUsers = () => {
  const dispatch = useDispatch()

  return {
    upsertUsers: (users) => dispatch(upsertUsers(users)),
    removeUserById: (id) => dispatch(removeUser(id)),
    selectUserById: (userId) =>
      useSelector((state) => usersSelectors.selectById(state, userId)),
    selectUsersByLobbyId: (lobbyId) =>
      useSelector(usersByLobbyIdSelector(lobbyId)),
    selectUsersEntitiesByLobbyId: (lobbyId) =>
      useSelector(usersEntitiesByLobbyIdSelector(lobbyId)),
    currentUser: useSelector(currentUserSelector),
  }
}
