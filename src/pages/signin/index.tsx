// Signin.tsx
import { jwtDecode } from "jwt-decode";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "src/Context/auth";
import api from "src/api";
import Logo from "src/assets/images/logo.png";
import styles from "./index.module.css";
import Button from "src/components/button";
const Signin: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.auth.signin({ username, password });
      const { token } = response.data;
      localStorage.setItem("token", token);
      setAuth(jwtDecode(token));
      navigate("/dashboard");
    } catch (error) {
      console.error("Signin failed:", error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSignin} className={styles.formContainer}>
        <img className={styles.logoImage} src={Logo} alt="logo" />
        <p className={styles.signinText}>Signin to Settlement Portal!</p>
        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          className={styles.inputField}
          required
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.inputField}
        />
        <div className={styles.buttonContainer}>
          <Button title="Signin" />
        </div>
        <div className={styles.loginLinks}>
          <Link to={"/signup"}>New to website?</Link>
        </div>
      </form>
    </div>
  );
};

export default Signin;
