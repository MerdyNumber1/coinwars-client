import { io } from 'socket.io-client'

export class Socket {
  connection
  namespace

  constructor(namespace, query) {
    this.namespace = namespace
  }

  connect(query) {
    this.connection = io(
      `${process.env.REACT_APP_SOCKET_URL}/${this.namespace}`,
      {
        transports: ['websocket', 'polling', 'flashsocket'],
        reconnectionDelayMax: 10000,
        query,
      }
    )
  }

  onConnect(cb) {
    this.connection.on('connect', cb)
  }

  onDisconnect(cb) {
    this.connection.on('disconnect', cb)
  }

  onEvent(eventName, cb) {
    this.connection.on(eventName, cb)
  }

  emit(eventName, ...args) {
    this.connection.emit(eventName, ...args)
  }

  replaceListener(eventName, cb) {
    this.connection.off(eventName)
    this.onEvent(eventName, cb)
  }

  disconnect() {
    this.connection.disconnect()
  }
}

export const lobbySocket = new Socket('lobbies')
export const battleSocket = new Socket('battles')
