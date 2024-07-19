"use client";
import { useModalContext } from "../context/modal-context";

const Modal = () => {
  const { isOpen, modalContent, closeModal, handleBackdropClick } = useModalContext();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-80 flex justify-center items-center" onClick={handleBackdropClick}>
      <div className="bg-white flex shrink-0 flex-col p-2 rounded-lg relative shadow-[rgba(0,0,0,0.2)_0px_60px_40px_-7px] md:w-fit w-full max-h-[calc(100vh-4rem)] overflow-y-auto">
        <button
            className="w-[32px] h-[12px] sticky flex top-2 place-self-end text-2xl font-bold text-gray-600"
            onClick={closeModal}
        >
          &times;
        </button>
        <h2 className="text-3xl text-center mb-[8px] font-bold px-2">Target Form</h2>
        <p className="text-center mb-[12px] px-2">
          Here you can specify the filters you need for the target and send
          requests.
        </p>
        {modalContent}
      </div>
    </div>
  );
};

export default Modal;
