import React from "react";
import ChevronDown from "../icons/ChevronDown";

const GalleryIdArtworkBarButtons = ({ }) => {
  return (
    <div className="flex flex-row justify-between items-center absolute px-2 w-full h-full">

      <button className="flex items-center justify-center secondaryButton h-7 w-7 rounded-full">
        <ChevronDown className="flex h-4 w-4 fill-white rotate-90" />
      </button>

      <button className="flex items-center justify-center primaryButton h-7 w-7 rounded-full">
        <ChevronDown className="flex h-4 w-4 fill-white -rotate-90" />
      </button>

    </div>
  );
};

export default GalleryIdArtworkBarButtons;
