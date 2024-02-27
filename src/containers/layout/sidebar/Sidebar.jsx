import "./sidebar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  ADMINS_PAGE,
  BOXES_PAGE,
  CATEGORIES_PAGE,
  COUNTRIES_PAGE,
  HOME_PAGE,
  USERS_PAGE,
} from "../../../routing/pats";
import { useTranslation } from "react-i18next";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import CloseIcon from "@mui/icons-material/Close";
import { Tooltip } from "@mui/material";
import { useIsMobile } from "../../../hooks/useScreenType";
import { useEffect, useState } from "react";
import { themePallete } from "../../..";

const Sidebar = ({ close, setClose }) => {
  let location = useLocation();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [pathName, setPathName] = useState(location.pathname);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const isSuper = useSelector((state) => state.auth.isSuper);
  const admin = useSelector((state) => state.auth.admin);

  const superPages = [
    { id: 1, path: HOME_PAGE, name: t("home") },
    { id: 2, path: USERS_PAGE, name: t("users") },
    { id: 4, path: CATEGORIES_PAGE, name: t("categories") },
    { id: 3, path: COUNTRIES_PAGE, name: t("countries") },
  ];

  const pages = [
    { id: 1, path: HOME_PAGE, name: t("home") },
    { id: 2, path: USERS_PAGE, name: t("users") },
  ];

  const technicianPages = [
    { id: 1, path: HOME_PAGE, name: t("home") },
    { id: 2, path: `/user/${admin?.id}`, name: t("owners") },
  ];

  const ownerPages = [
    { id: 1, path: HOME_PAGE, name: t("home") },
    { id: 2, path: BOXES_PAGE, name: t("system") },
  ];

  useEffect(() => {
    setPathName(location.pathname);
    pathName !== window.location.pathname && setClose(false);
  }, [window.location.pathname]);

  return (
    <div
      className="sidebar"
      style={{
        background: themePallete,
      }}
    >
      {isMobile && (
        <div className="sidebar-close">
          <Tooltip title="Sidebar" arrow>
            {close ? (
              <CloseIcon
                onClick={() => setClose(!close)}
                style={{
                  cursor: "pointer",
                }}
                fontSize="large"
                sx={{ color: "white", fontSize: "25px" }}
              />
            ) : (
              <ClearAllIcon
                onClick={() => setClose(!close)}
                style={{
                  cursor: "pointer",
                }}
                sx={{ color: "white" }}
              />
            )}
          </Tooltip>
        </div>
      )}
      <ul>
        {isAuth &&
          (isSuper == "superAdmin"
            ? superPages?.map(({ id, path, name }) => {
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
            : isSuper == "admin"
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
