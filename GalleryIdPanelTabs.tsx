import galleryPanelTabsList from "../../utils/constants/gallery/galleryIdPanelTabsList";
import type { FC } from "react";
import type GalleryPanelTabsList from "../../utils/types/gallery/galleryIdPanelTabsList";

const GalleryIdPanelTabs: FC<{
  handleTabChange: (tab: GalleryPanelTabsList[0]["query"]) => void;
  admin: boolean;
  toggleAdmin: () => void;
  closeAdmin: () => void;
  isAdmin: boolean;
}> = ({ admin, toggleAdmin, closeAdmin, isAdmin }) => {
  return (
    <ul className="mt-10 flex flex-row space-x-3 border-b border-gray-300">
      {galleryPanelTabsList.map((item, index) => (
        <div className="flex flex-row space-x-3" key={index}>
          <li>
            <button
              disabled={!isAdmin}
              onClick={closeAdmin}
              className={`text-left ${
                !admin ? "border-b border-primary font-medium" : "font-medium"
              } text-lg`}
            >
              {item.name}
            </button>
          </li>
          {/* Admin */}
          <li>
            {isAdmin && (
              <button
                onClick={toggleAdmin}
                className={`text-left ${
                  admin ? "border-b border-primary font-medium" : "font-medium"
                } text-lg`}
              >
                Admin
              </button>
            )}
          </li>
        </div>
      ))}
    </ul>
  );
};

export default GalleryIdPanelTabs;
