import React from "react";
import { Modal } from "neetoui";

const DeleteAlert = ({ handleClose, handleDelete, deleting }) => {
  return (
    <Modal
      isOpen
      size="small"
      autoHeight
      showFooter
      submitButtonProps={{
        style: "danger",
        label: "Delete",
        loading: deleting,
        onClick: handleDelete,
      }}
      onClose={handleClose}
    >
      <div className="flex">
        <div className="flex items-center justify-center w-10 h-10 flex-shrink-0 bg-red-100 rounded-full">
          <i className="text-red-500 ri-lg ri-alarm-warning-fill" />
        </div>
        <div className="ml-4">
          <h3 className="mb-2 text-lg font-medium text-gray-600">
            Delete Task
          </h3>
          <div className="leading-5 text-gray-600">
            Are you sure you want to delete the task? All your data will be
            permanently removed from the database forever. This action cannot be
            undone.
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteAlert;
