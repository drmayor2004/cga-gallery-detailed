import { type FC } from "react";
import GalleryIdPanelTitle from "./panel/GalleryIdPanelTitle";
import type { Project } from "../../utils/types/api/project";
import Image from "next/image";
import PanelSection from "../shared/PanelSection";
import PanelSectionTitle from "../shared/PanelSectionTitle";

const GalleryIdPanelCategories: FC<{
  categories: Project["results"][0]["categories"];
}> = ({ categories }) => {
  return (
    <>
      <div className="flex flex-col border-b border-gray-300 py-10 pt-5">
        <GalleryIdPanelTitle title="Categories" />

        <ul className="panelul">
          {categories?.map((item, index) => (
            <PanelSection hasImage key={index}>
              <>
                <div className="relative flex h-7 w-7 rounded-full bg-gray-800">
                  <Image
                    src={decodeURIComponent(item.category_image).replace(
                      "/https:/cgafrica-image.s3.eu-west-2.amazonaws.com/static",
                      ""
                    )}
                    alt={`CGAfrica | Categories`}
                    fill
                    className="overflow-hidden rounded-full object-cover"
                  />
                </div>

                <PanelSectionTitle title={item.category_name} />
              </>
            </PanelSection>
          ))}
        </ul>
      </div>
    </>
  );
};

export default GalleryIdPanelCategories;
