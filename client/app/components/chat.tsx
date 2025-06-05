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

  // Function to format the message content
  const formatMessageContent = (content: string | undefined) => {
    if (!content) return null;

    // Split the content into lines
    const lines = content.split('\n');
    const elements: React.JSX.Element[] = [];
    let inList = false;

    lines.forEach((line, index) => {
      // Check if the line is a numbered list item (e.g., "1. **Virtual DOM**: ...")
      const listMatch = line.match(/^(\d+)\.\s*\*\*(.*?)\*\*:(.*)/);
      if (listMatch) {
        const [, , title, description] = listMatch;
        if (!inList) {
          inList = true;
          elements.push(
            <ul key={`list-${index}`} className="list-decimal pl-5">
              <li key={index} className="mb-2">
                <strong>{title}:</strong> {description.trim()}
              </li>
            </ul>
          );
        } else {
          // Add to the existing <ul>
          const lastUl = elements[elements.length - 1];
          if (lastUl.type === 'ul') {
            lastUl.props.children.push(
              <li key={index} className="mb-2">
                <strong>{title}:</strong> {description.trim()}
              </li>
            );
          }
        }
      } else {
        // If we're in a list and this line isn't a list item, close the list
        if (inList) {
          inList = false;
        }
        // Add the line as a paragraph if it's not empty
        if (line.trim()) {
          elements.push(
            <p key={index} className="mb-2">
              {line}
            </p>
          );
        }
      }
    });

    return elements;
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
              {msg.role === 'assistant' ? (
                <div>{formatMessageContent(msg.content)}</div>
              ) : (
                msg.content
              )}
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