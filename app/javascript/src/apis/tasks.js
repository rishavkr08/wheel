import axios from "axios";

const fetch = () => axios.get("api/v1/tasks");

const tasksApi = {
  fetch,
};

export default tasksApi;
