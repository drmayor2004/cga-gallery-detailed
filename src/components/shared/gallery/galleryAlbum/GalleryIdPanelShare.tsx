import React from 'react'

interface GalleryIdPanelShareProps {
  artworkTitle: string
  slug: string
}

const GalleryIdPanelShare: React.FC<GalleryIdPanelShareProps> = ({ artworkTitle, slug }) => {
  const shareUrl = `${window.location.origin}/gallery/${slug}`
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: artworkTitle,
        url: shareUrl
      })
    } else {
      navigator.clipboard.writeText(shareUrl)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <div className="border-t pt-6 mt-6">
      <button
        onClick={handleShare}
        className="flex items-center space-x-2 text-primary hover:text-blue-600 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
        <span>Share Artwork</span>
      </button>
    </div>
  )
}

export default GalleryIdPanelShare