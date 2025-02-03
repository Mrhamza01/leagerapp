"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Button } from "@/components/ui/button"
import { account } from "@/lib/database"
import { useToast } from "@/components/ui/use-toast"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = async () => {
    try {
      await account.deleteSession("current")
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      })
      router.push("/")
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "An error occurred while logging out.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gray-100 p-8">
        <div className="flex justify-end mb-4">
          <Button onClick={handleLogout}>Log Out</Button>
        </div>
        {children}
      </main>
    </div>
  )
}

