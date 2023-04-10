import { Alert } from "@mui/material";
import { useState } from "react";

export default function useCopyToClipboard() {
  const [isCopied, setIsCopied] = useState(false);
  function copyToClipboard(text) {
    if ("clipboard" in navigator) {
      navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    }
  }

  return [isCopied, copyToClipboard];
}
