import "./sidebar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  BOXES_PAGE,
  CATEGORIES_PAGE,
  COUNTRIES_PAGE,
  HOME_PAGE,
  ITEMS_PAGE,
  USERS_PAGE,
} from "../../../routing/pats";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  let location = useLocation();
  const { t } = useTranslation();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const isSuper = useSelector((state) => state.auth.isSuper);
  const admin = useSelector((state) => state.auth.admin);
  const pages = [
    { id: 1, path: HOME_PAGE, name: t("home") },
    { id: 2, path: USERS_PAGE, name: t("users") },
    { id: 4, path: CATEGORIES_PAGE, name: t("categories") },
    { id: 3, path: COUNTRIES_PAGE, name: t("countries") },
  ];

  const technicianPages = [
    { id: 1, path: HOME_PAGE, name: t("home") },
    { id: 2, path: `/user/${admin?.id}`, name: t("owners") },
  ];

  const ownerPages = [
    { id: 1, path: HOME_PAGE, name: t("home") },
    { id: 2, path: BOXES_PAGE, name: t("system") },
  ];

  return (
    <div className="sidebar">
      <ul>
        {isAuth &&
          (isSuper == "admin"
            ? pages?.map(({ id, path, name }) => {
                return (
                  <div key={id}>
                    <Link
                      to={path}
                      style={{ textDecoration: "none" }}
                      key={id}
                      className={
                        location.pathname === path ? "activeLink" : "pasiveLink"
                      }
                    >
                      <li>{name}</li>
                    </Link>
                  </div>
                );
              })
            : isSuper == "user"
            ? technicianPages.map(({ id, path, name }) => {
                return (
                  <div key={id}>
                    <Link
                      to={path}
                      style={{ textDecoration: "none" }}
                      key={id}
                      className={
                        location.pathname === path ? "activeLink" : "pasiveLink"
                      }
                    >
                      <li>
                        <span
                          style={{
                            fontSize: "20px",
                          }}
                        >
                          {name}
                        </span>
                      </li>
                    </Link>
                  </div>
                );
              })
            : isSuper == "owner"
            ? ownerPages.map(({ id, path, name }) => {
                return (
                  <div key={id}>
                    <Link
                      to={path}
                      style={{ textDecoration: "none" }}
                      key={id}
                      className={
                        location.pathname === path ? "activeLink" : "pasiveLink"
                      }
                    >
                      <li>
                        <span
                          style={{
                            fontSize: "20px",
                          }}
                        >
                          {name}
                        </span>
                      </li>
                    </Link>
                  </div>
                );
              })
            : null)}
      </ul>
    </div>
  );
};

export default Sidebar;
