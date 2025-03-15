"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@recharge/ui/components/card"
import { Button } from "@recharge/ui/components/button"
import { Input } from "@recharge/ui/components/input"
import { Label } from "@recharge/ui/components/label"
import { Zap } from "lucide-react"
// import { signIn } from "@/lib/auth-client"
import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("")

  const handleLogin = async () => {
    console.log("email", email)
  }

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a href="#" className="flex flex-col items-center gap-2 font-medium">
              <div className="flex h-8 w-8 items-center justify-center rounded-md">
                <Zap className="size-6" />
              </div>
              <span className="sr-only">Acme Inc.</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to Recharge</h1>
          </div>
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
              <CardDescription className="text-xs md:text-sm">
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                    value={email}
                  />
                  <Button className="gap-2" onClick={handleLogin}>
                    Sign-in with Magic Link
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
