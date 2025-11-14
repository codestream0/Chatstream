"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "./ui/avatar"
import type { Message } from "./chat-window"
import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"



interface ChatMessagesProps {
  messages: Message[]
  isTyping?: boolean
}

export function ChatMessages({ messages, isTyping }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const currentUserId = useSelector((state: RootState) => state.auth?.userId)
  console.log(currentUserId);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  return (
    <div 
      className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar scroll-smooth "
      style={{
        maxHeight: "calc(100vh - 300px)", 
      }}
    >
      {messages.map((message, index) => {
        const isOwnMessage = message.senderId === currentUserId
        return (
          <div
            key={index}
            className={cn("flex gap-3 animate-slide-up", isOwnMessage ? "flex-row-reverse" : "flex-row")}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {!isOwnMessage && (
              <Avatar className="h-8 w-8 flex-shrink-0 ring-2 ring-border/20 dark:ring-slate-700 shadow-sm">
                <AvatarFallback className="bg-muted dark:bg-slate-700 text-muted-foreground dark:text-slate-300 text-xs">
                  {message.sender?.fullName.split(" ").map(word=>word[0]).join("")
                  .slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}

            <div className={cn("flex flex-col gap-1 max-w-[70%]", isOwnMessage ? "items-end" : "items-start")}>
              <div
                className={cn(
                  "rounded-2xl px-4 py-3 text-pretty shadow-md backdrop-blur-sm",
                  isOwnMessage
                    ? "bg-primary text-primary-foreground rounded-br-md border border-primary/20"
                    : "bg-secondary dark:bg-slate-800 text-secondary-foreground dark:text-white rounded-bl-md border border-border/30",
                )}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
              {message.createdAt && (
                <span className="text-xs text-muted-foreground dark:text-slate-400 px-1">
                  {new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              )}
            </div>
          </div>
        )
      })}

      {isTyping && (
        <div className="flex gap-3 animate-slide-up">
          <Avatar className="h-8 w-8 ring-2 ring-border/20 dark:ring-slate-700 shadow-sm">
            <AvatarFallback className="bg-muted dark:bg-slate-700 text-muted-foreground dark:text-slate-300 text-xs">
              …
            </AvatarFallback>
          </Avatar>
          <div className="bg-secondary dark:bg-slate-800 rounded-2xl rounded-bl-md px-4 py-3 shadow-md border border-border/30 dark:border-slate-700">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-muted-foreground/60 dark:bg-slate-400 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-muted-foreground/60 dark:bg-slate-400 rounded-full animate-bounce delay-150" />
              <span className="w-2 h-2 bg-muted-foreground/60 dark:bg-slate-400 rounded-full animate-bounce delay-300" />
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  )
}
