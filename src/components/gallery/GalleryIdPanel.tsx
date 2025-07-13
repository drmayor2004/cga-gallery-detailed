import GalleryIdAdminLoader from "./GalleryIdAdminLoader";
import { useState, type FC } from "react";
import GalleryIdPanelShare from "../shared/gallery/galleryAlbum/GalleryIdPanelShare";
import GalleryIdPanelArtworkTitle from "../galleryId/GalleryIdPanelArtworkTitle";
import GalleryIdPanelTabs from "../galleryId/GalleryIdPanelTabs";
import GalleryIdPanelTags from "./GalleryIdPanelTags";
import GalleryIdPanelDescription from "./GalleryIdPanelDescription";
import GalleryIdPanelSoftware from "../galleryId/GalleryIdPanelSoftware";
import GalleryIdPanelUsernameandProfile from "../galleryId/GalleryIdPanelUsernameandProfile";
import GalleryIdPanelCreatedOnandLastUpdatedSection from "./panel/GalleryIdPanelCreatedOnandLastUpdatedSection";
import djangoAPI from "../../utils/constants/api/django";
import { useSession } from "next-auth/react";
import GalleryIdPanelCategories from "./GalleryIdPanelCategory";
import Button from "../Auth/SubmitButton";
import type { UserSession } from "../../utils/types/auth/userSession";
import type GalleryPanelTabsList from "../../utils/types/gallery/galleryIdPanelTabsList";
import type { GalleryData, UserData } from "../../pages/gallery/[slug]";
import dynamic from "next/dynamic";
import Select from "react-select";
import DropdownIndicator from "../shared/DropDownIndicator";
import GalleryIdAdminModal from "./GalleryIdAdminModal";

import type { AxiosError, AxiosResponse } from "axios";
import { useSWRConfig } from "swr";

// Array of numbers from 1 to 30
const options = Array.from(Array(30).keys()).map((i) => ({
  value: i + 1,
  label: i + 1,
}));

const GalleryIdPanelLikeArtworkButton = dynamic(
  () => import("./panel/GalleryIdPanelLikeArtworkButton")
);

type GalleryIdPanelProps = {
  username: GalleryData["username"];
  projectId: GalleryData["id"];
  name: UserData["name"];
  profileImage: UserData["profileImage"];
  title: GalleryData["project_title"];
  description: GalleryData["project_description"];
  softwares: GalleryData["softwares"];
  categories: GalleryData["categories"];
  tags: GalleryData["tags"];
  created_at: GalleryData["created_at"];
  updated_at: GalleryData["updated_at"];
  slug: GalleryData["project_slug"];
  competition?: boolean;
};

type EditorsPickResponse = {
  editor_choice_exists: boolean;
  message: string;
};

