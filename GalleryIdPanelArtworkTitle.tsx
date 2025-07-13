import type { FC } from "react";

const GalleryIdPanelArtworkTitle: FC<{ title: string }> = ({ title }) => {
  return <h2 className="font-semibold text-3xl mt-0">{title}</h2>;
};

export default GalleryIdPanelArtworkTitle;
