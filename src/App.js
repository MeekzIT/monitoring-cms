import React, { useEffect } from "react";
import MainLayout from "./containers/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import {
  getMe,
  logoutAction,
  setAuthAction,
} from "./store/actions/auth-action";
import { useNavigate, useParams } from "react-router-dom";
import { LOGIN_PAGE } from "./routing/pats";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = JSON.parse(localStorage.getItem("isAuth"));
  useEffect(() => {
    if (!localStorage.getItem("language")) {
      localStorage.setItem("language", "ru");
    }
    if (window.location.pathname == "/taha") {
      localStorage.setItem("type", "taha");
    }
    if (window.location.pathname == "/") {
      localStorage.setItem("type", "jsx");
    }

    if (window.location.pathname == "/senyu") {
      localStorage.setItem("type", "senyu");
    }
    if (isAuth) {
      dispatch(setAuthAction(true));
      dispatch(getMe());
    } else {
      navigate(LOGIN_PAGE);
    }
  }, []);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(logoutAction());
      console.log("1 hour has passed!");
    }, 1200000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  
  return (
    <div>
      <MainLayout />
    </div>
  );
}

export default App;
