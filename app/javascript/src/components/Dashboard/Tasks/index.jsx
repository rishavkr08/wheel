import React, { useEffect, useState } from "react";
import { PageHeading, SubHeader } from "neetoui/layouts";
import { PageLoader } from "neetoui";
import EmptyState from "components/Common/EmptyState";
import EmptyNotesListImage from "images/EmptyNotesList";
import { useAuthDispatch } from "contexts/auth";
import authenticationApi from "apis/authentication";
import { resetAuthTokens } from "apis/axios";
import { Toastr } from "neetoui";
import AccountDropdown from "components/Common/Navbar/AccountDropdown";
import tasksApi from "apis/tasks";
import TaskTable from "./TaskTable";
import DeleteAlert from "./DeleteAlert";

const Tasks = () => {
  const authDispatch = useAuthDispatch();
  const handleLogout = async () => {
    try {
      await authenticationApi.logout();
      authDispatch({ type: "LOGOUT" });
      resetAuthTokens();
      window.location.href = "/";
    } catch (error) {
      Toastr.error(error);
    }
  };
  const perPage = 10;
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // const [showNewTaskPane, setShowNewTaskPane] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  // const [soryBy, setSortBy] = useState("");
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await tasksApi.fetch();
      setTasks(response.data);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await tasksApi.destroy({ ids: selectedTaskIds });
      setShowDeleteAlert(false);
      fetchTasks();
    } catch (error) {
      logger.error(error);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <React.Fragment>
      <PageHeading
        title="Tasks"
        rightButton={() => (
          <>
            <AccountDropdown handleLogout={handleLogout} />

            {/* <Button
              onClick={() => setShowNewTaskPane(true)}
              label="Add new task"
              icon="ri-add-line"
            /> */}
          </>
        )}
      />
      {tasks.length ? (
        <>
          <SubHeader
            searchProps={{
              value: searchTerm,
              onChange: e => setSearchTerm(e.target.value),
              clear: () => setSearchTerm(""),
            }}
            paginationProps={{
              pageSize: perPage,
              count: tasks.length,
              pageNo: currentPage,
              navigate: page => setCurrentPage(page),
            }}
            columnFilterProps={{}}
            sortProps={{
              options: [
                { value: "title", label: "Title" },
                { value: "createdOn", label: "Created On" },
                { value: "dueDate", label: "Due Date" },
              ],
              onClick: () => null,
            }}
            deleteButtonProps={{
              disabled: !selectedTaskIds.length,
              onClick: () => setShowDeleteAlert(true),
            }}
            toggleFilter
          />
          <TaskTable
            selectedTaskIds={selectedTaskIds}
            setSelectedTaskIds={setSelectedTaskIds}
            tasks={tasks.slice(
              (currentPage - 1) * perPage,
              (currentPage - 1) * perPage + perPage
            )}
            refetch={fetchTasks}
          />
        </>
      ) : (
        <EmptyState
          image={EmptyNotesListImage}
          title="Looks like you don't have any task!"
          subtitle="Add your task to send customized emails to them."
          // primaryAction={() => setShowNewTaskPane(true)}
          primaryActionLabel="Add new task"
        />
      )}
      {showDeleteAlert && (
        <DeleteAlert
          handleClose={() => setShowDeleteAlert(false)}
          handleDelete={handleDelete}
          deleting={deleting}
        />
      )}
    </React.Fragment>
  );
};

export default Tasks;
