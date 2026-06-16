import { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const getLinkClass = ({ isActive }) =>
    `font-semibold ${isActive ? "text-gradient text-base font-semibold" : "text-gray-600  text-base font-semibold hover:text-gray-900"}`;

  const links = (
    <>
      <li>
        <NavLink to="/" className={getLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/allProducts" className={getLinkClass}>
          All Products
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/myProducts" className={getLinkClass}>
              My Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/myBids" className={getLinkClass}>
              My Bids
            </NavLink>
          </li>
          <li>
            <NavLink to="/createProduct" className={getLinkClass}>
              Create Product
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-3xl font-bold">
          Smart<span className="text-gradient pl-0">Deals</span>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <a
            onClick={handleLogOut}
            className="btn mr-6 px-6 border border-primary text-base text-gradient font-medium pt-2"
          >
            Sign Out
          </a>
        ) : (
          <Link
            to={"/login"}
            className="btn mr-6 px-6 border border-primary text-base text-gradient font-medium pt-2"
          >
            Login
          </Link>
        )}
        <Link
          to={"/register"}
          className="btn bg-primary-gradient text-base text-white px-6"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
