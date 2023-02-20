import React from "react";
import { Route, Routes } from "react-router-dom";
import AddProduct from "../../components/admin/addProduct/AddProduct";
import EditProduct from "../../components/admin/addProduct/EditProduct";
import Dashboard from "../../components/admin/home/Dashboard";
import Navbar from "../../components/admin/navbar/Navbar";
import OrderDetails from "../../components/admin/orderDetails/OrderDetails";
import Orders from "../../components/admin/orders/Orders";
import ViewProduct from "../../components/admin/viewProduct/ViewProduct";

import styles from "./Admin.module.scss";

const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/all-products" element={<ViewProduct />} />
          <Route path="/add-product/:id" element={<AddProduct />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/order-details/:id" element={<OrderDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
