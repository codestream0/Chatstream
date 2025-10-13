"use client"

import { useState } from "react"
import { ChatHeader } from "./chat-header"
import { ChatMessages } from "./chat-messages"
import { ChatInput } from "./chat-input"
import { ChatSidebar } from "./chat-sidebar"

export interface Message {
  id: string
  text: string
  sender: "user" | "other"
  timestamp: string
  avatar?: string
  senderName?: string
}

const initialMessages: Message[] = [
  {
    id: "1",
    text: "Hey! Are you here?",
    sender: "other",
    timestamp: "13:53",
    avatar: "/professional-person.png",
    senderName: "Sarah Chen",
  },
  {
    id: "2",
    text: "Yeah, just finished the presentation!",
    sender: "user",
    timestamp: "13:53",
    senderName: "You",
  },
  {
    id: "3",
    text: "Great work on the slides! Love it! Just one more thing...",
    sender: "other",
    timestamp: "13:54",
    avatar: "/professional-person.png",
    senderName: "Sarah Chen",
  },
  {
    id: "4",
    text: "Can we add some animations to the charts?",
    sender: "other",
    timestamp: "13:54",
    avatar: "/professional-person.png",
    senderName: "Sarah Chen",
  },
]

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      senderName: "You",
    }
    setMessages([...messages, newMessage])

    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      const replyMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sounds good! I'll work on that right away.",
        sender: "other",
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        avatar: "/professional-person.png",
        senderName: "Sarah Chen",
      }
      setMessages((prev) => [...prev, replyMessage])
    }, 2000)
  }

  return (
    <div className="w-full h-full flex shadow-2xl overflow-hidden glass-effect rounded-3xl">
      <ChatSidebar />
      <div className="flex-1 flex flex-col bg-white/40 dark:bg-black/20 backdrop-blur-xl">
        <ChatHeader />
        <ChatMessages messages={messages} isTyping={isTyping} />
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  )
}
