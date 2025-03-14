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
// import { signIn } from "@/lib/auth-client"
import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("")

  const handleLogin = async () => {
    console.log("email", email)
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
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
  )
}
