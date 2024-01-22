

export function TypingIndicator({ user }) {
  return (


    <div className="flex items-start gap-2.5">
      <span className="w-10 h-10 rounded-full border-2 border-gray-500 flex items-center justify-center">{user.name.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase()}</span>
      <div className="flex flex-col gap-1 w-full max-w-[320px]">
        <div className="flex flex-col leading-1.5 p-2 rounded-e-xl rounded-es-xl">
          <div id="wave">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      </div>
    </div>
  )
}