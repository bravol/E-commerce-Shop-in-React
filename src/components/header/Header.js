import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/Firebase";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  REMOVE_ACTIVE_USER,
  SET_ACTIVE_USER,
} from "../../redux/slice/authSlice";
import ShowOnLogin, { ShowOnLogOut } from "../hiddenLinks/hiddenLinks";
import { AdminOnlyLink } from "../adminOnlyRoute/AdminOnlyRoute";
import {
  CALCULATE_TOTAL_QUANTITY,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";

const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        e<span>Shop</span>.
      </h2>
    </Link>
  </div>
);

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Header = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [scrollPage, setScrollPage] = useState(false);

  //dispatching actions
  const dispatch = useDispatch();

  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, []);
  const cart = (
    <span className={styles.cart}>
      <Link to="/cart">
        Cart
        <FaShoppingCart size={20} />
        <p>{cartTotalQuantity}</p>
      </Link>
    </span>
  );

  const fixNavBar = () => {
    if (window.scrollY > 50) {
      setScrollPage(true);
    } else {
      setScrollPage(false);
    }
  };
  window.addEventListener("scroll", fixNavBar);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const hideMenu = () => {
    setShowMenu(false);
  };

  const logoutUser = (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        toast.success("Log Out Successfully...");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // monitor the currently signed in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // const uid = user.uid;

        if (user.displayName == null) {
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setDisplayName(uName);
        } else {
          setDisplayName(user.displayName);
        }

        // ...
        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          })
        );
      } else {
        setDisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName]);

  return (
    <>
      <header className={scrollPage ? `${styles.fixed}` : null}>
        <div className={styles.header}>
          {logo}
          <nav
            className={
              showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
            }
          >
            <div
              className={
                showMenu
                  ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                  : `${styles["nav-wrapper"]}`
              }
              onClick={hideMenu}
            ></div>
            <ul onClick={hideMenu}>
              <li className={styles["logo-mobile"]}>
                {logo}
                <FaTimes size={22} onClick={hideMenu} />
              </li>
              <AdminOnlyLink>
                <Link to="/admin/dashboard">
                  <li>
                    <button className="--btn --btn-primary">Admin</button>
                  </li>
                </Link>
              </AdminOnlyLink>
              <li>
                <NavLink to="/" className={activeLink}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={activeLink}>
                  Contact Us
                </NavLink>
              </li>
            </ul>
            <div className={styles["header-right"]} onClick={hideMenu}>
              <span className={styles.links}>
                <ShowOnLogOut>
                  <NavLink to="/login" className={activeLink}>
                    Login
                  </NavLink>
                </ShowOnLogOut>
                <ShowOnLogin>
                  <Link to="" style={{ color: "#ff7722" }}>
                    <FaUserCircle size={16} />
                    Hello, {displayName}
                  </Link>
                  <NavLink to="/order-history" className={activeLink}>
                    My Orders
                  </NavLink>
                  <NavLink to="/" onClick={logoutUser}>
                    LogOut
                  </NavLink>
                </ShowOnLogin>
              </span>
              {cart}
            </div>
          </nav>
          <div className={styles["menu-icon"]}>
            {cart}
            <GiHamburgerMenu size={30} onClick={toggleMenu} />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
