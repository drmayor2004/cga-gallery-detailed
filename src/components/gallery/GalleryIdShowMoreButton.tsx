import React from "react";
import ChevronDown from "../icons/ChevronDown";
import type { FC } from "react";

const GalleryIdShowMoreButton: FC<{ handleShowMore: () => void }> = ({ handleShowMore }) => {
  return (
    <button
      onClick={handleShowMore}
      className="flex flex-row lg:hidden items-center justify-center ml-auto mt-10 space-x-3 h-10 w-40 bg-white"
    >
      <span className="text-xl">Show more</span>
      <ChevronDown className="h-5 w-5 text-gray-500" />
    </button>
  );
};

export default GalleryIdShowMoreButton;
