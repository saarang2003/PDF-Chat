import React from 'react'
import FileUploadComponent from '../components/file-upload'
import ChatComponent from '../components/chat'
import { SignOutButton } from '@clerk/nextjs'

function page() {
  return (
    <div>
    <div className="min-h-screen w-screen flex" suppressHydrationWarning>
        <div className="w-[30vw] min-h-screen p-4 flex justify-center items-center">
          <FileUploadComponent />
        </div>
        <div className="w-[70vw] min-h-screen border-l-2">
          <div className='flex justify-end m-3'>
          <div className='w-[100] h-[40] bg-violet-500 cursor-pointer text-white rounded-xl flex justify-center '>
            <SignOutButton/>
            </div>
          </div>
          <ChatComponent />
        </div>
      </div>
    </div>
  )
}

export default page