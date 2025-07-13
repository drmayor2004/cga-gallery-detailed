import { SessionProvider } from '@/providers/SessionProvider'
import { LikeProvider } from '@/providers/LikeProvider'
import GalleryDetailPage from '@/pages/GalleryDetailPage'

export default function Home() {
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