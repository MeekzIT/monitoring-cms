import { useEffect, useState } from "react";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import { useIsMobile } from "../../hooks/useScreenType";
import { isAuthPages, notAuthPages } from "../../routing/routes";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import "./layout.css";
import Subscribe from "../../components/Subscribe/Subscribe";
import Payment from "../../Pages/payment/Payment";
import { PAYMENT_PAGE, PAYMENT_RESULT } from "../../routing/pats";
import Result from "../../Pages/result/Result";

export default function MainLayout() {
  const isMobile = useIsMobile();
  const [close, setClose] = useState(!isMobile);
  const auth = useSelector((state) => state.auth.isAuth);
  const data = useSelector((state) => state.auth.admin);

  useEffect(() => {
    setClose(!isMobile);
  }, [isMobile]);
  return (
    <div className="home">
      {data?.role == "owner" ? (
        data?.subscribe ? (
          <Sidebar close={close} setClose={setClose} />
        ) : null
      ) : (
        <Sidebar close={close} setClose={setClose} />
      )}

      <div
        className="homeContainer"
        style={{ display: close && isMobile ? "none" : "block" }}
      >
        <Navbar close={close} setClose={setClose} />
        <Box>
          {data?.role == "owner" && data?.variant == 0 ? (
            data?.subscribe ? (
              <Routes>
                {auth
                  ? isAuthPages.map((i) => {
                      return (
                        <Route path={i.path} element={i.Component} key={i.id} />
                      );
                    })
                  : notAuthPages.map((i) => {
                      return (
                        <Route
                          path={i.path}
                          element={<i.Component />}
                          key={i.id}
                        />
                      );
                    })}
              </Routes>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "90vh",
                }}
              >
                <Routes>
                  <Route path="/" element={<Subscribe />} />
                  <Route path={PAYMENT_PAGE} element={<Payment />} />
                  <Route path={PAYMENT_RESULT} element={<Result />} />
                </Routes>
              </Box>
            )
          ) : (
            <Routes>
              {auth
                ? isAuthPages.map((i) => {
                    return (
                      <Route path={i.path} element={i.Component} key={i.id} />
                    );
                  })
                : notAuthPages.map((i) => {
                    return (
                      <Route
                        path={i.path}
                        element={<i.Component />}
                        key={i.id}
                      />
                    );
                  })}
            </Routes>
          )}
        </Box>
      </div>
    </div>
  );
}
