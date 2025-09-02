import React from "react";

const FormHeader = ({ children, className = "" }) => {
  return (
    <div className={`container mx-auto ${className}`}>
      {children}
    </div>
  );
};

export default FormHeader;