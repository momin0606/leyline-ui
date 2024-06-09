import IUser from "../user";

type ISettlement = {
  id: number;
  amount: number;
  status: string;
  fromUserId: number;
  toUserId: number;
  lastUpdatedBy: number;
  createdAt: string;
  updatedAt: string;
  FromUser: IUser;
  ToUser: IUser;
};
export default ISettlement;
