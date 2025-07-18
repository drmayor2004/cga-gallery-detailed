import { Dialog, Transition } from '@headlessui/react'
import { type FC, Fragment } from 'react'
import Button from '../../Auth/SubmitButton';

const GalleryIdCommentDeleteModal: FC<{ isOpen: boolean; closeModal: () => void; deleteComment: () => Promise<void> }> = ({ isOpen, closeModal, deleteComment }) => {

    return (
        <>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
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
                                        Delete comment
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-lg text-gray-500">
                                            Are you sure you want to delete this comment?
                                        </p>
                                    </div>

                                    <div className="mt-4 flex flex-row space-x-2 justify-end">

                                        <Button onClick={closeModal} className='secondaryButton'>
                                            <span>Cancel</span>
                                        </Button>
                                        <Button onClick={deleteComment} className='bg-red-600 '>
                                            <span>Delete comment</span>
                                        </Button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}


export default GalleryIdCommentDeleteModal