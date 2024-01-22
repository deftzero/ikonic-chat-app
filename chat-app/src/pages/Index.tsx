
import { useEffect, useState } from 'react'
import { socket } from '../socket'
import axios from 'axios';

const BASE_URL = 'http://localhost:3000'

export default function Index() {

  const [rooms, setRooms] = useState([])
  const [name, setName] = useState('');
  const [connection, setConnection] = useState<'idle' | 'connecting' | 'connected' | 'error'>('idle')

  useEffect(() => {
    (async () => {
      const roomList = await fetchRooms()
      sessionStorage.setItem('rooms', JSON.stringify(roomList))
      setRooms(roomList)
    })()
  }, [])

  function onConnect() {
    setConnection('connecting')

    sessionStorage.setItem('currentUser', JSON.stringify({
      id: Math.random().toString(36).substring(2, 9),
      name,
    }))
    // socket.connect()
    setConnection('connected')
  }

  function onDisconnect() {
    socket.disconnect()
    setConnection('idle')
  }

  return (
    <section className='h-screen flex flex-col gap-10 justify-center items-center'>

      {connection != 'connected' ? (
        <div className='flex flex-col gap-5'>
          <input onChange={(e) => setName(e.target.value)} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter your name" required />
          <button
            disabled={
              name.length === 0
            }
            onClick={onConnect}
            type="button"
            className="text-gray-50 bg-gray-700 hover:bg-gray-600 focus:ring-4 focus:outline-none w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center">
            Connect
          </button>
        </div>
      ) : (
        <button
          onClick={onDisconnect}
          type="button"
          className="text-gray-50 bg-orange-700 hover:bg-orange-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 absolute top-5 right-5">
          Disconnect
        </button>
      )}

      {connection === 'connected' && (
        <>
          <span className='mr-3 text-2xl'>Available Rooms:</span>
          <ul className="flex-column space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
            {rooms.map((item: any) => (
              <li key={item.id}>
                <a href={`/room/${item.id}`} className="inline-flex items-center px-4 py-3 text-white bg-slate-700 rounded-lg active w-full" aria-current="page">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="me-2 text" viewBox="0 0 16 16"> <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                  </svg>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}


    </section>
  )
}


async function fetchRooms() {
  try {
    const response = await axios.get(`${BASE_URL}/rooms`)
    return response.data.data
  } catch (err: any) {
    console.error(err)
  }
}