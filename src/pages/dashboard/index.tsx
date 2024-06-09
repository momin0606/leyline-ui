import { useContext, useLayoutEffect, useState } from "react";
import AuthContext from "src/Context/auth";
import Button from "src/components/button";
import CreateSettlementModal from "./create-settlement-modal";
import styles from "./index.module.css";
import api from "src/api";
import IUser from "src/interfaces/user";
import ISettlement from "src/interfaces/settlement";
import Settlements from "./settlements";
import ConfirmSettlementModal from "./confirm-settlement-modal";
import io from "socket.io-client";

const Dashboard: React.FC = () => {
  const { auth } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState<boolean | number>(false);
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean | number>(
    false
  );
  const createModal = typeof openModal === "boolean";
  const [users, setUsers] = useState<IUser[]>([]);
  const [settlements, setSettlements] = useState<ISettlement[]>([]);

  const getUsers = async () => {
    try {
      let res = await api.user.getUsers();
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getSettlements = async () => {
    try {
      let res = await api.settlements.getSettlements();
      setSettlements(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getSettlement = async (val: number) => {
    try {
      let res = await api.settlements.getSettlement(val);
      setSettlements((prevSettlements) => {
        let exists = prevSettlements?.find(
          (settlement) => settlement.id === res.data.id
        );
        if (exists) {
          return prevSettlements?.map((settlement) => {
            if (settlement.id === res.data.id) {
              return { ...res.data };
            }
            return settlement;
          });
        }
        return [...prevSettlements, res.data];
      });
    } catch (err) {
      console.log(err);
    }
  };
  useLayoutEffect(() => {
    getUsers();
    getSettlements();
    const socket = io("http://localhost:5000");

    socket.on("connect", () => {
      console.log("connected!");
      const token = localStorage.getItem("token");
      socket.emit("authenticate", token);
    });

    socket.on("notification", ({ data, type }) => {
      if (type === "settlementUpdated") {
        setSettlements((prevSettlements) => {
          return prevSettlements?.map((settlement) => {
            if (settlement.id === data.id) {
              return { ...settlement, ...data };
            }
            return settlement;
          });
        });
      }
    });

    socket.on("error", (error) => {
      console.error("WebSocket error:", error);
    });
  }, []);
  const createSettlement = () => {
    setOpenModal(true);
  };
  const editSettlement = (val: number) => {
    setOpenModal(val);
  };
  const settle = (val: number) => {
    setOpenConfirmModal(val);
  };
  return (
    <div className={styles.container}>
      <p>Welcome {auth?.fullname},</p>
      <div className={styles.header}>
        <p className={styles.heading}>Settlements</p>
        <Button title="Create Settlement" onClick={createSettlement} />
      </div>
      <Settlements
        settlements={settlements}
        settle={settle}
        editSettlement={editSettlement}
      />
      <CreateSettlementModal
        title={createModal ? "Create Settlement" : "Edit Settlement"}
        description={"Select User and amount for settlement"}
        open={openModal}
        setOpen={setOpenModal}
        users={users}
        settlement={settlements?.find(
          (settlement) => settlement.id === openModal
        )}
        getSettlement={getSettlement}
      />
      <ConfirmSettlementModal
        title={"Confirm Settlement"}
        open={openConfirmModal}
        setOpen={setOpenConfirmModal}
        users={users}
        getSettlement={getSettlement}
        settlement={settlements?.find(
          (settlement) => settlement.id === openConfirmModal
        )}
      />
    </div>
  );
};

export default Dashboard;
