
import { useEffect } from 'react'
import { socket } from './socket'


export default function App() {


  useEffect(() => {
    socket.connect()
  }, [])

  socket.on('ping', (data) => {
    console.log('ping received', data)
  })

  return(
    <h1>Hello Test</h1>
  )
}