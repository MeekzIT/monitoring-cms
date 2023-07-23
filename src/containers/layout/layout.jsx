import { useEffect, useState } from "react";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import { useIsMobile } from "../../hooks/useScreenType";
import { isAuthPages, notAuthPages } from "../../routing/routes";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import "./layout.css";

export default function MainLayout() {
  const isMobile = useIsMobile()
  const [close, setClose] = useState(!isMobile);
  const auth = useSelector((state) => state.auth.isAuth);


  useEffect(()=>{
    setClose(!isMobile)
  },[isMobile])

  return (
    <div className="home">
      {close && <Sidebar close={close} setClose={setClose}/>}
      <div className="homeContainer" style={{display : close && isMobile ? "none" : "block"}}>
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
