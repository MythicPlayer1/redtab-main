import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild, } from "@headlessui/react"
import React from "react";
import { Fragment } from "react/jsx-runtime"

interface OutletSelectModalsProps {
    open?: boolean;
    onClose: () => void;
    children?: React.ReactNode;
    name?: string;
    dialogStyle?: React.CSSProperties;
    styles?: React.CSSProperties;
    hideDialogHeader?: boolean;
}

const OutletSelectModals: React.FC<OutletSelectModalsProps> = (props) => {
    return (
        <Transition appear show={props?.open} as={Fragment}>
            <Dialog as="div" className="relative z-[100000000000000]" onClose={props?.onClose}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 black-trans1" />
                </TransitionChild>

                <div className="fixed  inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center p-4 text-center">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="absolute w-full max-w-md  transform overflow-hidden rounded-2xl bg-white p-2 text-left align-middle shadow-xl transition-all pointer-events-auto" style={props?.dialogStyle}>
                                <div className="bg-primaryColorText flex w-full flex-col rounded-[20px]" style={props?.styles}>
                                   {!props?.hideDialogHeader && <DialogTitle className="flex items-center justify-between p-4 border-b border-[#EAECF0] border-none">
                                        <div className="w-1/2"></div>
                                        <p className="w-full">{props?.name}</p>

                                        <button onClick={props.onClose} className="focus:outline-none">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.12" d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#818C99" />
                                                <path d="M16.7364 7.2636C17.0879 7.61508 17.0879 8.18492 16.7364 8.5364L13.273 12L16.7364 15.4636C17.0586 15.7858 17.0854 16.2915 16.817 16.6442L16.7364 16.7364C16.3849 17.0879 15.8151 17.0879 15.4636 16.7364L12 13.273L8.5364 16.7364C8.18492 17.0879 7.61508 17.0879 7.2636 16.7364C6.91213 16.3849 6.91213 15.8151 7.2636 15.4636L10.727 12L7.2636 8.5364C6.94142 8.21421 6.91457 7.70853 7.18306 7.35577L7.2636 7.2636C7.61508 6.91213 8.18492 6.91213 8.5364 7.2636L12 10.727L15.4636 7.2636C15.8151 6.91213 16.3849 6.91213 16.7364 7.2636Z" fill="#818C99" />
                                            </svg>
                                        </button>
                                    </DialogTitle>}
                                    {props.children}
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default OutletSelectModals