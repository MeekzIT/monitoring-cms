import HomePage from "../Pages/home/Home";
import { HOME_PAGE, LOGIN_PAGE } from "./pats";
import LoginPage from "../Pages/login/Login";

export const isAuthPages = [{ id: 1, path: HOME_PAGE, Component: HomePage }];

export const notAuthPages = [{ id: 1, path: LOGIN_PAGE, Component: LoginPage }];
