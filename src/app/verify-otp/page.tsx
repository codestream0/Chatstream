"use client"
import { useState } from "react"
import { useId } from "react"
import { OTPInput, SlotProps } from "input-otp"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"



export default function verifyOtp(){
    const [otp,setOtp]=useState("");
    const [isLoading,setIsLoading]=useState(false);
    const Router=useRouter(); 

    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
        Router.push('/reset-password');
    }
    
  return(
    <main className="min-h-screen relative flex items-center justify-center p-4 bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 dark:from-slate-900 dark:via-purple-950 dark:to-slate-900 animate-gradient">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300/30 dark:bg-purple-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-300/30 dark:bg-pink-500/20 rounded-full blur-3xl animate-float animation-delay-2000" />
        <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-blue-300/30 dark:bg-blue-500/20 rounded-full blur-3xl animate-float animation-delay-4000" />
      </div>
      <Card className="w-full px-5 max-w-md shadow-2xl relative z-10 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-white/20">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
               OTP Verification
          </CardTitle>
          <CardDescription className="text-base">
                Enter the OTP sent to your email address
          </CardDescription>
        </CardHeader>
        <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
            <OtpInput value={otp} onChange={setOtp} /> 
            <Button type="submit" className="w-full h-11 text-base">
                {isLoading ? "verifying..." : "verify OTP"}
            </Button>
            </form>

            <div className="mt-4 text-center">
                <Link
                href="/login"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                <ArrowLeft className="h-4 w-4" />
                Back to login
                </Link>
            </div>
        </CardContent>
        </Card>
    </main>
  )
}

function OtpInput({onChange,value}:{onChange?: (value: string) => void,value?:string}) {
  const id = useId()
  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>OTP </Label>
      <OTPInput
        id={id}
        value={value}
        onChange={(val: string) => onChange?.(val)}
        containerClassName="flex items-center gap-3 has-disabled:opacity-50"
        maxLength={6}
        render={({ slots }) => (
          <div className="flex gap-2">
            {slots.map((slot, idx) => (
              <Slot key={idx} {...slot} />
            ))}
          </div>
        )}
        required
      />

    </div>
  )
}
function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "flex size-9 items-center justify-center rounded-md border-2 border-input bg-background font-medium text-foreground shadow-xs transition-[color,box-shadow]",
        { "z-10 border-ring ring-[3px] ring-ring/50": props.isActive }
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
    </div>
  )
}