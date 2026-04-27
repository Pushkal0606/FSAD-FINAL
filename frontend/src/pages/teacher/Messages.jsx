import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { messagesData } from '../../mock/messages';
import { Send } from 'lucide-react';

export const TeacherMessages = () => {
  const [threads, setThreads] = useState(messagesData);
  const [selectedThread, setSelectedThread] = useState(threads[0] || null);
  const [newMessage, setNewMessage] = useState('');
  const [localMessages, setLocalMessages] = useState(selectedThread?.messages || []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        senderId: 101, // Teacher ID
        body: newMessage,
        sentAt: new Date(),
      };
      setLocalMessages([...localMessages, message]);
      setNewMessage('');
    }
  };

  const selectThread = (thread) => {
    setSelectedThread(thread);
    setLocalMessages(thread.messages);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl flex gap-4 h-[calc(100vh-140px)]">
        {/* Threads List */}
        <div className="w-full md:w-1/3 bg-[#EDE3D2]/80 backdrop-blur-md rounded-sm border border-[#D2B48C]/40">
          <div className="border-b border-[#D2B48C]/40 p-4">
            <h2 className="font-mono font-bold text-[#3E2C23]">Messages</h2>
          </div>
          <div className="overflow-y-auto">
            {threads.map((thread) => (
              <button
                key={thread.id}
                onClick={() => selectThread(thread)}
                className={`w-full text-left px-4 py-3 border-b border-[#D2B48C]/40 transition-colors ${
                  selectedThread?.id === thread.id
                    ? 'bg-[#E6D8C3] border-l-4 border-l-[#A67B5B]'
                    : 'hover:bg-[#E6D8C3]'
                }`}
              >
                <div className="font-mono text-xs text-[#6F4E37] tracking-widest uppercase mb-1">
                  {Object.entries(thread.participantNames)
                    .filter(([id]) => id != 101)
                    .map(([, name]) => name)
                    .join(', ')}
                </div>
                <div className="text-[#3E2C23] text-sm line-clamp-1">
                  {thread.messages[thread.messages.length - 1]?.body || 'No messages'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        {selectedThread && (
          <div className="flex-1 bg-[#EDE3D2]/80 backdrop-blur-md rounded-sm border border-[#D2B48C]/40 flex flex-col">
            <div className="border-b border-[#D2B48C]/40 p-4">
              <h3 className="font-mono font-bold text-[#3E2C23]">
                {Object.entries(selectedThread.participantNames)
                  .filter(([id]) => id != 101)
                  .map(([, name]) => name)
                  .join(', ')}
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {localMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.senderId === 101 ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 ${
                      msg.senderId === 101
                        ? 'bg-[#a855f7] text-black'
                        : 'bg-[#E6D8C3] text-[#3E2C23] border border-[#D2B48C]/40'
                    }`}
                  >
                    <p className="text-sm">{msg.body}</p>
                    <p className="text-xs mt-1 opacity-70 font-mono">
                      {new Date(msg.sentAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#D2B48C]/40 p-4 flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type message..."
                className="flex-1 bg-[#E6D8C3] border border-[#555] px-3 py-2 text-[#3E2C23] focus:border-[#A67B5B] focus:outline-none transition-colors"
              />
              <button
                onClick={handleSendMessage}
                className="text-[#A67B5B] hover:text-[#3E2C23] transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
