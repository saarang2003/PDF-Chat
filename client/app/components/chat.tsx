'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import * as React from 'react';

interface Doc {
  pageContent?: string;
  metadata?: {
    loc?: {
      pageNumber?: number;
    };
    source?: string;
  };
}
interface IMessage {
  role: 'assistant' | 'user';
  content?: string;
  documents?: Doc[];
}

const ChatComponent: React.FC = () => {
  const [message, setMessage] = React.useState<string>('');
  const [messages, setMessages] = React.useState<IMessage[]>([]);

  console.log({ messages });

  const handleSendChatMessage = async () => {
   const currentMessage = message;
  setMessages((prev) => [...prev, { role: 'user', content: currentMessage }]);
  setMessage('');
  const res = await fetch(`http://localhost:8000/chat?message=${encodeURIComponent(currentMessage)}`);
  const data = await res.json();
  console.log("data" , data);
  console.log("message" , data.message)
  setMessages((prev) => [
    ...prev,
    {
      role: 'assistant',
      content: data?.message,
    },
  ]);
  };

  return (
    <div className="p-4 ">
      <div>
        {messages.map((message, index) => (
    <pre key={index}>{JSON.stringify(message, null, 2)}</pre>
  ))}
      </div>
      <div className="fixed bottom-4 w-[60%]  rounded-xl flex gap-3">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here"
        />
        <Button onClick={handleSendChatMessage} disabled={!message.trim()}>
          Send
        </Button>
      </div>
    </div>
  );
};
export default ChatComponent;