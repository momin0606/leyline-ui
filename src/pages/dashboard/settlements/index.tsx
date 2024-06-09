import ISettlement from "src/interfaces/settlement";
import styles from "./index.module.css";
import Settlement from "./settlement";
type IProps = {
  settlements: ISettlement[];
  settle: (val: number) => void;
  editSettlement: (val: number) => void;
};

const Settlements: React.FC<IProps> = ({
  settlements,
  settle,
  editSettlement,
}) => {
  return (
    <div className={styles?.container}>
      {settlements?.map((settlement) => {
        return (
          <Settlement
            key={settlement?.id}
            settlement={settlement}
            settle={settle}
            editSettlement={editSettlement}
          />
        );
      })}
    </div>
  );
};

export default Settlements;
