import React from 'react'

interface EnlargeProps {
  className?: string
}

const Enlarge: React.FC<EnlargeProps> = ({ className = "h-6 w-6" }) => {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M15 3h6v6l-2-2-4 4-1.5-1.5 4-4L15 3zM3 9h6l-2 2 4 4-1.5 1.5-4-4L3 15V9z"/>
    </svg>
  )
}

export default Enlarge