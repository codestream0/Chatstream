"use client"

import { useState, useEffect } from "react"
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

export interface Contact {
  id: string
  name: string
  avatar?: string
  lastMessage: string
  timestamp: string
  online: boolean
  unread?: number
}

const contacts: Contact[] = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: "/pics.png",
    lastMessage: "Can we add some animations...",
    timestamp: "13:54",
    online: true,
    unread: 2,
  },
  {
    id: "2",
    name: "Alex Morgan",
    avatar: "/alex.png",
    lastMessage: "Thanks for the update!",
    timestamp: "12:30",
    online: true,
  },
  {
    id: "3",
    name: "Jamie Lee",
    avatar: "/alex.png",
    lastMessage: "See you tomorrow",
    timestamp: "Yesterday",
    online: false,
  },
  {
    id: "4",
    name: "Taylor Swift",
    // avatar: "",
    lastMessage: "Perfect, let's do it",
    timestamp: "Yesterday",
    online: false,
  },
]

const messagesByContact: Record<string, Message[]> = {
  "1": [
    {
      id: "1",
      text: "Hey! Are you here?",
      sender: "other",
      timestamp: "13:53",
      avatar: "/pics.png",
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
      avatar: "/pics.png",
      senderName: "Sarah Chen",
    },
    {
      id: "4",
      text: "Can we add some animations to the charts?",
      sender: "other",
      timestamp: "13:54",
      avatar: "/pics.png",
      senderName: "Sarah Chen",
    },
  ],
  "2": [
    {
      id: "1",
      text: "Did you see the latest updates?",
      sender: "other",
      timestamp: "12:25",
      avatar: "/alex.png",
      senderName: "Alex Morgan",
    },
    {
      id: "2",
      text: "Yes! They look amazing!",
      sender: "user",
      timestamp: "12:28",
      senderName: "You",
    },
    {
      id: "3",
      text: "Thanks for the update!",
      sender: "other",
      timestamp: "12:30",
      avatar: "/alex.png",
      senderName: "Alex Morgan",
    },
  ],
  "3": [
    {
      id: "1",
      text: "Meeting at 3pm tomorrow?",
      sender: "other",
      timestamp: "Yesterday",
      avatar: "/pics.png",
      senderName: "Jamie Lee",
    },
    {
      id: "2",
      text: "Perfect! See you then.",
      sender: "user",
      timestamp: "Yesterday",
      senderName: "You",
    },
    {
      id: "3",
      text: "See you tomorrow",
      sender: "other",
      timestamp: "Yesterday",
      avatar: "/alex.png",
      senderName: "Jamie Lee",
    },
  ],
  "4": [
    {
      id: "1",
      text: "Can we schedule a call?",
      sender: "other",
      timestamp: "Yesterday",
      // avatar: "/professional-person.png",
      senderName: "Taylor Swift",
    },
    {
      id: "2",
      text: "Sure, how about 2pm?",
      sender: "user",
      timestamp: "Yesterday",
      senderName: "You",
    },
    {
      id: "3",
      text: "Perfect, let's do it",
      sender: "other",
      timestamp: "Yesterday",
      // avatar: "/professional-person.png",
      senderName: "Taylor Swift",
    },
  ],
}

export function ChatWindow() {
  const [allMessages, setAllMessages] = useState<Record<string, Message[]>>(messagesByContact)
  const [isTyping, setIsTyping] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(true)
  const [activeChat, setActiveChat] = useState("1")
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("chat-dark-mode")
    if (savedDarkMode) {
      setIsDarkMode(savedDarkMode === "true")
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    localStorage.setItem("chat-dark-mode", String(newDarkMode))
  }

  const activeContact = contacts.find((c) => c.id === activeChat)
  const currentMessages = allMessages[activeChat] || []

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

    setAllMessages((prev) => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), newMessage],
    }))

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
        avatar: activeContact?.avatar,
        senderName: activeContact?.name,
      }
      setAllMessages((prev) => ({
        ...prev,
        [activeChat]: [...(prev[activeChat] || []), replyMessage],
      }))
    }, 2000)
  }

  const handleCloseChat = () => {
    setIsChatOpen(false)
  }

  const handleSelectChat = (chatId: string) => {
    setActiveChat(chatId)
    setIsChatOpen(true)
  }

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="w-full h-full flex shadow-2xl overflow-hidden glass-effect rounded-3xl">
        <div className={`${isChatOpen ? "hidden md:block" : "block"} w-full md:w-auto`}>
          <ChatSidebar
            contacts={contacts}
            activeChat={activeChat}
            onSelectChat={handleSelectChat}
            isDarkMode={isDarkMode}
            onToggleDarkMode={toggleDarkMode}
          />
        </div>
        <div
          className={`${isChatOpen ? "flex" : "hidden md:flex"} flex-1 flex-col bg-white/40 dark:bg-slate-900/90 backdrop-blur-xl`}
        >
          {isChatOpen && activeContact ? (
            <>
              <ChatHeader contact={activeContact} onClose={handleCloseChat} />
              <ChatMessages messages={currentMessages} isTyping={isTyping} activeContact={activeContact} />
              <ChatInput onSendMessage={handleSendMessage} />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground dark:text-slate-400 text-lg">
                  Select a conversation to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