const GalleryIdPanel: FC<GalleryIdPanelProps> = ({
  username,
  projectId,
  name,
  title,
  profileImage,
  description,
  softwares,
  categories,
  tags,
  created_at,
  updated_at,
  slug,
}) => {
  const session = useSession().data?.user as UserSession;
  const { mutate } = useSWRConfig();
  const token = session?.access ?? null;
  const isAuthenticated = useSession().status === "authenticated";
  const [admin, setAdmin] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);

  const [currentTab, setCurrentTab] = useState<GalleryPanelTabsList[0]["query"]>("description");
  const [selectedOption, setSelectedOption] = useState<number | string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleTabChange = (tab: GalleryPanelTabsList[0]["query"]) => {
    setCurrentTab(tab);
  };

  const toggleAdmin = () => {
    setAdmin(!admin);
  };

  const closeAdmin = () => {
    setAdmin(false);
  };

  const updateIsAdmin = (isAdmin: boolean) => {
    setIsAdmin(isAdmin);
  };


  const patchEditorsPick = async (value: number | null) => {
    setResponseMessage(null);
    if (value !== null) {
      const axios = (await import("axios")).default;
      try {
        const res: AxiosResponse<EditorsPickResponse> = await axios.patch(
          djangoAPI(`/project/editor-choice/${projectId}/`),
          { project_editor_pick: value },
          { headers: { Authorization: `Bearer ${session.access}` } }
        );
        if (res.data?.editor_choice_exists === false) {
          setResponseMessage(res.data?.message);
        }
        mutate(
          djangoAPI(
            `/project_filtering/projects/editors-pick?limit=100&offset=0`
          )
        );
      } catch (e) {
        const err = e as AxiosError;
        if (err?.response?.status === 400) {
          openModal();
        }
      }
    }
  };

  const putEditorsPick = async () => {
    if (selectedOption !== null) {
      const axios = (await import("axios")).default;
      try {
        const res: AxiosResponse<{ message: string }> = await axios.put(
          djangoAPI(`/project/editor-choice/${projectId}/`),
          { project_editor_pick: selectedOption },
          { headers: { Authorization: `Bearer ${session.access}` } }
        );
        setResponseMessage(res.data?.message);
        closeModal();
        mutate(
          djangoAPI(
            `/project_filtering/projects/editors-pick?limit=100&offset=0`
          )
        );
      } catch (e) {
        // errors are not specifically handled in the original implementation
      }
    }
  };

  return (
    <>
      <div className="flex w-full flex-col bg-white px-6 py-6 shadow-light lg:h-min lg:w-[410px]">
        <GalleryIdPanelArtworkTitle title={title} />

        <GalleryIdPanelUsernameandProfile
          username={username}
          name={name}
          profileImage={profileImage ?? null}
        />

        <GalleryIdPanelCreatedOnandLastUpdatedSection
          created_at={created_at}
          updated_at={updated_at}
        />

        <GalleryIdPanelTabs
          handleTabChange={handleTabChange}
          admin={admin}
          toggleAdmin={toggleAdmin}
          closeAdmin={closeAdmin}
          isAdmin={isAdmin}
        />

        {!admin && <GalleryIdPanelDescription description={description} />}

        {isAdmin && responseMessage !== null && (
          <span className="mb- mt-7 rounded-main bg-green-500 p-2  text-white">
            <p className="text-center">{responseMessage}</p>
          </span>
        )}

        {admin && (
          <div className="mt-6 flex w-full flex-row items-center space-x-3">
            <label className="text-xl">{`Editor's Pick`}</label>
            <Select
              classNamePrefix="admin-select"
              options={[{ label: "0", value: 0 }, ...options]}
              onChange={(newValue) => {
                const value = (newValue as (typeof options)[0] | null)?.value ?? null;
                patchEditorsPick(value);
                // openModal();
                setSelectedOption(value);
              }}
              placeholder="Select"
              components={{
                DropdownIndicator,
              }}
            />
          </div>
        )}

        {!admin && (
          <>
            {!isAuthenticated ? (
              <div className="z-50 mt-8 w-full">
                <Button className="primaryButton w-full">
                  <span>Like artwork</span>
                </Button>
              </div>
            ) : (
              <div className="flex h-mainButton w-full">
                <GalleryIdPanelLikeArtworkButton />
              </div>
            )}

            <div className="mt-6 flex flex-col">
              {softwares.length > 0 && <GalleryIdPanelSoftware softwares={softwares} />}

              {categories.length > 0 && <GalleryIdPanelCategories categories={categories} />}

              {tags.length > 0 && <GalleryIdPanelTags tags={tags} />}

              <GalleryIdPanelShare artworkTitle={title} slug={slug} />
            </div>
          </>
        )}
      </div>

      <GalleryIdAdminModal
        openModal={openModal}
        closeModal={closeModal}
        isOpen={isOpen}
        putEditorsPick={putEditorsPick}
      />
      {isAuthenticated && <GalleryIdAdminLoader updateIsAdmin={updateIsAdmin} />}
    </>
  );
};

export default GalleryIdPanel;
