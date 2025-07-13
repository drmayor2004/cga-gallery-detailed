import type { FC } from "react";

const GalleryIdPanelDescription: FC<{ description: string }> = ({
  description,
}) => {
  return (
    <p className="mt-4 w-full overflow-x-hidden text-lg font-medium">
      {description}
    </p>
  );
};

export default GalleryIdPanelDescription;
