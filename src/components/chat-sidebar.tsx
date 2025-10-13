"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "./ui/input"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface Contact {
  id: string
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  online: boolean
  unread?: number
}

const contacts: Contact[] = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: "/professional-person.png",
    lastMessage: "Can we add some animations...",
    timestamp: "13:54",
    online: true,
    unread: 2,
  },
  {
    id: "2",
    name: "Alex Morgan",
    avatar: "/professional-person.png",
    lastMessage: "Thanks for the update!",
    timestamp: "12:30",
    online: true,
  },
  {
    id: "3",
    name: "Jamie Lee",
    avatar: "/professional-person.png",
    lastMessage: "See you tomorrow",
    timestamp: "Yesterday",
    online: false,
  },
  {
    id: "4",
    name: "Taylor Swift",
    avatar: "/professional-person.png",
    lastMessage: "Perfect, let's do it",
    timestamp: "Yesterday",
    online: false,
  },
]

export function ChatSidebar() {
  const [activeChat, setActiveChat] = useState("1")

  return (
    <div className="w-80 border-r border-border/30 flex flex-col bg-white/60 dark:bg-black/40 backdrop-blur-xl">
      {/* Header */}
      <div className="p-5 border-b border-border/30">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">Messages</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            className="pl-9 bg-background/50 border-border/50 focus-visible:ring-2 focus-visible:ring-ring/50 rounded-xl"
          />
        </div>
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {contacts.map((contact) => (
          <button
            key={contact.id}
            onClick={() => setActiveChat(contact.id)}
            className={cn(
              "w-full p-4 flex items-start gap-3 hover:bg-accent/50 transition-all elegant-hover border-b border-border/20",
              activeChat === contact.id && "bg-accent/70",
            )}
          >
            <div className="relative">
              <Avatar className="h-12 w-12 ring-2 ring-border/30">
                <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                <AvatarFallback className="bg-muted text-muted-foreground">{contact.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              {contact.online && (
                <span className="absolute bottom-0 right-0 h-3.5 w-3.5 bg-green-500 rounded-full border-2 border-background shadow-sm" />
              )}
            </div>
            <div className="flex-1 text-left min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-sm text-foreground truncate">{contact.name}</h3>
                <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">{contact.timestamp}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                {contact.unread && (
                  <span className="flex-shrink-0 ml-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-md">
                    {contact.unread}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
