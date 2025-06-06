/* eslint-disable @typescript-eslint/no-unused-vars */
import FileUploadComponent from './components/file-upload';
import ChatComponent from './components/chat';
import Landing from './components/Landing';
import ScrollImage from './components/ScrollImage';
import Header from './components/Header';

export default function Home() {
  return (
    <div>
      {/* <div className="min-h-screen w-screen flex" suppressHydrationWarning>
        <div className="w-[30vw] min-h-screen p-4 flex justify-center items-center">
          <FileUploadComponent />
        </div>
        <div className="w-[70vw] min-h-screen border-l-2">
          <ChatComponent />
        </div>
      </div> */}
     {/* <Landing/> */}
     <Header/>
    </div>
  );
}