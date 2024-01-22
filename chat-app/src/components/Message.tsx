

export function Message({ data }: any) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="w-10 h-10 rounded-full border-2 border-gray-500 flex items-center justify-center">{ data.createdBy?.name?.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase() }</span>
      <div className="flex flex-col gap-1 w-full max-w-[320px]">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900">{ data.createdBy?.name }</span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
        </div>
        <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl">
          <p className="text-sm font-normal text-gray-900"> { data.content }</p>
        </div>
      </div>
    </div>
  )
}