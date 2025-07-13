import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { type FC, Fragment, useState } from "react";
import X from "../../icons/X";
import GalleryIdEnlargeButton from "./GalleryIdButton";

const GalleryIdFullScreenModal: FC<{ image: string }> = ({ image }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <GalleryIdEnlargeButton openModal={openModal} />

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[100]" onClose={closeModal}>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="z-50 flex h-screen w-screen items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative h-full w-full bg-white">
                  <button
                    onClick={closeModal}
                    className="absolute right-4 top-4 z-20"
                  >
                    <X className="h-8 w-8" />
                  </button>
                  <Image
                    alt={`CGAfrica`}
                    src={image}
                    fill
                    className="object-contain"
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default GalleryIdFullScreenModal;
