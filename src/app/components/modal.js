"use client";
import { useModalContext } from "../context/modal-context";

const Modal = () => {
  const { isOpen, modalContent, closeModal, handleBackdropClick } = useModalContext();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" onClick={handleBackdropClick}>
      <div className="bg-white p-5 rounded-lg relative">
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
