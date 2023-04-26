export const Loading = () => {
    return (
    <div className="flex justify-center align-middle text-middle h-screen">
        <div className="my-auto animate-spin rounded-full h-32 w-32 border-b-4 border-gray-700 z-2"></div>
      </div>
    )
}

export const InsideLoading = () => {
  return (
    <div className="flex justify-center align-middle text-middle h-full">
        <div className="my-auto animate-spin rounded-full h-32 w-32 border-b-4 border-gray-700 z-2"></div>
      </div>
  )
}

export default Loading;