import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/slice/authSlice";

//useSelector gives us the ability to select any information we want from our store

const ShowOnLogin = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (isLoggedIn) {
    return children;
  }

  return null;
};
export const ShowOnLogOut = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (!isLoggedIn) {
    return children;
  }

  return null;
};

export default ShowOnLogin;
