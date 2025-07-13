import Image from "next/image";
import type { FC } from "react";
import type { UserData } from "../../pages/gallery/[slug]";
import Link from "next/link";

const GalleryIdPanelUsernameandProfile: FC<{
  profileImage: UserData["profileImage"];
  name: UserData["name"];
  username: UserData["username"];
}> = ({ profileImage, name, username }) => {
  return (
    <Link
      href={`/profile/${username as string}/`}
      className="ml-0 mr-auto mt-8 flex  flex-row items-center space-x-2 rounded-full bg-gray-200/60 py-2 pl-2  pr-6 lg:mr-0"
    >
      <div className="relative flex h-10 w-10 overflow-hidden rounded-full bg-gray-500">
        <Image
          src={profileImage as string}
          alt="CGAfrica | User Profile"
          fill
          className="object-cover "
        />
      </div>
      <h2 className="text-xl font-bold">{name}</h2>
    </Link>
  );
};

export default GalleryIdPanelUsernameandProfile;
