import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { messagesData } from '../../mock/messages';
import { Send } from 'lucide-react';

export const StudentMessages = () => {
 const [threads, setThreads] = useState(messagesData);
 const [selectedThread, setSelectedThread] = useState(threads[0] || null);
 const [newMessage, setNewMessage] = useState('');
 const [localMessages, setLocalMessages] = useState(
 selectedThread?.messages || []
 );

 const handleSendMessage = () => {
 if (newMessage.trim()) {
 const message = {
 senderId: 1,
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
 <div className="w-full md:w-1/3 bg-black rounded-sm border border-[#333]">
 <div className="border-b border-[#333] p-4">
 <h2 className="font-mono font-bold text-white">Messages</h2>
 </div>
 <div className="overflow-y-auto">
 {threads.map((thread) => (
 <button
 key={thread.id}
 onClick={() => selectThread(thread)}
 className={`w-full text-left px-4 py-3 border-b border-[#333] transition-colors ${
 selectedThread?.id === thread.id
 ? 'bg-[#111] border-l-4 border-l-[#a855f7]'
 : 'hover:bg-[#111]'
 }`}
 >
 <div className="font-mono text-xs text-gray-400 tracking-widest uppercase mb-1">
 {Object.entries(thread.participantNames)
 .filter(([id]) => id != 1)
 .map(([, name]) => name)
 .join(', ')}
 </div>
 <div className="text-white text-sm line-clamp-1">
 {thread.messages[thread.messages.length - 1]?.body || 'No messages'}
 </div>
 </button>
 ))}
 </div>
 </div>

 {/* Chat Area */}
 {selectedThread && (
 <div className="flex-1 bg-black rounded-sm border border-[#333] flex flex-col">
 <div className="border-b border-[#333] p-4">
 <h3 className="font-mono font-bold text-white">
 {Object.entries(selectedThread.participantNames)
 .filter(([id]) => id != 1)
 .map(([, name]) => name)
 .join(', ')}
 </h3>
 </div>

 <div className="flex-1 overflow-y-auto p-4 space-y-3">
 {localMessages.map((msg, idx) => (
 <div
 key={idx}
 className={`flex ${msg.senderId === 1 ? 'justify-end' : 'justify-start'}`}
 >
 <div
 className={`max-w-xs px-4 py-2 ${
 msg.senderId === 1
 ? 'bg-[#a855f7] text-black'
 : 'bg-[#111] text-white border border-[#333]'
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

 <div className="border-t border-[#333] p-4 flex gap-2">
 <input
 type="text"
 value={newMessage}
 onChange={(e) => setNewMessage(e.target.value)}
 onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
 placeholder="Type message..."
 className="flex-1 bg-[#111] border border-[#555] px-3 py-2 text-white focus:border-[#a855f7] focus:outline-none transition-colors"
 />
 <button
 onClick={handleSendMessage}
 className="text-[#a855f7] hover:text-white transition-colors"
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
