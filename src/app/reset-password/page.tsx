"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { useResetPasswordMutation } from "@/features/auth/authApi"
import { toast } from "react-toastify"

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const router = useRouter()
  const [resetPassword, { isLoading }] = useResetPasswordMutation()
  const email = localStorage.getItem("emailForOtp") || "";
  const otp = localStorage.getItem("otpValue") || "";

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  try {

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long")
      return
    }

    const response = await resetPassword({ email, otp, newPassword }).unwrap()
    console.log("Password reset successful:", response)

    toast.success("Password reset successful! You can now log in.")
    router.push("/chat")
  } catch (error: any) {
    console.error("Password reset failed:", error)

    if (error?.status === 400) {
      toast.error("Invalid or expired OTP. Please request a new one.")
    } else if (error?.status === 404) {
      toast.error("User not found. Please try again.")
    } else if (error?.status === 500) {
      toast.error("Server error. Please try again later.")
    } else if (error?.data?.message) {
      toast.error(error.data.message)
    } else {
      toast.error("Something went wrong. Please try again.")
    }
  }
}


  return (
    <main className="min-h-screen relative flex items-center justify-center p-4 bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 dark:from-slate-900 dark:via-purple-950 dark:to-slate-900 animate-gradient">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300/30 dark:bg-purple-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-300/30 dark:bg-pink-500/20 rounded-full blur-3xl animate-float animation-delay-2000" />
        <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-blue-300/30 dark:bg-blue-500/20 rounded-full blur-3xl animate-float animation-delay-4000" />
      </div>

      <Card className="w-full max-w-md shadow-2xl relative z-10 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-white/20">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Reset your password
          </CardTitle>
          <CardDescription className="text-base">
            Enter your new password below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm new password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="h-11"
              />
            </div>
            <Button type="submit" className="w-full h-11 text-base">
              {/* {isLoading ? "Resetting..." : "Reset password"} */}
              Reset Password 
            </Button>
          </form>
          <div className="mt-6 text-center">
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
