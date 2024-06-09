import { toast } from "react-toastify";
import api from "src/api";
import Modal from "src/components/modal";
import ISettlement from "src/interfaces/settlement";
import IUser from "src/interfaces/user";

type IProps = {
  open: boolean | number;
  setOpen: (val: boolean | number) => void;
  title: string;
  description?: string;
  users: IUser[];
  getSettlement: (val: number) => void;
  settlement?: ISettlement;
};

const ConfirmSettlementModal: React.FC<IProps> = ({
  open,
  setOpen,
  title,
  description,
  settlement,
  getSettlement,
}) => {
  const handleSubmit = async () => {
    if (settlement) {
      let { amount } = settlement;
      try {
        await api.settlements.editSettlement({
          amount,
          settlementId: open,
          status: "settled",
        });
        toast.success("Settlement has been settled!");
        getSettlement(+open);
      } catch (err: any) {
        toast.error(err.response.data.message);
      } finally {
        setOpen(false);
      }
    }
  };
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title={title}
      description={description}
      handleSubmit={handleSubmit}
    >
      <p>Are you sure you want to settle this submission?</p>{" "}
    </Modal>
  );
};

export default ConfirmSettlementModal;
