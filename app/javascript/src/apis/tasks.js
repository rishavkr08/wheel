import axios from "axios";

const fetch = () => axios.get("api/v1/tasks");

const destroy = payload => axios.post("api/v1/tasks/bulk_delete", payload);

const create = payload => axios.post("api/v1/tasks", payload);

const tasksApi = {
  fetch,
  destroy,
  create,
};

export default tasksApi;
