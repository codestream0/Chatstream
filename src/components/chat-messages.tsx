"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import type { Message } from "@/components/chat-window"

interface ChatMessagesProps {
  messages: Message[]
  isTyping?: boolean
}

export function ChatMessages({ messages, isTyping }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
      {messages.map((message, index) => (
        <div
          key={message.id}
          className={cn("flex gap-3 animate-slide-up", message.sender === "user" ? "flex-row-reverse" : "flex-row")}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {message.sender === "other" && (
            <Avatar className="h-8 w-8 flex-shrink-0 ring-2 ring-border/20 shadow-sm">
              <AvatarImage src={message.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                {message.senderName?.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          )}

          <div
            className={cn("flex flex-col gap-1 max-w-[70%]", message.sender === "user" ? "items-end" : "items-start")}
          >
            <div
              className={cn(
                "rounded-2xl px-4 py-3 text-pretty shadow-md transition-all hover:shadow-lg backdrop-blur-sm",
                message.sender === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md border border-primary/20"
                  : "bg-secondary text-secondary-foreground rounded-bl-md border border-border/30",
              )}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
            </div>
            <span className="text-xs text-muted-foreground px-1">{message.timestamp}</span>
          </div>
        </div>
      ))}

      {isTyping && (
        <div className="flex gap-3 animate-slide-up">
          <Avatar className="h-8 w-8 ring-2 ring-border/20 shadow-sm">
            <AvatarImage src="/professional-person.png" />
            <AvatarFallback className="bg-muted text-muted-foreground text-xs">SC</AvatarFallback>
          </Avatar>
          <div className="bg-secondary backdrop-blur-sm rounded-2xl rounded-bl-md px-4 py-3 shadow-md border border-border/30">
            <div className="flex gap-1">
              <span
                className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <span
                className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <span
                className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  )
}
