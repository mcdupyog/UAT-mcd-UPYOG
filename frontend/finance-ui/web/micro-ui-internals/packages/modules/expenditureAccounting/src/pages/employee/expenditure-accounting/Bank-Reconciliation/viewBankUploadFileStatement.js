import React from "react";
import {
  LabelFieldPair,
  Dropdown,
  DatePicker,
  SubmitBar,
  Button,
} from "@egovernments/digit-ui-react-components";

const BankStatementSearch = ({ t }) => {
  const [bank, setBank] = React.useState(null);
  const [branch, setBranch] = React.useState(null);
  const [accountNumber, setAccountNumber] = React.useState(null);
  const [asOnDate, setAsOnDate] = React.useState(null);

  const banks = [
    { code: "SBI", name: "State Bank of India" },
    { code: "PNB", name: "Punjab National Bank" },
  ];

  const branches = [
    { code: "SBI-001", name: "SBI Main Branch" },
    { code: "PNB-002", name: "PNB City Branch" },
  ];

  const accountNumbers = [
    { code: "AC001", name: "XXXXXXXX1234" },
    { code: "AC002", name: "XXXXXXXX5678" },
  ];

  const handleSearch = () => {
    console.log({
      bank,
      branch,
      accountNumber,
      asOnDate,
    });
  };

  const handleClose = () => {
    window.history.back();
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
        Search Uploaded Bank Statement File
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
          <label>Bank</label>
          <Dropdown
            option={banks}
            selected={bank}
            select={setBank}
            optionKey="name"
            t={t}
          />
        </LabelFieldPair>

        <LabelFieldPair>
          <label>Bank Branch</label>
          <Dropdown
            option={branches}
            selected={branch}
            select={setBranch}
            optionKey="name"
            t={t}
          />
        </LabelFieldPair>

        <LabelFieldPair>
          <label>Account Number</label>
          <Dropdown
            option={accountNumbers}
            selected={accountNumber}
            select={setAccountNumber}
            optionKey="name"
            t={t}
          />
        </LabelFieldPair>

        <LabelFieldPair>
          <label>AsOnDate</label>
          <DatePicker date={asOnDate} onChange={setAsOnDate} />
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
        <Button label="Close" variation="secondary" onClick={handleClose} />
      </div>
    </div>
  );
};

export default BankStatementSearch;
