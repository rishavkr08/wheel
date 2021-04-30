import React from "react";
import { Pane } from "neetoui";
import NewTaskForm from "./NewTaskForm";

const NewTaskDrawer = ({ showDrawer, handleShowDrawer, refetch }) => {
  const onClose = () => handleShowDrawer(false);
  return (
    <Pane title="Create task" isOpen={showDrawer} onClose={onClose}>
      <div className="px-6">
        <NewTaskForm onClose={onClose} refetch={refetch} />
      </div>
    </Pane>
  );
};

export default NewTaskDrawer;
