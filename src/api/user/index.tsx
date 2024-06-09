import Axios from "../interceptor";

const getUsers = () => {
  return Axios.get("/users");
};

export default {
  getUsers,
};
