import React from "react";

const Error = React.memo(({ message }) => {
  return <span className="error-message">{message}</span>;
});

export default Error;
