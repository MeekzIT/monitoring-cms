import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { isAuthPages, notAuthPages } from "../../routing/routes";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";

import "./layout.css";

export default function MainLayout() {
  const auth = useSelector((state) => state.auth.isAuth);
  const [close, setClose] = useState(true);
  return (
    <div className="home">
      {close && <Sidebar />}
      {/* {auth && <>{close ? <Sidebar /> : <></>}</>} */}
      <div className="homeContainer">
        <Navbar close={close} setClose={setClose} />
        <Box>
          <Routes>
            {auth
              ? isAuthPages.map((i) => {
                  return (
                    <Route path={i.path} element={i.Component} key={i.id} />
                  );
                })
              : notAuthPages.map((i) => {
                  return (
                    <Route path={i.path} element={<i.Component />} key={i.id} />
                  );
                })}
          </Routes>
        </Box>
      </div>
    </div>
  );
}
