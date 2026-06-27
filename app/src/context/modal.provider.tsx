"use client";

import React, { ReactNode, useContext, useMemo, useState } from "react";
import { createPortal } from "react-dom";

type ModalType = {
  id: string;
  content: ReactNode;
  coverToolbar: boolean;
  loading: boolean;
};

type ModalContextType = {
  modals: ModalType[];
  openModal: (id: string, content: ReactNode, coverToolbar?: boolean) => void;
  closeModal: (id: string) => void;
  modalOpened: (id: string) => boolean;
};

export const ModalContext = React.createContext<ModalContextType>({
  modals: [],
  openModal: () => {},
  closeModal: () => {},
  modalOpened: () => false
});

type ModalProviderProps = {
  children: React.ReactNode;
};

const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modals, setModals] = useState<ModalType[]>([]);

  const openModal = (id: string, content: ReactNode, coverToolbar = false) => {
    setModals(prevModals => [
      ...prevModals.filter(modal => modal.id !== id),
      { id, content, coverToolbar, loading: false },
    ]);
  };

  const closeModal = (id: string) => {
    setModals(prevModals => prevModals.filter(modal => modal.id !== id));
  };

  const modalOpened = (id: string) => modals.some(modal => modal.id === id);

  const value = useMemo(
    () => ({
      modals,
      openModal,
      closeModal,
      modalOpened
    }),
    [modals]
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      {typeof document !== "undefined" &&
        createPortal(
          <>
            {modals.map(modal => (
              <React.Fragment key={modal.id}>{modal.content}</React.Fragment>
            ))}
          </>,
          document.body,
        )}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);

export default ModalProvider;
