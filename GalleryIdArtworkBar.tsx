import React from "react";
import GalleryIdArtworkImage from "./GalleryIdArtworkImage";
import type { FC } from "react";
import type { ProjectArtwork } from "../../utils/types/api/project/project_artwork";
import type {
  SubmissionArtwork,
  SubmissionVideo,
} from "../../utils/types/competition/submission";
import type { ProjectVideoUrl } from "../../utils/types/api/projectVideoUrl";

type Props = FC<{
  artworks: ProjectArtwork[] | SubmissionArtwork[];
  videos: ProjectVideoUrl[] | SubmissionVideo[] | null;
  handleUpdateCurrentImage: (index: number, video?: boolean) => void;
  isSubmission?: boolean;
}>;

const getYoutubeId = (url: string) => {
  if (url.includes("youtube.com/shorts/")) {
    return url.split("youtube.com/shorts/")[1];
  }

  return url.split("youtube.com/watch?v=")[1];
};

const getVimeoId = (url: string) => {
  if (url.includes("vimeo.com/")) {
    return url.split("vimeo.com/")[1];
  }

  return "";
};

const getCorrectThumbnail = (url: string) => {
  if (url.includes("youtube")) {
    return `http://img.youtube.com/vi/${getYoutubeId(url)}/0.jpg`;
  }


  if (url.includes("vimeo.com")) {
    return `https://i.vimeocdn.com/video/${getVimeoId(url)}.jpg`;
  }
  return "";
};

const GalleryIdArtworkBar: Props = ({
  artworks,
  videos,
  handleUpdateCurrentImage,
  isSubmission = false,
}) => {
  return (
    <div className="relative flex h-[160px] w-full overflow-x-scroll py-0.5">
      <div className="absolute flex h-[150px] w-auto flex-row space-x-0.5">
        <div className="relative flex h-full flex-row space-x-0.5">
          {artworks?.map((item, index) => (
            <button
              onClick={() => handleUpdateCurrentImage(index)}
              key={index}
              className=" relative z-20 flex h-full w-[180px] bg-gray-400"
            >
              <GalleryIdArtworkImage
                image={
                  !isSubmission
                    ? (item as ProjectArtwork).artwork
                    : (item as SubmissionArtwork)?.submission_artwork
                }
              />
            </button>
          ))}

          {videos?.map((video, index) => (
            <button
              onClick={() => handleUpdateCurrentImage(index, true)}
              key={index}
              className="relative z-20 flex h-full w-[180px] bg-gray-400"
            >
              <GalleryIdArtworkImage
                image={
                  !isSubmission
                    ? getCorrectThumbnail(
                        (video as ProjectVideoUrl).video_url as string
                      )
                    : getCorrectThumbnail(
                        (video as SubmissionVideo).Submission_artwork_video_url
                      )
                }
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryIdArtworkBar;
