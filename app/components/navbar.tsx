// app/components/navbar.tsx
'use client'

import Link from 'next/link';
import { Search, Moon, Sun, LogOut, LogIn } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { data: session, status } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="bg-background shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Search className="h-8 w-8 text-primary" aria-hidden="true" />
              <span className="ml-2 text-lg font-semibold text-foreground">Person Search</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              About
            </Link>
            
            {/* Authentication Controls */}
            {status === "loading" ? (
              <div className="w-8 h-8 animate-pulse bg-gray-300 rounded-full"></div>
            ) : session ? (
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>
                    {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-foreground">
                  {session.user?.name || session.user?.email}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="text-foreground hover:text-primary"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link href="/auth/signin">
                <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
                  <LogIn className="h-4 w-4 mr-1" />
                  Sign In
                </Button>
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}