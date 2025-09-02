import React, { useState } from "react";
import {
  Card,
  Dropdown,
  LabelFieldPair,
  SubmitBar,
  Button,
} from "@egovernments/digit-ui-react-components";

const SearchBox = ({ t = () => "", title = "Search" }) => {
  const [financialYear, setFinancialYear] = React.useState(null);
  const financialYears = [
    { code: "2024-25", name: "2024-2025" },
    { code: "2023-24", name: "2023-2024" },
  ];

  const handleSearch = () => {
     console.log({
      financialYear
     
    });
  };

  const handleClose = () => {
    console.log("Close Clicked");
    window.history.back();
  };

  return (
    <div style={{ padding: "1rem",  background: "#fff" }}>
         <h2
        style={{
          background: "#2C3E50",
          color: "#fff",
          padding: "10px",
          fontSize: "1.2rem",
        }}
      >
        {title}
      </h2>
        {/* Form Body */}
        <div
          style={{
            padding: "2rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ width: "300px" }}>
            <LabelFieldPair>
              <label style={{ marginBottom: "8px" }}>Financial Year</label>
              <Dropdown
                option={financialYears}
                selected={financialYear}
                select={setFinancialYear}
                optionKey="name"
                t={t}
                style={{ width: "100%" }}
              />
            </LabelFieldPair>
          </div>
        </div>

        {/* Buttons */}
            <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "1rem",
                  marginTop: "1rem",
                }}
              >
                <SubmitBar label="Search" onSubmit={handleSearch} 
                className="submit-bar1"/>
                <Button label="Close" variation="secondary" onClick={() => window.history.back()} />
            </div>
     
    </div>
  );
};

export default SearchBox;
