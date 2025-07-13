import { type FC } from "react";
import GalleryIdPanelTitle from "./panel/GalleryIdPanelTitle";
import Image from "next/image";
import type { Project } from "../../utils/types/api/project";
import PanelSection from "../shared/PanelSection";
import PanelSectionTitle from "../shared/PanelSectionTitle";

const GalleryIdPanelSoftware: FC<{
  softwares: Project["results"][0]["softwares"];
}> = ({ softwares }) => {
  return (
    <div className="border-b py-10 ">
      <GalleryIdPanelTitle title="Software" />

      <ul className="panelul">
        {softwares?.map((item, index) => (
          <PanelSection hasImage key={index}>
            <>
              <div className="relative flex h-7 w-7 rounded-full bg-gray-800">
                <Image
                  src={decodeURIComponent(
                    decodeURIComponent(item.software_logo)
                  )}
                  alt="CGAfrica | Software"
                  fill
                  className="object-cover"
                  onError={() => <></>}
                />
              </div>

              <PanelSectionTitle title={item.software_name} />
            </>
          </PanelSection>
        ))}
      </ul>
    </div>
  );
};

export default GalleryIdPanelSoftware;
