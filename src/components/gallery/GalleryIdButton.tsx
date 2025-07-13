import React, { type FC } from "react";
import Enlarge from "../../icons/Enlarge";

const GalleryIdEnlargeButton: FC<{ openModal: () => void }> = ({
  openModal,
}) => {
  return (
    <button onClick={openModal} className="absolute top-10 right-8 z-20 flex">
      <Enlarge className="h-4 w-4 fill-white lg:h-6 lg:w-6" />
    </button>
  );
};

export default GalleryIdEnlargeButton;
