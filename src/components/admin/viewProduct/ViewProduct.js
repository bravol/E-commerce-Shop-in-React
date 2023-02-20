import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import Notiflix from "notiflix";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import { db, storage } from "../../../firebase/Firebase";
import {
  FILTER_BY_SEARCH,
  selectFilteredProducts,
} from "../../../redux/slice/filterSlice";
import {
  selectProducts,
  STORE_PRODUCTS,
} from "../../../redux/slice/productSlice";
import Loader from "../../loader/Loader";
import Pagination from "../../pagination/Pagination";
import Search from "../../search/Search";
import styles from "./ViewProduct.module.scss";

const ViewProduct = () => {
  const [search, setSearch] = useState("");
  //using customHook
  const { data, isLoading } = useFetchCollection("products");

  const products = useSelector(selectProducts);
  const filteredProducts = useSelector(selectFilteredProducts);

  //PAGINATION states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  //get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFastProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFastProduct,
    indexOfLastProduct
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);

  //filtering product in store
  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [dispatch, products, search]);

  //delete product
  const deleteProduct = async (id, imageURL) => {
    try {
      await deleteDoc(doc(db, "products", id));
      //delete image from storage
      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);
      toast.success("product deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      "Delete Product!!!",
      "You are about to delete this product",
      "Delete",
      "Cancel",
      function okCb() {
        deleteProduct(id, imageURL);
      },
      function cancelCb() {
        // console.log("Delete cancelled");
      },
      {
        width: "320px",
        borderRadius: "3px",
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom",
        // etc...
      }
    );
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.table}>
        <h2>All products</h2>

        <div className={styles.search}>
          <p>
            <b> {filteredProducts.length} products found</b>
          </p>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {filteredProducts.length < 1 ? (
          <p>No product found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product, index) => {
                const { id, name, category, price, imageURL } = product;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={imageURL}
                        alt={name}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>{`$${price}`}</td>
                    <td className={styles.icons}>
                      <Link to={`/admin/edit-product/${id}`}>
                        <FaEdit size={20} color="green" />
                      </Link>
                      &nbsp;
                      <FaTrashAlt
                        size={18}
                        color="red"
                        onClick={() => confirmDelete(id, imageURL)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalProducts={filteredProducts.length}
          productsPerPage={productsPerPage}
        />
      </div>
    </>
  );
};

export default ViewProduct;
