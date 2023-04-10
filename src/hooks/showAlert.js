import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

export default function useAlert() {
  const [isOpen, setIsOpen] = useState(false);
  const [severity, setSeverity] = useState("info");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  function showAlert(severity, title, message) {
    setSeverity(severity);
    setTitle(title);
    setMessage(message);
    setIsOpen(true);
  }

  function hideAlert() {
    setIsOpen(false);
  }

  return {
    showAlert,
    hideAlert,
    AlertComponent: () => (
      <Stack sx={{ width: "100%" }} spacing={2}>
        {isOpen && (
          <Alert severity={severity} onClose={hideAlert}>
            {title && <AlertTitle>{title}</AlertTitle>}
            {message}
          </Alert>
        )}
      </Stack>
    ),
  };
}
