import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/apiCalls/authApiCall";
import { useTranslation } from "react-i18next";
const HeaderRight = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [dropdown, setDropdown] = useState(false);
  const { t, i18n } = useTranslation();

  // Logout Handler
  const logoutHandler = () => {
    setDropdown(false);
    dispatch(logoutUser());
  }

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }

  return (
    <div className="header-right">
        {user ? (
          <>
            <div className="header-right-user-info">
              <span
                onClick={() => setDropdown((prev) => !prev)}
                className="header-right-username"
              >
                {user?.username}
              </span>
              <img
                src={user?.profilePhoto.url}
                alt="user photo"
                className="header-right-user-photo"
              />
              {dropdown && (
                <div className="header-right-dropdown active">
                  <Link
                    to={`/profile/${user?._id}`}
                    className="header-dropdown-item"
                    onClick={() => setDropdown(false)}
                  >
                    <i className="bi bi-file-person"></i>
                    <span>Profile</span>
                  </Link>
                  <div onClick={logoutHandler} className="header-dropdown-item">
                    <i className="bi bi-box-arrow-in-left"></i>
                    <span>Logout</span>
                  </div>
                </div>
              )}
            </div>
            <div className="language-switcher">
              <button onClick={() => changeLanguage('en')} className="language-button">
                English
              </button>
              <button onClick={() => changeLanguage('ar')} className="language-button">
                العربية
              </button>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="header-right-link">
              <i className="bi bi-box-arrow-in-right"></i>
              <span>Login</span>
            </Link>
            <Link to="/register" className="header-right-link">
              <i className="bi bi-person-plus"></i>
              <span>Register</span>
            </Link>
            <div className="language-switcher">
              <button onClick={() => changeLanguage('en')} className="language-button">
                English
              </button>
              <button onClick={() => changeLanguage('ar')} className="language-button">
                العربية
              </button>
            </div>
          </>
        )}
    </div>
  );
};

export default HeaderRight;