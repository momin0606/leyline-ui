import Axios from "../interceptor";

const signin = (body: any) => {
  return Axios.post("/auth/signin", body);
};
const signup = (body: any) => {
  return Axios.post("/auth/signup", body);
};

export default {
  signin,
  signup,
};
