import { Dialog, Transition } from "@headlessui/react";

import { type FC, Fragment } from "react";
import MoreIcon from "../icons/MoreIcon";

import Button from "../Auth/SubmitButton";

const GalleryIdAdminModal: FC<{
  openModal: () => void;
  closeModal: () => void;
  isOpen: boolean;

  putEditorsPick: () => void;
}> = ({ openModal, closeModal, isOpen, putEditorsPick }) => {

  return (
    <>
      <button
        onClick={openModal}
        className={`absolute z-30 flex rounded-full  p-px`}
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 text-gray-900"
                  >
                    {`Editor's Pick`}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-lg text-gray-500">
                      This already exists, would you like to continue?
                    </p>
                  </div>

                  <div className="mt-4 flex flex-row justify-end space-x-2 sm:justify-center">
                    <Button onClick={closeModal} className="secondaryButton">
                      <span>Cancel</span>
                    </Button>

                    <Button
                      onClick={() => {
                        putEditorsPick();
                      }}
                      className="bg-red-600 "
                    >

                      <span>Continue</span>
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default GalleryIdAdminModal;
