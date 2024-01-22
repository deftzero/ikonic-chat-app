import { useNavigate } from "react-router-dom";
import { socket } from "../socket";


export function SideBar({ name, rooms, roomUsers, id, currentUser }: any) {

  const navigate = useNavigate();

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
              </button>
              <h1 className="text-gray-300 text-2xl font-bold">
                {rooms && rooms.length > 0 ? (
                  <>
                    Room: {rooms.find((i: any) => i.id == id).name}
                  </>
                ) : (
                  <>
                    Private: {name}
                  </>
                )}

              </h1>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div>
                  <a onClick={() => {
                    if (rooms && rooms.length > 0) {
                      socket.emit('onRoomLeave', { roomId: id, user: currentUser })
                    }
                    return navigate('/')
                  }} className="cursor-pointer text-slate-800 bg-white hover:bg-gray-300 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
                    Exit
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <aside id="default-sidebar" className="fixed top-12 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-6 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {name && name.length > 0 ? (
              <li>
                <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <span className="ms-3">{name}</span>
                </a>
              </li>
            ) : (
              roomUsers?.map((item: any) => (
                currentUser.id === item.id ? (
                  <li key={item.id}>
                    <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      <span className="ms-3">
                        {item.name}
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded ml-5">
                          Me
                        </span>
                      </span>
                    </a>
                  </li>
                ) : (
                  <li key={item.id}>
                    <a href={`/private/${item.id}?name=${item.name}`} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      <span className="ms-3">
                        {item.name}
                      </span>
                    </a>
                  </li>
                )
              ))
            )}
          </ul>
        </div>
      </aside>
    </>
  )
}