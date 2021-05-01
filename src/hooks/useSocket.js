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
    onConnect: (cb) => socket.on('connect', cb),
    onDisconnect: (cb) => socket.on('disconnect', cb),
    onEvent: (eventName, cb) => socket.on(eventName, cb),
    emitEvent: (eventName, ...args) => socket.emit(eventName, ...args)
  }
}
