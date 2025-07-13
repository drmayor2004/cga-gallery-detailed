import { convertDate } from "../../../utils/constants/shared/convertDate";
import type { FC } from "react";
import type { Project } from "../../../utils/types/api/project";

const GalleryIdPanelCreatedOnandLastUpdatedSection: FC<{
  created_at: Project["results"][0]["created_at"];
  updated_at: Project["results"][0]["updated_at"];
}> = ({ created_at, updated_at }) => {
  return (
    <span className="mt-5 flex flex-col text-sm sm:flex-row sm:space-x-2">

      <p>Created on {convertDate(created_at)}</p>

      {created_at && updated_at && created_at === updated_at ? (
        <>

          <p className="hidden sm:flex"> - </p>

          <p>Last updated on {convertDate(updated_at)}</p>

        </>
      ) : (
        ""
      )}
    </span>
  );
};

export default GalleryIdPanelCreatedOnandLastUpdatedSection;
