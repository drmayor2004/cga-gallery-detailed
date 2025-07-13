import GalleryIdEditModalMainButtons from "./comment/GalleryIdEditModalMainButtons";
import { Dialog, Transition } from "@headlessui/react";
import { type FC, Fragment, useState } from "react";
import Button from "../Auth/SubmitButton";
import MoreIcon from "../icons/MoreIcon";
import axios from "axios";
import { useSession } from "next-auth/react";
import djangoAPI from "../../utils/constants/api/django";
import type { UserSession } from "../../utils/types/auth/userSession";

const emptyDeleting = {
  isDeleting: false,
  deletingLoading: false,
  isDeleted: false,
};

const GalleryIdMoreModal: FC<{
  id: number;
  username: string;
  slug: string;
  profile?: boolean;
  isComp?: boolean;
}> = ({ id, username, slug, profile = false, isComp = false }) => {
  // Hooks
  const session = useSession().data?.user as UserSession;
  const token = session?.access;

  //  States
  const [isOpen, setIsOpen] = useState(false);
  const [deleting, setDeleting] = useState(emptyDeleting);

  // Functions
  const cancelDeleting = () => {
    setDeleting(emptyDeleting);
  };

  const closeModal = () => {
    setIsOpen(false);
    cancelDeleting();
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const toggleIsDeleting = () => {
    setDeleting({ ...deleting, isDeleting: true });
  };

  const deleteProject = async () => {
    setDeleting({ ...deleting, deletingLoading: true });
    await axios
      .delete(djangoAPI(!isComp ? `/project/${id}/` : `/competition_submission/${id}/`), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDeleting({ ...deleting, isDeleted: true });
        setTimeout(() => {
          window.location.href = `/profile/${username}`;
        }, 3000);
      })
      .catch((err) => {
        console.error("err is", err);
      });
  };

  return (
    <>
      <button
        onClick={openModal}
        className={`absolute z-30 flex rounded-full  p-px ${
          !profile ? "right-16 top-10 bg-gray-200/40" : "right-3 top-3 bg-gray-600"
        }`}
      >
        <MoreIcon className="h-5 w-5 text-white lg:h-6 lg:w-6" />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[200]" onClose={closeModal}>
          <div className="fixed inset-0 overflow-y-auto bg-black/40">
            <div className="z-50 flex h-screen w-screen  items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative flex h-auto w-full max-w-[350px] flex-col space-y-4 rounded-main bg-white px-6 py-8 shadow-light ">
                  {!deleting.isDeleting && (
                    <GalleryIdEditModalMainButtons
                      toggleIsDeleting={toggleIsDeleting}
                      closeModal={closeModal}
                      slug={slug}
                      isComp={isComp}
                    />
                  )}
                  {deleting.isDeleting && (
                    <>
                      <h2 className="text-lg">Are you sure you want to delete this project?</h2>

                      <div className="mt-3 flex w-full flex-row justify-center space-x-3">
                        <Button onClick={cancelDeleting} className="secondaryButton">
                          <span>Cancel</span>
                        </Button>

                        <Button
                          disabled={deleting.deletingLoading || deleting.isDeleted}
                          onClick={deleteProject}
                        >
                          <div className="flex h-full w-full flex-row items-center justify-center space-x-3 rounded-full">
                            <span>
                              {deleting.deletingLoading
                                ? "Deleting"
                                : deleting.deletingLoading && deleting.isDeleted
                                ? "Deleted"
                                : "Delete"}
                            </span>
                          </div>
                        </Button>
                      </div>
                    </>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default GalleryIdMoreModal;
