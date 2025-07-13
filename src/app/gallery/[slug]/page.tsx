import GalleryDetailPage from '@/pages/GalleryDetailPage'

interface PageProps {
  params: {
    slug: string
  }
}

export default function GalleryPage({ params }: PageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <GalleryDetailPage slug={params.slug} />
    </div>
  )
}

export async function generateMetadata({ params }: PageProps) {
  return {
    title: `Gallery - ${params.slug} | CGAfrica`,
    description: 'View amazing digital artwork on CGAfrica Gallery',
  }
}