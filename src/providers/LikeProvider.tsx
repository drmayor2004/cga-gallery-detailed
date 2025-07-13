'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface LikeContextType {
  liked: boolean
  toggleLike: () => void
}

const LikeContext = createContext<LikeContextType>({
  liked: false,
  toggleLike: () => {}
})

export const useLike = () => useContext(LikeContext)

interface LikeProviderProps {
  children: ReactNode
}

export const LikeProvider: React.FC<LikeProviderProps> = ({ children }) => {
  const [liked, setLiked] = useState(false)

  const toggleLike = () => {
    setLiked(!liked)
  }

  return (
    <LikeContext.Provider value={{ liked, toggleLike }}>
      {children}
    </LikeContext.Provider>
  )
}