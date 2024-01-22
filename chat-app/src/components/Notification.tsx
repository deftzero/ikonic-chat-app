

export function Notification({ user, type }: any) {
  return (
    <div className="p-1 mb-4 text-sm text-gray-50 rounded-lg bg-gray-800 text-center" role="alert">
      <span className="font-medium">{ user.name }</span> { type } the room.
    </div>
  )
}