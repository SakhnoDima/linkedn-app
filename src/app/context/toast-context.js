"use client"
import React, { createContext, useState, useContext, useCallback } from 'react';
import Toast from '../components/toast';

const ToastContext = createContext();

export const ToastContextProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, status) => {
    setToast({ message, status });
    setTimeout(() => {
      setToast(null);
    }, 3000); 
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {toast && <Toast message={toast.message} status={toast.status} />}
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  return useContext(ToastContext);
};
