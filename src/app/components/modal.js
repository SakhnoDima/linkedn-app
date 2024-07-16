"use client";
import { useModalContext } from "../context/modal-context";

const Modal = () => {
  const { isOpen, modalContent, closeModal, handleBackdropClick } = useModalContext();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-80 flex justify-center items-center" onClick={handleBackdropClick}>
      <div className="bg-white p-5 rounded-lg relative shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px]">
        <button
          className="w-[32px] absolute top-2 right-2 text-2xl font-bold text-gray-600"
          onClick={closeModal}
        >
          &times;
        </button>
        {modalContent}
      </div>
    </div>
  );
};

export default Modal;
