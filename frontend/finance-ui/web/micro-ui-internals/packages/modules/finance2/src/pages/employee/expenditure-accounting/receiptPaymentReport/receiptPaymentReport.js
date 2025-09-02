import React from "react";
import {
  LabelFieldPair,
  Dropdown,
  SubmitBar,
  Button,
} from "@egovernments/digit-ui-react-components";

const ReceiptPaymentReport = ({ t }) => {
  const [financialYear, setFinancialYear] = React.useState(null);
  const [period, setPeriod] = React.useState(null);
  const [fund, setFund] = React.useState(null);
  const [rupees, setRupees] = React.useState(null);

  const financialYears = [
    { code: "2024-25", name: "2024-2025" },
    { code: "2023-24", name: "2023-2024" },
  ];

  const periods = [
    { code: "Q1", name: "Quarter 1" },
    { code: "Q2", name: "Quarter 2" },
    { code: "Q3", name: "Quarter 3" },
    { code: "Q4", name: "Quarter 4" },
  ];

  const funds = [
    { code: "GENERAL", name: "General Fund" },
    { code: "DEVELOPMENT", name: "Development Fund" },
  ];

  const rupeeTypes = [
    { code: "ACTUAL", name: "Actuals" },
    { code: "BUDGET", name: "Budget" },
  ];

  const handleSearch = () => {
    console.log({
      financialYear,
      period,
      fund,
      rupees,
    });
  };

  const handleReset = () => {
    setFinancialYear(null);
    setPeriod(null);
    setFund(null);
    setRupees(null);
  };

  const handleExportPDF = () => {
    console.log("Exporting PDF...");
  };

  const handleExportXLS = () => {
    console.log("Exporting XLS...");
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
        Receipt Payment Report
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
            Period <span style={{ color: "red" }}>*</span>
          </label>
          <Dropdown
            option={periods}
            selected={period}
            select={setPeriod}
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
            Rupees <span style={{ color: "red" }}>*</span>
          </label>
          <Dropdown
            option={rupeeTypes}
            selected={rupees}
            select={setRupees}
            optionKey="name"
            isMandatory
            t={t}
          />
        </LabelFieldPair>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        <SubmitBar label="Search" onSubmit={handleSearch} />
        <Button label="EXPORT PDF" variation="primary" onClick={handleExportPDF} />
        <Button label="EXPORT XLS" variation="primary" onClick={handleExportXLS} />
        <Button label="Close" variation="secondary" onClick={() => window.history.back()} />
      </div>
    </div>
  );
};

export default ReceiptPaymentReport;
