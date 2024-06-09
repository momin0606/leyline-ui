import Axios from "../interceptor";

const getSettlements = () => {
  return Axios.get("/settlements");
};
const getSettlement = (id: number) => {
  return Axios.get(`/settlements/${id}`);
};
const createSettlement = (body: any) => {
  return Axios.post("/settlements", body);
};
const editSettlement = (body: any) => {
  return Axios.put("/settlements", body);
};

export default {
  getSettlements,
  createSettlement,
  editSettlement,
  getSettlement,
};
