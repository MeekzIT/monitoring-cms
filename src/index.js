import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import i18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import i18nextHttpBackend from "i18next-http-backend";

import "./index.css";


const theme = createTheme({
  palette: {
    primary: {
      main: "#00a896",
    },
  },
});

i18n
  .use(initReactI18next)
  .use(i18nextBrowserLanguageDetector)
  .use(i18nextHttpBackend)
  .init({
    supportedLngs: ["ru", "en", "am", "ge", "az"],
    fallbackLng: "am",
    detection: {
      order: ["cookie"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/translation/{{lng}}/translation.json",
    },
  });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
