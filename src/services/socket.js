import { io } from 'socket.io-client'
import { eventChannel } from 'redux-saga'
import { lobbyEvents } from './socketEvents'

export class Socket {
  connection
  namespace
  events
  eventsChannels

  constructor(namespace, events) {
    this.namespace = namespace
    this.events = events
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

  createEventChannel(eventName) {
    const subscribe = (emitter) => {
      this.connection.on(eventName, emitter)

      return () => this.connection.removeListener(eventName, emitter)
    }

    return eventChannel(subscribe)
  }
}

export const lobbySocket = new Socket('lobbies', lobbyEvents)
