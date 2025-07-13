import React, { type FC } from "react";
import Button from "../../Auth/SubmitButton";
import { useLike } from "../../../utils/providers/gallery/LikeProvider";

const GalleryIdPanelLikeArtworkButton: FC = () => {
  const { liked, toggleLike } = useLike();

  return (
    <div className="z-50 mt-8 w-full">
      <Button
        onClick={toggleLike}
        className={`primaryButton w-full ${liked ? "!bg-gray-600" : ""}`}
      >
        <span>{liked ? "Liked artwork" : "Like artwork"}</span>
      </Button>
    </div>
  );
};

export default GalleryIdPanelLikeArtworkButton;
