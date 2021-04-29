import axios from "axios";

const fetch = () => axios.get("api/v1/tasks");

const destroy = payload => axios.post("api/v1/tasks/bulk_delete", payload);

const tasksApi = {
  fetch,
  destroy,
};

export default tasksApi;
