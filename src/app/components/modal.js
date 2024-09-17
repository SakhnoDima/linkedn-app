"use client";
import { useModalContext } from "../context/modal-context";
import { motion, AnimatePresence } from "framer-motion";

const Modal = () => {
  const { isOpen, modalContent, closeModal, handleBackdropClick } =
    useModalContext();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gray-500 bg-opacity-80 flex justify-center items-center"
          onClick={handleBackdropClick}
        >
          <div className="bg-white flex shrink-0 flex-col p-2 rounded-lg relative shadow-[rgba(0,0,0,0.2)_0px_60px_40px_-7px] md:w-fit w-full max-h-[calc(100vh-4rem)] overflow-y-auto">
            <button
              className="w-[32px] h-[12px] sticky flex top-2 place-self-end text-2xl font-bold text-gray-600"
              onClick={closeModal}
            >
              &times;
            </button>
            {modalContent}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
