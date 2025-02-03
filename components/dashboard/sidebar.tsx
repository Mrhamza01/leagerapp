"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Book, Home, LogOut } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col bg-gray-800 text-white">
      <div className="flex items-center justify-center h-16 bg-gray-900">
        <h1 className="text-xl font-bold">Ledger App</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard" passHref>
              <Button
                variant="ghost"
                className={cn("w-full justify-start", pathname === "/dashboard" && "bg-gray-700")}
              >
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/ledger" passHref>
              <Button
                variant="ghost"
                className={cn("w-full justify-start", pathname === "/dashboard/ledger" && "bg-gray-700")}
              >
                <Book className="mr-2 h-4 w-4" />
                Ledger
              </Button>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4">
        <Button variant="ghost" className="w-full justify-start">
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </Button>
      </div>
    </div>
  )
}

