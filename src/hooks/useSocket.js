import { useMemo } from 'react';
import { io } from 'socket.io-client';

export const useSocket = (namespace, query) => {
  const socket = useMemo(() => io(`${process.env.REACT_APP_SOCKET_URL}/${namespace}`, {
    transports: ['websocket', 'polling', 'flashsocket'],
    reconnectionDelayMax: 10000,
    query
  }), []);

  return {
    socket,
    onConnect: (cb) => useMemo(() => socket.on('connect', cb), []),
    onDisconnect: (cb) => useMemo(() => socket.on('disconnect', cb), []),
    onEvent: (eventName, cb) => useMemo(() => socket.on(eventName, cb), []),
    emitEvent: (eventName, ...args) => socket.emit(eventName, ...args),
    disconnect: () => socket.disconnect()
  }
}
