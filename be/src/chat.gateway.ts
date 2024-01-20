import { Server } from "socket.io"

export const ChatGateway = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: '*'
    }
  })
  io.on('connection', (socket) => {
    console.log('a user connected')

    socket.emit('ping', { data: 'Hello'})
  })
}


