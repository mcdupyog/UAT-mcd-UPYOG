import React from "react";
import {
  LabelFieldPair,
  Dropdown,
  SubmitBar,
  Button,
} from "@egovernments/digit-ui-react-components";

const OpeningBalanceForm = ({ t }) => {
  const [financialYear, setFinancialYear] = React.useState(null);
  const [department, setDepartment] = React.useState(null);
  const [fund, setFund] = React.useState(null);
  const [func, setFunc] = React.useState(null);
  const [type, setType] = React.useState(null);
  const [majorHead, setMajorHead] = React.useState(null);
  const [minorHead, setMinorHead] = React.useState(null);
  const financialYears = [
    { code: "2024-25", name: "2024-2025" },
    { code: "2023-24", name: "2023-2024" },
  ];
  const departments = [
    { code: "DP1", name: "Health Department" },
    { code: "DP2", name: "Education Department" },
  ];
  

  const funds = [
    { code: "GENERAL", name: "General Fund" },
    { code: "DEVELOPMENT", name: "Development Fund" },
  ];
  const functions = [
    { code: "FN1", name: "Function A" },
    { code: "FN2", name: "Function B" },
  ];
  const types = [
    { code: "REVENUE", name: "Revenue" },
    { code: "CAPITAL", name: "Capital" },
  ];

  const majorHeads = [
    { code: "MH1", name: "Major Head 1" },
    { code: "MH2", name: "Major Head 2" },
  ];

  const minorHeads = [
    { code: "MIN1", name: "Minor Head A" },
    { code: "MIN2", name: "Minor Head B" },
  ];
  

  const handleSearch = () => {
    console.log({
      financialYear,
      department,
      fund,
      func,
      type,
      majorHead,
    });
  };

  const handleReset = () => {
    setFinancialYear(null);
    setPeriod(null);
    setFund(null);
    setFunction(null);
    setType(null);
    setMajorHead(null);
    setMinorHead(null);
  };



  return (
    <div style={{ padding: "1rem", background: "#fff" }}>
      <h2
        style={{
          background: "#2C3E50",
          color: "#fff",
          padding: "10px",
          fontSize: "1.2rem",
        }}
      >
        Opening Balance From
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        <LabelFieldPair>
          <label>
            Financial Year <span style={{ color: "red" }}>*</span>
          </label>
          <Dropdown
            option={financialYears}
            selected={financialYear}
            select={setFinancialYear}
            optionKey="name"
            isMandatory
            t={t}
          />
        </LabelFieldPair>

        <LabelFieldPair>
          <label>
            Department <span style={{ color: "red" }}>*</span>
          </label>
          <Dropdown
            option={departments}
            selected={department}
            select={setDepartment}
            optionKey="name"
            isMandatory
            t={t}
          />
        </LabelFieldPair>

        <LabelFieldPair>
          <label>Fund</label>
          <Dropdown
            option={funds}
            selected={fund}
            select={setFund}
            optionKey="name"
            t={t}
          />
        </LabelFieldPair>

        <LabelFieldPair>
          <label>
            Function <span style={{ color: "red" }}>*</span>
          </label>
          <Dropdown
            option={functions}
            selected={func}
            select={setFunc}
            optionKey="name"
            isMandatory
            t={t}
          />
        </LabelFieldPair>

        <LabelFieldPair>
          <label>Type</label>
          <Dropdown
            option={types}
            selected={type}
            select={setType}
            optionKey="name"
            t={t}
          />
        </LabelFieldPair>

        <LabelFieldPair>
          <label>
            Major Head <span style={{ color: "red" }}>*</span>
          </label>
          <Dropdown
            option={majorHeads}
            selected={majorHead}
            select={setMajorHead}
            optionKey="name"
            isMandatory
            t={t}
          />
        </LabelFieldPair>
        <LabelFieldPair>
          <label>Minor Head</label>
          <Dropdown
            option={minorHeads}
            selected={minorHead}
            select={setMinorHead}
            optionKey="name"
            t={t}
          />
        </LabelFieldPair>
      </div>

              {/* Buttons */}
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <SubmitBar label="Proceed" onSubmit={handleSearch} 
          className="submit-bar1"/>
          <button
            onClick={handleReset}
            style={{
              marginLeft: "1rem",
              padding: "10px 20px",
              border: "1px solid #2C3E50",
              backgroundColor: "#fff",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Close
          </button>
        </div>
    </div>
  );
};

export default OpeningBalanceForm;
