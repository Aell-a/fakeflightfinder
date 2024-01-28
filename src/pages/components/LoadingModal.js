import React from "react";
import Modal from "react-modal";
import { RiLoader2Line } from "react-icons/ri";

Modal.setAppElement("#root");

const LoadingModal = ({ isOpen }) => {
  return (
    <Modal
      isOpen={isOpen}
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      className="bg-white p-8 rounded-lg"
    >
      <div className="flex items-center justify-center">
        <RiLoader2Line className="animate-spin text-blue-500 text-4xl" />
        <span className="ml-4 text-xl">Loading...</span>
      </div>
    </Modal>
  );
};

export default LoadingModal;
