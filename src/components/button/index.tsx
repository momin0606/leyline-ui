import styles from "./index.module.css";
type IProps = {
  title: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button: React.FC<IProps> = ({ title, onClick }) => {
  return (
    <button onClick={onClick} className={styles.button}>
      {title}
    </button>
  );
};

export default Button;
