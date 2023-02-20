import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <div className={styles["not-found"]}>
      <div>
        <h2>404</h2>
      </div>
      <p>Ooopppppsss, page not found</p>
      <button className="--btn">
        <Link to="/">&larr; Back To Home</Link>
      </button>
    </div>
  );
};

export default NotFound;
