"use client"

import type React from "react"

import { useState } from "react"
import { Send, Smile, Paperclip, ImageIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

interface ChatInputProps {
  onSendMessage: (text: string) => void
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message)
      setMessage("")
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-5 border-t border-border/30 dark:border-slate-700/50 bg-background/30 dark:bg-slate-800/50 backdrop-blur-sm"
    >
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="shrink-0 h-10 w-10 hover:bg-accent/50 dark:hover:bg-slate-700/50 elegant-hover"
        >
          <Paperclip className="h-4 w-4" />
          <span className="sr-only">Attach file</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="shrink-0 h-10 w-10 hover:bg-accent/50 dark:hover:bg-slate-700/50 elegant-hover"
        >
          <ImageIcon className="h-4 w-4" />
          <span className="sr-only">Add image</span>
        </Button>
        <div className="flex-1 relative">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="pr-12 bg-background/50 dark:bg-slate-800/50 border-border/50 dark:border-slate-700 focus-visible:ring-2 focus-visible:ring-ring/50 dark:focus-visible:ring-primary/50 rounded-full h-11 text-sm dark:text-white dark:placeholder:text-slate-500"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 hover:bg-accent/50 dark:hover:bg-slate-700/50"
          >
            <Smile className="h-4 w-4" />
            <span className="sr-only">Add emoji</span>
          </Button>
        </div>
        <Button
          type="submit"
          size="icon"
          className="shrink-0 h-11 w-11 rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-50 elegant-hover"
          disabled={!message.trim()}
        >
          <Send className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </form>
  )
}
