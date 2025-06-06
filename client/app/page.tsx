/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import FileUploadComponent from './components/file-upload';
import ChatComponent from './components/chat';
import Landing from './components/Landing';
import ScrollImage from './components/ScrollImage';
import Header from './components/Header';




export default function Home() {

  return (
    <div>
     <Header/>
     <Landing/>
    </div>
  );
}