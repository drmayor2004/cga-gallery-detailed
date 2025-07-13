'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface User {
  id: string
  username: string
  access: string
  name: string
}

interface SessionContextType {
  data: { user: User } | null
  status: 'authenticated' | 'unauthenticated' | 'loading'
}

const SessionContext = createContext<SessionContextType>({
  data: null,
  status: 'unauthenticated'
})

export const useSession = () => useContext(SessionContext)

interface SessionProviderProps {
  children: ReactNode
}

export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  // Mock session data - in real app this would come from next-auth
  const [session] = useState<SessionContextType>({
    data: {
      user: {
        id: '1',
        username: 'demo_user',
        access: 'mock_token',
        name: 'Demo User'
      }
    },
    status: 'authenticated'
  })

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  )
}