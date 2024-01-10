import { Navigate } from "react-router";
import { UseAuth } from "../hook/UseAuth";
import { Home } from "../pages/home/home";

function Public() {
  let [token] = UseAuth();

  if (!token) {
    return <Navigate to="/login" />;
  } else {
    return <Home />;
  }
}

export default Public;
