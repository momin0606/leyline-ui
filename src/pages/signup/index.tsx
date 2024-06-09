// Signup.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "src/api";
import Logo from "src/assets/images/logo.png";
import Button from "src/components/button";
import styles from "./index.module.css";

const Signup: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [fullname, setFullname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.auth.signup({ username, password, fullname });
      navigate("/signin");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSignup} className={styles.formContainer}>
        <img className={styles.logoImage} src={Logo} alt="logo" />
        <p className={styles.signupText}>Signup to Settlement Portal!</p>
        <input
          type="text"
          value={fullname}
          placeholder="Fullname"
          onChange={(e) => setFullname(e.target.value)}
          className={styles.inputField}
          required
        />
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
          <Button title="Signup" />
        </div>
        <div className={styles.loginLinks}>
          <Link to={"/signin"}>Already a member?</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
