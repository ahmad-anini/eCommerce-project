import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/User";
import "./navbar.css";
import { cartContext } from "../context/Cart";
export default function Navbar() {
  const { setUserToken, userToken, userData, setUserData } =
    useContext(UserContext);

  const { count } = useContext(cartContext);

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("userToken");
    setUserToken(null);
    setUserData(null);
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary sticky-top"
      data-bs-theme="dark"
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          Ahmad-shop
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to={"/"}>
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to={"/categories"}>
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Products
              </a>
            </li>
            {userToken && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to={"/cart"}>
                    Cart<span className="badge bg-danger">{count}</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              {userToken && <img src={userData?.image.secure_url} alt="" />}

              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {!userToken ? `Account` : userData?.userName}
              </a>

              <ul className="dropdown-menu ">
                {userToken ? (
                  <>
                    <li>
                      <Link className="dropdown-item" to={"profile"}>
                        profile
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link onClick={logout} className="dropdown-item">
                        logout
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link className="dropdown-item" to="register">
                        register
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item" to={"login"}>
                        login
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
