import React from 'react'
import FileUploadComponent from '../components/file-upload'
import ChatComponent from '../components/chat'

function page() {
  return (
    <div>
    <div className="min-h-screen w-screen flex" suppressHydrationWarning>
        <div className="w-[30vw] min-h-screen p-4 flex justify-center items-center">
          <FileUploadComponent />
        </div>
        <div className="w-[70vw] min-h-screen border-l-2">
          <ChatComponent />
        </div>
      </div>
    </div>
  )
}

export default page