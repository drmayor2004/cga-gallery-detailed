import React from 'react';

interface GalleryIdPanelTitleProps {
  title: string;
  className?: string;
}

const GalleryIdPanelTitle: React.FC<GalleryIdPanelTitleProps> = ({ 
  title, 
  className = "text-lg font-semibold text-gray-900 mb-4" 
}) => {
  return (
    <h3 className={className}>
      {title}
    </h3>
  );
};

export default GalleryIdPanelTitle;