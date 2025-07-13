import { FC, useEffect } from "react";
import djangoAPI from "../../utils/constants/api/django";
import { useSession } from "next-auth/react";
import { UserSession } from "../../utils/types/auth/userSession";
import { AxiosResponse } from "axios";

const GalleryIdAdminLoader: FC<{
  updateIsAdmin: (isAdmin: boolean) => void;
}> = ({ updateIsAdmin }) => {
  const session = useSession().data?.user as UserSession;

  const checkAdmin = async () => {
    const axios = (await import("axios")).default;

    await axios
      .get(djangoAPI(`/project/user/${session.id}/editor-choice`), {
        headers: {
          Authorization: `Bearer ${session?.access}`,
        },
      })
      .then((res: AxiosResponse<{ "admin panel": boolean }>) => {
        const isAdmin = Object.values(res.data)[0] as boolean;

        updateIsAdmin(isAdmin);
      })
      .catch((err) => {
        return [];
      });
  };

  useEffect(() => {
    checkAdmin();
  }, []);

  return <></>;
};

export default GalleryIdAdminLoader;
