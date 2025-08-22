'use client'

import { SessionProvider } from "next-auth/react"

interface AuthProviderProps {
  children: React.ReactNode
  session: any // eslint-disable-line @typescript-eslint/no-explicit-any
}

export default function AuthProvider({
  children,
  session,
}: AuthProviderProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>
}