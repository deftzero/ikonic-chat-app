import { useEffect, useRef, useState } from "react";
import { Message } from "./Message";
import { Notification } from "./Notification";
import { socket } from "../socket";
import { TypingIndicator } from "./TypingIndicator";


export function MessageContainer({ messages, currentUser }: any) {

  const ref = useRef<HTMLDivElement>(null);
  const [typingUser, setTypingUser] = useState<any>(null)

  useEffect(() => {
    socket.on('onTypingStart', (data: any) => {
      if (currentUser.id !== data.id) {
        setTypingUser(data)
      }
    })

    socket.on('onTypingStop', (data: any) => {
      setTypingUser(null)
    })

  }, [])

  // auto scroll on message
  useEffect(() => {
    if (messages?.length) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages?.length]);

  return (
    <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 flex flex-col gap-5 flex-grow h-[660px] overflow-auto">
      {messages?.map((item: any) => (
        <div key={item.id}>
          {item.isMsg ? (
            <Message data={item} />
          ) : (
            <Notification user={{ name: item.user.name }} type={item.notification} />
          )}
        </div>
      ))}
      {typingUser && (
        <TypingIndicator user={{ name: typingUser.name }} />
      )}
      <div ref={ref} />
    </div>
  )
}