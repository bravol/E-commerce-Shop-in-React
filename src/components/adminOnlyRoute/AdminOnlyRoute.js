import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectEmail } from "../../redux/slice/authSlice";

const AdminOnlyRoute = ({ children }) => {
  const userEmail = useSelector(selectEmail);
  if (userEmail === "bravolsoftwaresolutions@gmail.com") {
    return children;
  }
  return (
    <section style={{ height: "80vh" }}>
      <div className="container">
        <h2>Permission Denied</h2>
        <p>This page can only be viewed by admin user</p>
        <Link to="/">
          <button> &larr; Back To Home </button>
        </Link>
      </div>
    </section>
  );
};

export const AdminOnlyLink = ({ children }) => {
  const userEmail = useSelector(selectEmail);
  if (userEmail === "bravolsoftwaresolutions@gmail.com") {
    return children;
  }
  return null;
};

export default AdminOnlyRoute;
