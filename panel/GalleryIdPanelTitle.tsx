import React from "react";
import type { FC } from "react";

const GalleryIdPanelTitle: FC<{ title: string }> = ({ title }) => {
  return <h2 className="text-xl font-semibold">{title}</h2>;
};

export default GalleryIdPanelTitle;
