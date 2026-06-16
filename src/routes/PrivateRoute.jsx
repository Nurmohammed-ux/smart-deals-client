import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-4xl font-bold">
        L(
        <span className="inline-block text-primary animate-spin">O</span>
        )ADING...
      </div>
    );
  }

  if (user) {
    return children;
  }
  return <Navigate state={location?.pathname} to={"/register"} />;
};

export default PrivateRoute;
