import React, { useState } from "react";
import "./navbar.css";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import CloseIcon from "@mui/icons-material/Close";
import Menu from "@mui/material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Tooltip } from "@mui/material";
import { LanguageSwitcher } from "../../../components/languageSwitcher/LanguageSwitcher";
import PersonIcon from "@mui/icons-material/Person";
import { logoutAction } from "../../../store/actions/auth-action";
import { LOGIN_PAGE, PAYMENT_PAGE, SETTIGS_PAGE } from "../../../routing/pats";
import SettingsIcon from "@mui/icons-material/Settings";
import { useTranslation } from "react-i18next";

const Navbar = ({ close, setClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const data = useSelector((state) => state.auth.admin);
  const isSuper = useSelector((state) => state.auth.isSuper);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    dispatch(logoutAction());
    navigate(LOGIN_PAGE);
  };
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <Tooltip title="Sidebar" arrow>
            {close ? (
              <CloseIcon
                onClick={() => setClose(!close)}
                style={{
                  cursor: "pointer",
                }}
                sx={{ color: "#00a896" }}
              />
            ) : (
              <ClearAllIcon
                onClick={() => setClose(!close)}
                style={{
                  cursor: "pointer",
                }}
                sx={{ color: "#00a896" }}
              />
            )}
          </Tooltip>
        </div>
        <div className="items">
          <div className="item">
            {!isSuper && (
              <Button
                variant="outlined"
                sx={{ borderColor: "maroon", color: "maroon" }}
                size="large"
                onClick={() => navigate(PAYMENT_PAGE)}
              >
                asdsa
              </Button>
            )}
          </div>
          <div className="item">
            <LanguageSwitcher />
          </div>
          {isAuth && (
            <div className="item">
              <PersonIcon
                sx={{
                  color: "gray",
                }}
                fontSize="large"
                onClick={handleClick}
                className="avatar"
              />
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleLogOut}>
                  <LogoutIcon />
                  Logout
                </MenuItem>
                <MenuItem onClick={() => navigate(SETTIGS_PAGE)}>
                  <SettingsIcon />
                  {t("settings")}
                </MenuItem>
              </Menu>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
