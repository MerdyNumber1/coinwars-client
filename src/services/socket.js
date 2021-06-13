import { io } from 'socket.io-client'

export class Socket {
  connection
  namespace

  constructor(namespace, query) {
    this.namespace = namespace
    this.connection = io(
      `${process.env.REACT_APP_SOCKET_URL}/${this.namespace}`,
      {
        transports: ['websocket', 'polling', 'flashsocket'],
        reconnectionDelayMax: 10000,
        autoConnect: false,
      }
    )
  }

  connect(query) {
    this.connection.io.opts.query = query
    this.connection.connect()
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
