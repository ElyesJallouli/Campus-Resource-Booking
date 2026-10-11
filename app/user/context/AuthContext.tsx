'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { monitorAuthState } from '../../../public/snippets/front-end-auth-functions'
import { User } from 'firebase/auth'

interface AuthContextType {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
})

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = monitorAuthState((currentUser: User | null) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe?.()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)