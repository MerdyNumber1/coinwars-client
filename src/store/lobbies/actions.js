import { lobbySlice } from './index';
import { playersSlice } from 'store/players';
import { fetchLobbies, fetchLobbyById } from 'services/api';

const { addPlayers } = playersSlice.actions
const { setLobbies, addLobby } = lobbySlice.actions

export const getLobbies = () => (dispatch) => fetchLobbies().then((data) => {
  const players = []

  const lobbies = data.lobbies.map(lobby => {
    const { players: lobbyPlayers, ...lobbyData } = lobby
    players.push(lobbyPlayers)
    return lobbyData
  })

  console.log(players)

  dispatch(setLobbies(lobbies))
  dispatch(addPlayers(players))
})
export const getLobbyById = (id) => (dispatch) => fetchLobbyById(id).then((data) => {
  const { players, ...lobby } = data
  dispatch(addLobby(lobby))
  dispatch(addPlayers(players))
})
