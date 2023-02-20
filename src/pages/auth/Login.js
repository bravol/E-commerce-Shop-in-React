import React, { useState } from "react";
import styles from "./Auth.module.scss";
import LoginImg from "../../assets/login.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Card from "../../components/card/Card";
import { toast } from "react-toastify";

import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/Firebase";
import Loader from "../../components/loader/Loader";
import { useSelector } from "react-redux";
import { selectPreviousURL } from "../../redux/slice/cartSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  //when a user adds things before he logs in the after he clicks on checkout/this happens below
  const previousURL = useSelector(selectPreviousURL);
  const redirectUser = () => {
    if (previousURL.includes("cart")) {
      return navigate("/cart");
    } else {
      navigate("/");
    }
  };

  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user;
        setIsLoading(false);
        // navigate("/");
        toast.success("Login successful...");
        redirectUser();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("Login failed...");
      });
  };
  //login with google
  const signInWithGoogle = () => {
    // e.preventDefault();
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // const user = result.user;
        toast.success("Login successful");
        // navigate("/");
        redirectUser();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={LoginImg} alt="" width="400" />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Login</h2>

            <form onSubmit={loginUser}>
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
              <button className="--btn --btn-primary --btn-block" type="submit">
                Login
              </button>
              <div className={styles.links}>
                <Link to="/reset">Reset Password</Link>
              </div>
              <p>-- or --</p>
            </form>
            <button
              className="--btn --btn-danger --btn-block"
              onClick={signInWithGoogle}
            >
              <FaGoogle /> Login With Google
            </button>
            <span className={styles.register}>
              <p>Don't have an Account?</p>
              <Link to="/register">Register</Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
