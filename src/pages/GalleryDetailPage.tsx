import React, { useState } from 'react'
import GalleryIdArtworkBar from '../components/gallery/GalleryIdArtworkBar'
import GalleryIdPanel from '../components/gallery/GalleryIdPanel'
import GalleryIdComments from '../components/gallery/comment/GalleryIdComments'
import GalleryIdFullScreenModal from '../components/gallery/GalleryIdFullScreenModal'
import GalleryIdMoreModal from '../components/gallery/GalleryIdMoreModal'
import GalleryIdShowMoreButton from '../components/gallery/GalleryIdShowMoreButton'
import { mockGalleryData } from '../data/mockData'

const GalleryDetailPage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isVideo, setIsVideo] = useState(false)
  const [showMore, setShowMore] = useState(false)

  const handleUpdateCurrentImage = (index: number, video = false) => {
    setCurrentImageIndex(index)
    setIsVideo(video)
  }

  const handleShowMore = () => {
    setShowMore(!showMore)
  }

  const getCurrentImage = () => {
    if (isVideo && mockGalleryData.videos) {
      return mockGalleryData.videos[currentImageIndex]?.video_url || ''
    }
    return mockGalleryData.artworks[currentImageIndex]?.artwork || ''
  }

  const getCurrentVideoId = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      return url.split('youtube.com/watch?v=')[1]
    }
    if (url.includes('youtube.com/shorts/')) {
      return url.split('youtube.com/shorts/')[1]
    }
    return ''
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">CGAfrica Gallery</h1>
            <nav className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Gallery</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Profile</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Image/Video */}
          <div className="lg:col-span-2">
            <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
              {isVideo ? (
                <iframe
                  src={`https://www.youtube.com/embed/${getCurrentVideoId(getCurrentImage())}`}
                  className="w-full h-full"
                  allowFullScreen
                  title="Video player"
                />
              ) : (
                <img
                  src={getCurrentImage()}
                  alt="Gallery artwork"
                  className="w-full h-full object-contain"
                />
              )}
              
              {/* Overlay Controls */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <GalleryIdFullScreenModal image={getCurrentImage()} />
                <GalleryIdMoreModal
                  id={mockGalleryData.id}
                  username={mockGalleryData.username}
                  slug={mockGalleryData.project_slug}
                />
              </div>
            </div>

            {/* Artwork Bar */}
            <div className="mt-6">
              <GalleryIdArtworkBar
                artworks={mockGalleryData.artworks}
                videos={mockGalleryData.videos}
                handleUpdateCurrentImage={handleUpdateCurrentImage}
              />
            </div>

            {/* Comments Section - Mobile */}
            <div className="lg:hidden mt-8">
              {showMore && (
                <GalleryIdComments projectId={mockGalleryData.id} />
              )}
              <GalleryIdShowMoreButton handleShowMore={handleShowMore} />
            </div>
          </div>

          {/* Right Column - Panel */}
          <div className="lg:col-span-1">
            <GalleryIdPanel
              username={mockGalleryData.username}
              projectId={mockGalleryData.id}
              name={mockGalleryData.user.name}
              profileImage={mockGalleryData.user.profileImage}
              title={mockGalleryData.project_title}
              description={mockGalleryData.project_description}
              softwares={mockGalleryData.softwares}
              categories={mockGalleryData.categories}
              tags={mockGalleryData.tags}
              created_at={mockGalleryData.created_at}
              updated_at={mockGalleryData.updated_at}
              slug={mockGalleryData.project_slug}
            />

            {/* Comments Section - Desktop */}
            <div className="hidden lg:block mt-8">
              <div className="bg-white rounded-lg shadow-light">
                <GalleryIdComments projectId={mockGalleryData.id} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default GalleryDetailPage