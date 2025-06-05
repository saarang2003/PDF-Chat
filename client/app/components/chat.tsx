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

  const handleSendChatMessage = async () => {
    const currentMessage = message;
    setMessages((prev) => [...prev, { role: 'user', content: currentMessage }]);
    setMessage('');
    const res = await fetch(`http://localhost:8000/chat?message=${encodeURIComponent(currentMessage)}`);
    const data = await res.json();
    setMessages((prev) => [
      ...prev,
      {
        role: 'assistant',
        content: data?.message,
      },
    ]);
  };

  return (
    <div className="p-4 h-screen flex flex-col">
      {/* Chat messages container */}
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-2 ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
              style={{ wordBreak: 'break-word' }} // Ensures text wraps
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="fixed bottom-4 w-[60%] rounded-xl flex gap-3">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here"
          className="flex-1"
        />
        <Button onClick={handleSendChatMessage} disabled={!message.trim()}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatComponent;