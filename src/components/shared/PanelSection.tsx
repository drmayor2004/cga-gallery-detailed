import React, { ReactNode } from 'react'

interface PanelSectionProps {
  children: ReactNode
  hasImage?: boolean
}

const PanelSection: React.FC<PanelSectionProps> = ({ children, hasImage = false }) => {
  return (
    <li className={`flex items-center ${hasImage ? 'space-x-3' : ''}`}>
      {children}
    </li>
  )
}

export default PanelSection