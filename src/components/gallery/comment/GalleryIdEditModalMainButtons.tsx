import Link from "next/link";
import React, { type FC } from "react";
import Button from "../../Auth/SubmitButton";
import X from "../../../icons/X";

const GalleryIdEditModalMainButtons: FC<{
  closeModal: () => void;
  toggleIsDeleting: () => void;
  slug: string;
  isComp?: boolean;
}> = ({ closeModal, toggleIsDeleting, slug, isComp = false }) => {
  return (
    <>
      <button onClick={closeModal} className="absolute right-3 top-3 flex">
        <X className="h-6 w-6" />
      </button>

      <Link className="flex" href={!isComp ? `/upload/${slug}` : `/competition/edit/${slug}`}>
        <Button className="primaryButton w-full">
          <span>Edit project</span>
        </Button>
      </Link>

      <Button onClick={toggleIsDeleting}>
        <span>Delete project</span>
      </Button>
    </>
  );
};

export default GalleryIdEditModalMainButtons;
