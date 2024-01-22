import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom"
import { socket } from "../socket";
import { MessageContainer } from "../components/MessageContainer";
import { SideBar } from "../components/Sidebar";


export function Private() {

  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get('name');

  const localUser: any = sessionStorage.getItem('currentUser')
  const currentUser = JSON.parse(localUser)

  const [msg, setMsg] = useState('');
  const [status, setStatus] = useState<'typing' | 'success' | 'submitting' | 'error'>('typing');
  const [messages, setMessages] = useState<any>([])

  useEffect(() => {

    socket.auth = currentUser
    socket.connect()

    socket.on('onPrivateMessage', ({ data }: any) => {
      setMessages((oldVal: any) => [...oldVal, data])
    })

    return () => {
      socket.off('onPrivateMessage')
    }
  }, [])

  async function handleSubmit(e: any) {
    e.preventDefault();
    setStatus('submitting');
    try {
      const roomMsg = {
        id: Math.random().toString(36).substring(2, 9),
        createdBy: currentUser,
        isMsg: true,
        content: msg,
        createdAt: '2024-01-20T11:44:05.554Z'
      }
      socket.emit('onPrivateMessage', { roomId: id, data: roomMsg })
      setMessages((oldVal: any) => [...oldVal, roomMsg])
      setMsg('')
      socket.emit('onTypingStop', { roomId: id, user: currentUser })
      setStatus('success');
    } catch (err: any) {
      setStatus('error');
    }
  }

  function handleTextChange(e: any) {
    setMsg(e.target.value);
    if (e.target.value.length === 0) {
      socket.emit('onTypingStop', { roomId: id, user: currentUser })
    } else {
      socket.emit('onTypingStart', { roomId: id, user: currentUser })
    }
  }

  return (
    <>
      <h1>Private Room {id}</h1>

      <SideBar name={name} currentUser={currentUser} />

      <div className="p-4 sm:ml-64 mt-20">
        <MessageContainer messages={messages} currentUser={currentUser} />

        <form className="flex flex-row gap-2 mt-5" onSubmit={handleSubmit}>
          <input
            value={msg}
            onChange={handleTextChange}
            disabled={status === 'submitting'}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Message... " required />
          <button
            disabled={
              msg.length === 0 ||
              status === 'submitting'
            }
            type="submit"
            className="text-gray-50 bg-gray-700 hover:bg-gray-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
            Send
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </button>
        </form>
      </div>

    </>
  )
}