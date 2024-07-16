"use client"
import { createContext, useState, useContext, useEffect } from 'react';

const ModalContext = createContext({});

export const ModalContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
    document.activeElement.blur();
  };
  const handleEscape = (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };


  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);
  return (
    <ModalContext.Provider value={{ isOpen, modalContent, openModal, closeModal, handleBackdropClick }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
