import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const GoBack = ({ prevPath }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSavePath = () => {
    // navigate(path);
    navigate(-1);
  };
  return (
    <Button
      variant="outlined"
      sx={{
        marginRight: "10px",
      }}
      onClick={handleSavePath}
    >
      {" "}
      <ArrowBackIcon />
      {t("go-back")}
    </Button>
  );
};

export default GoBack;
