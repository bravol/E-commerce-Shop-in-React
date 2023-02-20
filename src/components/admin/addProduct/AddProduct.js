import { addDoc, collection, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db, storage } from "../../../firebase/Firebase";

import Card from "../../card/Card";
import Loader from "../../loader/Loader";
import styles from "./AddProduct.module.scss";

const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
  { id: 5, name: "Movies & Television" },
  { id: 6, name: "Home & Kitchen" },
  { id: 7, name: "Automotive" },
  { id: 8, name: "Software" },
  { id: 9, name: "Video Games" },
  { id: 10, name: "Sports & Outdoor" },
  { id: 11, name: "Toys & Games" },
  { id: 12, name: "Industrial & Scientific" },
];
const initialState = {
  name: "",
  imageURL: "",
  price: 0,
  category: "",
  brand: "",
  desc: "",
};

const AddProduct = () => {
  const [product, setProduct] = useState({ ...initialState });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  //for image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    //uploading image to firebase
    const storageRef = ref(storage, `images/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });
          toast.success("Image uploaded successfully");
        });
      }
    );
  };

  const addProduct = (e) => {
    e.preventDefault(); // prevent
    setIsLoading(true);
    try {
      // Add a new document with a generated id.
      addDoc(collection(db, "products"), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      setUploadProgress(0);
      setProduct({ ...initialState });

      toast.success("Product saved successfully");
      navigate("/admin/all-products");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.product}>
        <h2>Add New Product</h2>

        <Card className={styles.card}>
          <form onSubmit={addProduct}>
            <label>Product Name:</label>
            <input
              type="text"
              placeholder="Product name"
              required
              name="name"
              value={product.name}
              onChange={(e) => handleInputChange(e)}
            />
            <label>Product Image:</label>
            <Card className={styles.group}>
              {uploadProgress === 0 ? null : (
                <div className={styles.progress}>
                  <div
                    className={styles["progress-bar"]}
                    style={{ width: `${uploadProgress}%` }}
                  >
                    {uploadProgress < 100
                      ? `Uploading... ${uploadProgress}`
                      : `Upload Complete ${uploadProgress}%`}
                  </div>
                </div>
              )}

              <input
                type="file"
                placeholder="Product Image"
                accept="image/*"
                name="image"
                required
                onChange={(e) => handleImageChange(e)}
              />

              {product.imageURL === "" ? null : (
                <input
                  type="text"
                  name="imageURL"
                  disabled
                  value={product.imageURL}
                  required
                  placeholder="image URL"
                />
              )}
            </Card>
            <label>Product Price:</label>
            <input
              type="number"
              placeholder="Product Price"
              required
              name="price"
              value={product.price}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Product Category:</label>
            <select
              required
              name="category"
              value={product.category}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="" disabled>
                --choose product category
              </option>
              {categories.map((cat) => {
                return (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                );
              })}
            </select>

            <label>Product Company/Brand:</label>
            <input
              type="text"
              placeholder="Product company/brand"
              name="brand"
              value={product.brand}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Product Description:</label>
            <textarea
              name="desc"
              value={product.desc}
              cols="10"
              rows="10"
              required
              onChange={(e) => handleInputChange(e)}
            ></textarea>
            <button className="--btn --btn-primary" type="submit">
              Save Product
            </button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddProduct;
