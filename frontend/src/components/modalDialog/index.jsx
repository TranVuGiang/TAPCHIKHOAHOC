import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Check } from 'lucide-react';
import { Fragment } from 'react';

export function ErrorDialog({ title, isOpen, onClose }) {
    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-10 font-montserrat">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <ExclamationTriangleIcon aria-hidden="true" className="h-6 w-6 text-red-600" />
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                        Thông báo
                                    </DialogTitle>
                                    <div className="mt-2">
                                        {Array.isArray(title) ? (
                                            title.map((item) => (
                                                <span key={item} className="block">
                                                    {item}
                                                </span>
                                            ))
                                        ) : (
                                            <span>{title}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                            >
                                Quay lại
                            </button>
                            <button
                                type="button"
                                data-autofocus
                                onClick={onClose}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            >
                                Hủy
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}

export const SuccessDialog = ({ title, isOpen, onClose, titleButton }) => {
    return (
        <Dialog as="div" className="relative z-50 font-montserrat" open={isOpen} onClose={onClose}>
            {/* Backdrop */}
            <DialogBackdrop
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
            </DialogBackdrop>

            {/* Full-screen container to center the panel */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                    className="w-[380px] transform overflow-hidden rounded-3xl bg-white p-6 shadow-xl transition-all"
                >
                    {/* Success Icon */}
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <Check className="w-8 h-8 text-green-500" />
                        </div>
                    </div>

                    {/* Title */}
                    <DialogTitle as="h2" className="text-xl font-semibold text-center text-gray-900 mb-3">
                        {title}
                    </DialogTitle>

                    {/* Button */}
                    <button
                        onClick={() => {
                            onClose;
                            window.location.reload();
                        }}
                        className="w-full px-4 py-3 bg-[#6366F1] text-white rounded-xl
                        hover:bg-[#5558E8] active:bg-[#4447E0]
                        transition-all duration-200 ease-out
                        text-base font-medium"
                    >
                        {titleButton}
                    </button>
                </DialogPanel>
            </div>
        </Dialog>
    );
};
