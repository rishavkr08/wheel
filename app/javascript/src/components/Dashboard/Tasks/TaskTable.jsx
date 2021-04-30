import React, { useState } from "react";
import { Checkbox, Badge, Button, Tooltip } from "neetoui";
import {
  limitString,
  formatDate,
  capitalize,
} from "components/Common/formatter";
import DeleteAlert from "./DeleteAlert";
import tasksApi from "apis/tasks";

const TaskTable = ({
  tasks = [],
  selectedTaskIds,
  setSelectedTaskIds,
  refetch,
}) => {
  const badgeType = {
    new: "blue",
    open: "green",
    spam: "red",
  };

  const [deleting, setDeleting] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState("");

  const deleteTask = async () => {
    try {
      setDeleting(true);
      await tasksApi.destroy({ ids: [selectedTaskId] });
      setShowDeleteAlert(false);
      refetch();
    } catch (error) {
      logger.error(error);
    } finally {
      setDeleting(false);
    }
  };

  const handleTaskDelete = taskId => {
    setSelectedTaskId(taskId);
    setShowDeleteAlert(true);
  };

  return (
    <div className="mx-24">
      <table className="nui-table nui-table--checkbox">
        <thead>
          <tr>
            <th>
              <Checkbox
                checked={
                  selectedTaskIds.length === tasks.map(task => task.id).length
                }
                onClick={() => {
                  const taskIds = tasks.map(task => task.id);
                  if (selectedTaskIds.length === taskIds.length) {
                    setSelectedTaskIds([]);
                  } else {
                    setSelectedTaskIds(taskIds);
                  }
                }}
              />
            </th>
            <th className="text-left">Task Title</th>
            <th className="text-left">Description</th>
            <th className="text-center">State</th>
            <th className="text-center">Created on</th>
            <th className="text-center">Due Date</th>
            <th className="text-left"></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr
              key={task.id}
              className="cursor-pointer bg-white hover:bg-gray-50"
            >
              <td>
                <Checkbox
                  checked={selectedTaskIds.includes(task.id)}
                  onClick={event => {
                    event.stopPropagation();
                    const index = selectedTaskIds.indexOf(task.id);

                    if (index > -1) {
                      setSelectedTaskIds([
                        ...selectedTaskIds.slice(0, index),
                        ...selectedTaskIds.slice(index + 1),
                      ]);
                    } else {
                      setSelectedTaskIds([...selectedTaskIds, task.id]);
                    }
                  }}
                />
              </td>
              <td className="flex flex-row items-center justify-start text-purple-600">
                {task.title}
              </td>
              <td className="text-gray-900">
                {limitString(task.description, 40)}
              </td>
              <td className="text-gray-900 text-center">
                <Badge color={badgeType[task.state]}>
                  {capitalize(task.state)}
                </Badge>
              </td>
              <td className="text-gray-900 text-center">
                {formatDate(task.created_at)}
              </td>
              <td className="text-gray-900 text-center">
                {task.due_date ? formatDate(task.due_date) : "---"}
              </td>
              <td>
                <span className="flex space-x-4">
                  <Tooltip content={"Edit"} position="bottom">
                    <Button style="icon" icon="ri-pencil-line" />
                  </Tooltip>
                  <Tooltip content={"Delete"} position="bottom">
                    <Button
                      style="icon"
                      icon="ri-delete-bin-line"
                      onClick={() => handleTaskDelete(task.id)}
                    />
                  </Tooltip>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showDeleteAlert && (
        <DeleteAlert
          handleClose={() => setShowDeleteAlert(false)}
          refetch={refetch}
          handleDelete={deleteTask}
          deleting={deleting}
        />
      )}
    </div>
  );
};

export default TaskTable;
