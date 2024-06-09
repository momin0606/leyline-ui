import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import Modal from "src/components/modal";
import ISettlement from "src/interfaces/settlement";
import IUser from "src/interfaces/user";
import * as yup from "yup";
import styles from "./index.module.css";
import api from "src/api";
import AuthContext from "src/Context/auth";
import { toast } from "react-toastify";

type IProps = {
  open: boolean | number;
  setOpen: (val: boolean | number) => void;
  title: string;
  description?: string;
  users: IUser[];
  settlement?: ISettlement;
  getSettlement: (val: number) => void;
};

const CreateSettlementModal: React.FC<IProps> = ({
  open,
  setOpen,
  title,
  description,
  settlement,
  users,
  getSettlement,
}) => {
  const [initialValues, setInitialValues] = useState<{
    amount: number;
    toUserId?: number;
  }>({ amount: 0 });
  const { auth } = useContext(AuthContext);
  const ownSettlement = auth.id === settlement?.fromUserId;
  const isSubmitted = settlement?.status === "submitted";
  const getStatus = () => {
    if (ownSettlement) {
      if (isSubmitted) {
        return "submitted";
      }
      return "disputed";
    }
    return "disputed";
  };
  const createModal = typeof open === "boolean";
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async ({ amount, toUserId }) => {
      try {
        if (createModal) {
          let res = await api.settlements.createSettlement({
            amount,
            toUserId: toUserId ? +toUserId : undefined,
          });
          toast.success("Settlement has been created!");
          getSettlement(res.data.id);
        } else {
          if (ownSettlement) {
            let res = await api.settlements.getSettlement(open);
            if (res.data.status !== settlement?.status) {
              toast.error(
                "This settlement has been updated by other User please refresh the application!"
              );
              return;
            }
          }
          await api.settlements.editSettlement({
            amount,
            settlementId: open,
            status: getStatus(),
          });
          toast.success("Settlement has been updated!");
          getSettlement(open);
        }
      } catch (err: any) {
        toast.error(err.response.data.message);
      } finally {
        setOpen(false);
      }
    },
    validationSchema: createModal
      ? yup.object().shape({
          amount: yup
            .number()
            .positive("Amount can only be positive")
            .required("Amount is required for submission!"),
          toUserId: yup.number().required("Please select user for submission!"),
        })
      : yup.object().shape({
          amount: yup
            .number()
            .positive("Amount can only be positive")
            .required("Amount is required for updating settlement submission!"),
        }),
  });
  useEffect(() => {
    if (open && settlement) {
      setInitialValues({ amount: settlement.amount });
    } else {
      setInitialValues({ amount: 0 });
      formik.resetForm();
    }
  }, [open]);
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title={title}
      description={description}
      handleSubmit={async () => {
        await formik.setFieldTouched("toUserId");
        formik.submitForm();
      }}
    >
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            name="amount"
            value={formik.values.amount}
            placeholder="Amount"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={styles.inputField}
          />
          {formik.touched.amount && formik.errors.amount && (
            <p className={styles.error}>{formik.errors.amount}</p>
          )}
        </div>
        {createModal && (
          <div className={styles.inputContainer}>
            <label htmlFor="toUserId">User</label>
            <select
              id="toUserId"
              name="toUserId"
              value={formik.values.toUserId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={styles.inputField}
            >
              <option disabled selected>
                Select User
              </option>
              {users?.map((user) => {
                return (
                  <option value={user.id} key={user.id}>
                    {user.fullname}
                  </option>
                );
              })}
            </select>
            {formik.errors.toUserId && (
              <p className={styles.error}>{formik.errors.toUserId}</p>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CreateSettlementModal;
