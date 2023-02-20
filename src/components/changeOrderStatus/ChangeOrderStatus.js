import { doc, setDoc, Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../firebase/Firebase";
import Card from "../card/Card";
import Loader from "../loader/Loader";
import styles from "./ChangeOrderStatus.module.scss";

const ChangeOrderStatus = ({ order, id }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const editOrder = (e, id) => {
    e.preventDefault();
    setIsLoading(true);

    const orderConfig = {
      userID: order.userID,
      userEmail: order.userEmail,
      orderDate: order.orderDate,
      orderTime: order.orderTime,
      orderAmount: order.orderAmount,
      orderStatus: status,
      cartItems: order.cartItems,
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt,
      editedAt: Timestamp.now().toDate(),
    };

    try {
      // set/edit a single document

      setDoc(doc(db, "orders", id), orderConfig);
      setIsLoading(false);
      toast.success("Order status changed successfully");

      navigate("/admin/orders");
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.status}>
        <Card cardClass={styles.card}>
          <h4>Update Status</h4>
          <form onSubmit={(e) => editOrder(e, id)}>
            <span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option disabled value="">
                  --choose one --
                </option>
                <option value="Order Placed...">Order Placed...</option>
                <option value="Processing...">Processing...</option>
                <option value="Shipped">Shipped...</option>
                <option value="Delivered">Delivered</option>
              </select>
            </span>
            <span>
              <button type="submit" className="--btn --btn-primary">
                Update Status
              </button>
            </span>
          </form>
        </Card>
      </div>
    </>
  );
};

export default ChangeOrderStatus;
