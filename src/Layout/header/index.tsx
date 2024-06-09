import { useContext } from "react";
import styles from "./index.module.css";
import AuthContext from "src/Context/auth";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "src/assets/images/logo.png";
import Button from "src/components/button";

const Header: React.FC = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSignout = () => {
    localStorage.removeItem("token");
    setAuth(undefined);
    navigate("/");
  };
  const navigateDashboard = () => {
    navigate("/dashboard");
  };
  const navigateSignin = () => {
    navigate("/signin");
  };
  const navigateSignup = () => {
    navigate("/signup");
  };
  const location = useLocation();
  const signinLocation = location?.pathname === "/signin";
  const signupLocation = location?.pathname === "/signup";
  const dashboardLocation = location?.pathname === "/dashboard";
  console.log({ signinLocation, signupLocation, dashboardLocation });
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img className={styles.logoImage} src={Logo} alt="logo" />
        <p>Settlement Portal</p>
      </div>
      <div className={styles.authSection}>
        {!auth ? (
          <>
            {!signupLocation && (
              <Button onClick={navigateSignup} title={"Sign Up"} />
            )}
            {!signinLocation && (
              <Button onClick={navigateSignin} title={"Sign In"} />
            )}
          </>
        ) : (
          <>
            {!dashboardLocation && (
              <Button onClick={navigateDashboard} title={"Dashboard"} />
            )}
            <Button onClick={handleSignout} title={"Sign Out"} />
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
