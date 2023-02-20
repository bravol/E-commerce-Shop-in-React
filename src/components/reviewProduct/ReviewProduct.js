import { addDoc, collection, Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import StarsRating from "react-star-rate";
import { toast } from "react-toastify";
import useFetchDocument from "../../customHooks/useFetchDocument";
import { db } from "../../firebase/Firebase";
import { selectUserID, selectUserName } from "../../redux/slice/authSlice";
import Card from "../card/Card";
import styles from "./ReviewProduct.module.scss";
import spinnerImg from "./../../assets/spinner.jpg";

const ReviewProduct = () => {
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const [product, setProduct] = useState(null);

  const { id } = useParams();
  const userID = useSelector(selectUserID);
  const userName = useSelector(selectUserName);

  //getting a single product from database
  const { document } = useFetchDocument("products", id);
  useEffect(() => {
    setProduct(document);
  }, [document]);

  const SubmitReview = (e) => {
    e.preventDefault();
    const today = new Date();
    const date = today.toDateString();

    const reviewConfig = {
      userID,
      userName,
      productID: id,
      rate,
      review,
      reviewDate: date,
      createdAt: Timestamp.now().toDate(),
    };

    try {
      // Add a new document with a generated id.
      addDoc(collection(db, "reviews"), reviewConfig);

      toast.success("Review submitted successfully");
      setRate(0);
      setReview("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section>
      <div className={`container ${styles.review}`}>
        <h2>Review Products</h2>
        {product === null ? (
          <img src={spinnerImg} alt="Loading..." style={{ width: "50px" }} />
        ) : (
          <>
            <p>
              <b>Product name:</b>
              {product.name}
            </p>
            <img
              src={product.imageURL}
              alt={product.name}
              style={{ width: "100px" }}
            />
          </>
        )}

        <Card cardClass={styles.card}>
          <form onSubmit={(e) => SubmitReview(e)}>
            <label>Rating:</label>
            <StarsRating
              value={rate}
              onChange={(rate) => {
                setRate(rate);
              }}
            />
            <label>Review</label>
            <textarea
              value={review}
              required
              onChange={(e) => setReview(e.target.value)}
              col="30"
              rows="10"
            ></textarea>
            <button type="submit" className="--btn --btn-primary">
              Submit Review
            </button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default ReviewProduct;
