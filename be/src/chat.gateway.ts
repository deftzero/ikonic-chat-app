import { Server } from "socket.io"
import { GatewaySessionManager } from "./gateway.session"

const gatewaySession = new GatewaySessionManager()

export const ChatGateway = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: '*'
    }
  })

  io.on('connection', (socket: any) => {

    const user = socket.handshake.auth
    gatewaySession.setUserSocket(user.id, socket)

    socket.on('roomJoin', (data: any) => {
      socket.join(data.roomId)
      const room = gatewaySession.getRoom(data.roomId)
      if(room.users.find((item: any) => item.id == data.user.id) === undefined) {
        room.users.push(data.user)
      }
      gatewaySession.setRoom(data.roomId, room)
      io.to(data.roomId).emit('roomJoin', { user: data.user, room: gatewaySession.getRoom(data.roomId) })
    })

    socket.on('onRoomLeave', (data: any) => {
      socket.leave(data.roomId)
      const room = gatewaySession.getRoom(data.roomId)
      const index = room.users.findIndex((item: any) => item.id == data.user.id)
      if(index > -1) {
        room.users.splice(index, 1)
      }
      gatewaySession.setRoom(data.roomId, room)
      io.to(data.roomId).emit('onRoomLeave', { user: data.user, room: gatewaySession.getRoom(data.roomId) })
    })

    socket.on('onMessage', (data: any) => {
      const room = gatewaySession.getRoom(data.roomId)
      room.messages.push(data.data)
      if(room.messages.length > 10) {
        room.messages.shift()
      }
      gatewaySession.setRoom(data.roomId, room)
      io.to(data.roomId).emit('onMessage', { ...data })
    })

    socket.on('onPrivateMessage', (data: any) => {
      let userSocket = gatewaySession.getUserSocket(data.roomId)
      userSocket.emit('onPrivateMessage', { ...data })
    })

    socket.on('onTypingStart', (data: any) => {
      let userSocket = gatewaySession.getUserSocket(data.roomId)
      if(userSocket) userSocket.emit('onTypingStart', data.user)
      else io.to(data.roomId).emit('onTypingStart', data.user)
    })

    socket.on('onTypingStop', (data: any) => {
      let userSocket = gatewaySession.getUserSocket(data.roomId)
      if(userSocket) userSocket.emit('onTypingStop', data.user)
      else io.to(data.roomId).emit('onTypingStop', data.user)
    })

    socket.emit('ping', { name: 'Yo' })
  })

}


