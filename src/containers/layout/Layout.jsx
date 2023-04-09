import { Route, Routes, Navigate } from "react-router-dom";
import { isAuthPages, notAuthPages } from "../../routing/routes";

export default function MainLayout() {
  let isAuth = false;
  return (
    <div style={{ flex: "1 1 auto" }}>
      <Routes>
        {isAuth
          ? isAuthPages.map((i) => {
              return (
                <Route path={i.path} element={<i.Component />} key={i.id} />
              );
            })
          : notAuthPages.map((i) => {
              return (
                <Route path={i.path} element={<i.Component />} key={i.id} />
              );
            })}
      </Routes>
      {!isAuth && <Navigate to="/login" replace={true} />}
    </div>
  );
}
