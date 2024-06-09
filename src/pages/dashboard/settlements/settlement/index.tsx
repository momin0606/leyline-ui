import React, { useContext } from "react";
import ISettlement from "src/interfaces/settlement";
import styles from "./index.module.css";
import AuthContext from "src/Context/auth";
import moment from "moment";
import Button from "src/components/button";
import classNames from "classnames";
type IProps = {
  settlement: ISettlement;
  editSettlement: (val: number) => void;
  settle: (val: number) => void;
};

const Settlement: React.FC<IProps> = ({
  settlement,
  settle,
  editSettlement,
}) => {
  const { auth } = useContext(AuthContext);
  const ownSettlement = auth.id === settlement.fromUserId;
  const updatedLast = auth.id === settlement.lastUpdatedBy;
  const isSettled = settlement.status === "settled";
  const isSubmitted = settlement.status === "submitted";

  const canEdit = () => {
    if (isSettled) {
      return false;
    }
    if (isSubmitted) {
      return true;
    }
    if (updatedLast) {
      return false;
    }
    return true;
  };
  const handleEdit = () => {
    editSettlement(settlement.id);
  };
  const handleSettle = () => {
    settle(settlement.id);
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p
          className={styles.heading}
        >{`My Settlement ${settlement.id} with ${settlement.ToUser.fullname}`}</p>
        <p className={styles.tag}>{settlement.status}</p>
      </div>
      <p>
        Amount: <span>{settlement.amount}</span>
      </p>
      <p>
        Created By: <span>{settlement.FromUser?.fullname}</span>
      </p>
      <p>
        Created at:{" "}
        <span>
          {moment(settlement.createdAt).format("Do MMM,YYYY hh:mm a")}
        </span>
      </p>
      <p>
        Last updated at:{" "}
        <span>
          {moment(settlement.updatedAt).format("Do MMM,YYYY hh:mm a")}
        </span>
      </p>
      {canEdit() && (
        <div
          className={classNames(styles.actionContainer, {
            [styles.settle]: !ownSettlement,
          })}
        >
          <Button title="Edit" onClick={handleEdit} />
          {!ownSettlement && <Button title="Settle" onClick={handleSettle} />}
        </div>
      )}
    </div>
  );
};

export default Settlement;
