"use client"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Input } from "./ui/input"
import { Search, Settings, Moon, Sun, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Contact } from "./chat-window"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

interface ChatSidebarProps {
  contacts: Contact[]
  activeChat: string
  onSelectChat: (chatId: string) => void
  isDarkMode: boolean
  onToggleDarkMode: () => void
}

export function ChatSidebar({ contacts, activeChat, onSelectChat, isDarkMode, onToggleDarkMode }: ChatSidebarProps) {
  const router = useRouter()

  const handleLogout = () => {
    router.push("/login")
  }

  return (
    <div className="w-80 border-r border-border/30 dark:border-slate-700/50 flex flex-col bg-white/60 dark:bg-slate-900/90 backdrop-blur-xl">
      {/* Header */}
      <div className="p-5 border-b border-border/30 dark:border-slate-700/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-foreground dark:text-white">Messages</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 hover:bg-accent/50 dark:hover:bg-slate-700/50 elegant-hover"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 dark:bg-slate-800 dark:border-slate-700">
              <DropdownMenuLabel className="dark:text-white">Settings</DropdownMenuLabel>
              <DropdownMenuSeparator className="dark:bg-slate-700" />
              <DropdownMenuItem
                onClick={onToggleDarkMode}
                className="cursor-pointer dark:hover:bg-slate-700 dark:text-slate-200"
              >
                {isDarkMode ? (
                  <>
                    <Sun className="h-4 w-4 mr-2" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="h-4 w-4 mr-2" />
                    Dark Mode
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator className="dark:bg-slate-700" />
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer dark:hover:bg-slate-700  text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground dark:text-slate-400" />
          <Input
            placeholder="Search conversations..."
            className="pl-9 bg-background/50 dark:bg-slate-800/50 border-border/50 dark:border-slate-700 focus-visible:ring-2 focus-visible:ring-ring/50 dark:focus-visible:ring-primary/50 rounded-xl dark:text-white dark:placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {contacts.map((contact) => (
          <button
            key={contact.id}
            onClick={() => onSelectChat(contact.id)}
            className={cn(
              "w-full p-4 flex items-start gap-3 hover:bg-accent/50 dark:hover:bg-slate-800/50 transition-all elegant-hover border-b border-border/20 dark:border-slate-700/30",
              activeChat === contact.id && "bg-accent/70 dark:bg-slate-800/70",
            )}
          >
            <div className="relative">
              <Avatar className="h-12 w-12 ring-2 ring-border/30 dark:ring-slate-700">
                <AvatarImage src={contact.avatar } alt={contact.name} />
                <AvatarFallback className="bg-muted dark:bg-slate-700 text-muted-foreground dark:text-slate-300">
                  {contact.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              {contact.online && (
                <span className="absolute bottom-0 right-0 h-3.5 w-3.5 bg-green-500 rounded-full border-2 border-background dark:border-slate-900 shadow-sm" />
              )}
            </div>
            <div className="flex-1 text-left min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-sm text-foreground dark:text-white truncate">{contact.name}</h3>
                <span className="text-xs text-muted-foreground dark:text-slate-400 flex-shrink-0 ml-2">
                  {contact.timestamp}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground dark:text-slate-400 truncate">{contact.lastMessage}</p>
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
