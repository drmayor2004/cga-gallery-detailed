import { type FC } from "react";
import GalleryIdPanelTitle from "./panel/GalleryIdPanelTitle";
import type { Project } from "../../utils/types/api/project";
import PanelSection from "../shared/PanelSection";
import PanelSectionTitle from "../shared/PanelSectionTitle";

const GalleryIdPanelTags: FC<{ tags: Project["results"][0]["tags"] }> = ({
  tags,
}) => {
  return (
    <div className="flex flex-col border-b py-10">
      <GalleryIdPanelTitle title="Tags" />

      <ul className="panelul">
        {tags?.map((item, index) => (
          <PanelSection key={index}>
            <PanelSectionTitle title={item.tag_name} />
          </PanelSection>
        ))}
      </ul>
    </div>
  );
};

export default GalleryIdPanelTags;
