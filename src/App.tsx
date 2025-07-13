import React from 'react'
import { SessionProvider } from './providers/SessionProvider'
import { LikeProvider } from './providers/LikeProvider'
import GalleryDetailPage from './pages/GalleryDetailPage'

function App() {
  return (
    <SessionProvider>
      <LikeProvider>
        <div className="min-h-screen bg-gray-50">
          <GalleryDetailPage />
        </div>
      </LikeProvider>
    </SessionProvider>
  )
}

export default App