import React, { useState } from "react";
import styles from "./Auth.module.scss";
import LoginImg from "../../assets/login.jpeg";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/Firebase";
import Loader from "../../components/loader/Loader";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const registerUser = (e) => {
    e.preventDefault();
    if (password !== cPassword) {
      toast.error("Password do not Match");
    }
    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user;
        // console.log(user);
        setIsLoading(false);
        toast.success("Registration Successful...");
        navigate("/login");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };
  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <Card>
          <div className={styles.form}>
            <h2>Register</h2>

            <form onSubmit={registerUser}>
              <input
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
              />
              <button className="--btn --btn-primary --btn-block" type="submit">
                Register
              </button>
            </form>
            <span className={styles.register}>
              <p>Already have an Account?</p>
              <Link to="/login">Login</Link>
            </span>
          </div>
        </Card>
        <div className={styles.img}>
          <img src={LoginImg} alt="" width="400" />
        </div>
      </section>
    </>
  );
};

export default Register;
