import React from 'react'

interface PanelSectionTitleProps {
  title: string
}

const PanelSectionTitle: React.FC<PanelSectionTitleProps> = ({ title }) => {
  return (
    <span className="text-lg font-medium text-gray-800">{title}</span>
  )
}

export default PanelSectionTitle