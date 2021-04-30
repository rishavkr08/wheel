import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";

import { Input, Textarea, Switch, CheckBox, Select } from "neetoui/formik";
import { Button } from "neetoui";
import { capitalize } from "components/Common/formatter";
import tasksApi from "apis/tasks";

const NewTaskForm = ({ onClose, refetch }) => {
  const handleSubmit = async values => {
    try {
      const {
        title,
        state,
        dueDate,
        description,
        aceInvoiceEntry,
        reminderEmail,
      } = values;
      const task = {
        title,
        description,
        due_date: dueDate,
        state: state.value,
        ace_invoice_entry: aceInvoiceEntry,
        reminder_email: reminderEmail,
      };
      await tasksApi.create(task);
      refetch();
      onClose();
    } catch (error) {
      logger.error(error);
    }
  };

  const taskStatuses = ["new", "open", "spam"];
  const getFormattedOptions = statuses =>
    statuses.map(status => ({
      value: status,
      label: capitalize(status),
    }));
  const formattedTaskStatuses = getFormattedOptions(taskStatuses);
  return (
    <Formik
      initialValues={{
        title: "",
        state: "",
        dueDate: null,
        description: "",
        aceInvoiceEntry: false,
        reminderEmail: false,
      }}
      validationSchema={yup.object({
        title: yup.string().required("Title is required"),
        state: yup.object().required("Task state is required"),
        description: yup.string().required("Description is required"),
      })}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Input
            label="Task Title"
            name="title"
            className="mb-3"
            placeholder="Enter task title"
          />
          <Select
            label="Task State"
            name="state"
            placeholder="Select task state"
            options={formattedTaskStatuses}
            className="mb-3"
          />
          <Input label="Due Date" name="dueDate" type="date" className="mb-3" />
          <Textarea
            label="Task Description"
            name="description"
            className="mb-3"
            placeholder="Enter task description"
          />
          <div className="flex my-6 align-center justify-between">
            <h6 className="text-sm font-medium text-gray-800">
              Create Ace Invoice Entry for the task
            </h6>
            <CheckBox name="aceInvoiceEntry" />
          </div>
          <div className="flex my-6 align-center justify-between">
            <h6 className="text-sm font-medium text-gray-800">
              Send reminder email for the task
            </h6>
            <Switch name="reminderEmail" />
          </div>
          <div className="nui-pane__footer nui-pane__footer--absolute">
            <Button
              onClick={onClose}
              size="large"
              style="secondary"
              label="Cancel"
            />
            <Button
              type="submit"
              label="Save Changes"
              size="large"
              style="primary"
              className="ml-2"
              disabled={isSubmitting}
              loading={isSubmitting}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NewTaskForm;
