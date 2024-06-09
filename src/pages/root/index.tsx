import { Link, useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import Logo from "src/assets/images/logo.png";
import { useContext } from "react";
import AuthContext from "src/Context/auth";
import Button from "src/components/button";
function Home() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const navigateDashboard = () => {
    navigate("/dashboard");
  };
  return (
    <div className={styles.container}>
      <div className={styles.welcomeContainer}>
        <img className={styles.logoImage} src={Logo} alt="logo" />
        <p className={styles.welcomeText}>
          Welcome {auth?.fullname}, to Settlement Portal!
        </p>
        {auth ? (
          <div className={styles.buttonContainer}>
            <Button onClick={navigateDashboard} title="Go to Dashboard" />
          </div>
        ) : (
          <div className={styles.loginLinks}>
            <Link to={"/signin"}>Already a member?</Link>
            <Link to={"/signup"}>New to website?</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
