import Image from "next/image";
import React, { type FC } from "react";

type Props = FC<{ image: string }>;

const GalleryIdArtworkImage: Props = ({ image }) => {
  return (
    <Image
      src={image}
      alt={`CGAfrica | Gallery Image`}
      fill
      className="object-contain"
    />
  );
};

export default GalleryIdArtworkImage;
