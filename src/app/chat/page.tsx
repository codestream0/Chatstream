import { ChatWindow } from "@/components/chat-window"

export default function Home() {
  return (
    <main className="min-h-screen relative flex items-center justify-center p-4 md:p-8 bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 dark:from-slate-900 dark:via-purple-950 dark:to-slate-900 animate-gradient">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300/30 dark:bg-purple-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-300/30 dark:bg-pink-500/20 rounded-full blur-3xl animate-float animation-delay-2000" />
        <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-blue-300/30 dark:bg-blue-500/20 rounded-full blur-3xl animate-float animation-delay-4000" />
      </div>

      <div className="w-full max-w-7xl h-[85vh] max-h-[900px] relative z-10 animate-fade-in">
        <ChatWindow />
      </div>
    </main>
  )
}
