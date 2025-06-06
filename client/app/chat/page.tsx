import React from 'react'
import FileUploadComponent from '../components/file-upload'
import ChatComponent from '../components/chat'
import { SignedIn, UserButton } from '@clerk/nextjs'

function page() {
  return (
    <div>
    <SignedIn>
      <div className="min-h-screen w-screen flex" suppressHydrationWarning>
        <div className="w-[30vw] min-h-screen p-4 flex justify-center items-center">
          <FileUploadComponent />
        </div>
        <div className="w-[70vw] min-h-screen border-l-2">
        <div className="flex justify-end items-center p-6">
  <UserButton />
</div>
          <ChatComponent />
        </div>
      </div>
    </SignedIn>
    </div>
  )
}

export default page