"use client"

import { useState, useEffect } from "react"
import io from "socket.io-client"
import { ChatHeader } from "./chat-header"
import { ChatMessages } from "./chat-messages"
import { ChatInput } from "./chat-input"
import { ChatSidebar } from "./chat-sidebar"
import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"

// import type { Message } from "./chat-window"

export interface Message {
  _id?: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
  read?: boolean;
  sender?:{
    fullName:string;
  }
}


const socket = io("http://localhost:3300", { transports: ["websocket"] }) 

export function ChatWindow() {
  const userId = useSelector((state: RootState) => state.auth.userId)
  const [messages, setMessages] = useState<Message[]>([])
  const [activeChat, setActiveChat] = useState<string | null>(null)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

useEffect(() => {
  if ( !activeChat || !userId || !socket) return;

  socket.emit("register", userId);

  socket.emit("getMessages", { userA: userId, userB: activeChat });

  const handleReceiveMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const handleOfflineMessages = (offlineMessages: Message[]) => {
    setMessages((prev) => [...prev, ...offlineMessages]);
  };

  const handleChatHistory = (messages:Message[])=>{
    setMessages(messages)
  }



  socket.on("receiveMessage", handleReceiveMessage);
  socket.on("offlineMessage", handleOfflineMessages);
  socket.on("chatHistory", handleChatHistory)

  return () => {
    socket.off("receiveMessage", handleReceiveMessage);
    socket.off("offlineMessage", handleOfflineMessages);
    socket.off("chatHistory", handleChatHistory)
  };
}, [activeChat , userId, socket]);


const handleSendMessage = (text: string) => {
  if (!activeChat || !userId || !socket || !text.trim()) return;

  const newMessage: Message = {
    senderId: userId,
    receiverId: activeChat,
    content: text.trim(),
    createdAt: new Date().toISOString(),
  };

  socket.emit("sendMessage", newMessage);

  setMessages((prev) => [...prev, newMessage]);
};


  const handleSelectChat = (chatId: string) => {
    setActiveChat(chatId)
    setIsChatOpen(true)
  }

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="w-full h-full flex shadow-2xl overflow-hidden glass-effect rounded-3xl">
        <div className={`${isChatOpen ? "hidden md:block" : "block"} w-full md:w-auto`}>
          <ChatSidebar onSelectChat={handleSelectChat} isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
        </div>
        <div className={`${isChatOpen ? "flex" : "hidden md:flex"} flex-1 flex-col bg-white/40 dark:bg-slate-900/90`}>
          {isChatOpen ? (
            <>
              <ChatHeader onClose={() => setIsChatOpen(false)} receiverId={activeChat} />
              <ChatMessages messages={messages} isTyping={isTyping} />
              <ChatInput onSendMessage={handleSendMessage} />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-muted-foreground dark:text-slate-400 text-lg">
                Select a conversation to start messaging
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
