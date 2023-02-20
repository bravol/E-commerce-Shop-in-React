import { useState } from "react";
import styles from "./Pagination.module.scss";

const Pagination = ({
  currentPage,
  productsPerPage,
  setCurrentPage,
  totalProducts,
}) => {
  const pageNumbers = [];
  const totalPages = totalProducts / productsPerPage;
  //limit the page Numbers shown
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  //function to paginate/select a particular page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //go to next page
  const paginateNextPage = () => {
    setCurrentPage(currentPage + 1);

    //show next set of pageNumbers
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  //go to previous page
  const paginatePrevPage = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.pagination}>
      <li
        onClick={paginatePrevPage}
        className={currentPage === pageNumbers[0] ? `${styles.hidden}` : null}
      >
        Prev
      </li>
      {pageNumbers.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
          return (
            <li
              key={number}
              onClick={() => paginate(number)}
              className={currentPage === number ? `${styles.active}` : null}
            >
              {number}
            </li>
          );
        }
      })}

      <li
        onClick={paginateNextPage}
        className={
          currentPage === pageNumbers[pageNumbers.length - 1]
            ? `${styles.hidden}`
            : null
        }
      >
        Next
      </li>
      <p>
        <b className={styles.page}> {`page ${currentPage}`} </b>
        <span> {` of `} </span>
        <b> {`${Math.ceil(totalPages)}`} </b>
      </p>
    </div>
  );
};

export default Pagination;
