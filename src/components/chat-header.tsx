import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Phone, Video, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ChatHeader() {
  return (
    <div className="flex items-center justify-between p-5 border-b border-border/30 bg-background/30 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar className="h-11 w-11 ring-2 ring-primary/20 shadow-sm">
            <AvatarImage src="/professional-person.png" />
            <AvatarFallback className="bg-muted text-muted-foreground">SC</AvatarFallback>
          </Avatar>
          <span className="absolute bottom-0 right-0 h-3.5 w-3.5 bg-green-500 rounded-full border-2 border-background shadow-sm" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-foreground">Sarah Chen</h2>
          <p className="text-xs text-muted-foreground">Active now</p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-accent/50 elegant-hover">
          <Phone className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-accent/50 elegant-hover">
          <Video className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-accent/50 elegant-hover">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
