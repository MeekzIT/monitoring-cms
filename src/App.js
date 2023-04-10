import React, { useEffect } from "react";
import MainLayout from "./containers/layout/layout";
import { useDispatch } from "react-redux";
import { getMe, setAuthAction } from "./store/actions/auth-action";
import { useNavigate } from "react-router-dom";
import { LOGIN_PAGE } from "./routing/pats";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const isAuth = JSON.parse(localStorage.getItem("isAuth"));
    if (!localStorage.getItem("language")) {
      localStorage.setItem("language", "ru");
    }
    if (isAuth) {
      dispatch(setAuthAction(true));
      dispatch(getMe());
    } else navigate(LOGIN_PAGE);
  }, []);

  return (
    <div>
      <MainLayout />
    </div>
  );
}

export default App;
