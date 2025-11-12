"use client"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Phone, Video, X } from "lucide-react"
import { Button } from "./ui/button"
import { useGetFriendsQuery } from "@/features/friendRequest/friendRequestApi"

interface ChatHeaderProps {
  onClose: () => void
  receiverId: string | null
}

export function ChatHeader({ onClose, receiverId }: ChatHeaderProps) {
  const { data: getFriends = [] } = useGetFriendsQuery()

  // find the active friend by ID
  const receiver = getFriends.find((friend: any) => friend._id === receiverId)
  console.log(receiver);
  

  return (
    <div className="flex items-center justify-between p-5 border-b border-border/30 dark:border-slate-700/50 bg-background/30 dark:bg-slate-800/50 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar className="h-11 w-11 ring-2 ring-primary/20 dark:ring-primary/30 shadow-sm">
            {/* <AvatarImage src={receiver?.profileImage} /> */}
            <AvatarFallback className="bg-muted dark:bg-slate-700 text-muted-foreground dark:text-slate-300">
              {receiver?.fullName?.slice(0, 2) ?? "??"}
            </AvatarFallback>
          </Avatar>

          {/* {receiver?.online && (
            <span className="absolute bottom-0 right-0 h-3.5 w-3.5 bg-green-500 rounded-full border-2 border-background dark:border-slate-800 shadow-sm" />
          )} */}
        </div>

        <div>
          <h2 className="text-base font-semibold text-foreground dark:text-white">
            {receiver?.fullName ?? "Unknown"}
          </h2>
          {/* <p className="text-xs text-muted-foreground dark:text-slate-400">
            {receiver?.online ? "Active now" : "Offline"}
          </p> */}
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 hover:bg-accent/50 dark:hover:bg-slate-700/50 elegant-hover"
        >
          <Phone className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 hover:bg-accent/50 dark:hover:bg-slate-700/50 elegant-hover"
        >
          <Video className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 hover:bg-destructive/20 hover:text-destructive dark:hover:bg-red-900/30 elegant-hover"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
