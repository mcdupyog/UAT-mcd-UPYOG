import React from "react";
import {
  LabelFieldPair,
  Dropdown,
  DatePicker,
  SubmitBar,
  Button,
} from "@egovernments/digit-ui-react-components";

const AutoBankReconciliation = ({ t }) => {
  const [bank, setBank] = React.useState(null);
  const [branch, setBranch] = React.useState(null);
  const [account, setAccount] = React.useState(null);
  const [reconciliationDate, setReconciliationDate] = React.useState(null);
  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);

  const banks = [
    { code: "SBI", name: "State Bank of India" },
    { code: "ICICI", name: "ICICI Bank" },
  ];

  const branches = [
    { code: "SBI-Main", name: "SBI Main Branch" },
    { code: "ICICI-North", name: "ICICI North Branch" },
  ];

  const accounts = [
    { code: "AC001", name: "XXXXXX1234" },
    { code: "AC002", name: "XXXXXX5678" },
  ];

  const handleProcess = () => {
    console.log({
      bank,
      branch,
      account,
      reconciliationDate,
      fromDate,
      toDate,
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
        Auto Bank Reconciliation
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
            Bank <span style={{ color: "red" }}>*</span>
          </label>
          <Dropdown
            option={banks}
            selected={bank}
            select={setBank}
            optionKey="name"
            isMandatory
            t={t}
          />
        </LabelFieldPair>

        <LabelFieldPair>
          <label>
            Branch <span style={{ color: "red" }}>*</span>
          </label>
          <Dropdown
            option={branches}
            selected={branch}
            select={setBranch}
            optionKey="name"
            isMandatory
            t={t}
          />
        </LabelFieldPair>

        <LabelFieldPair>
          <label>
            Bank Account <span style={{ color: "red" }}>*</span>
          </label>
          <Dropdown
            option={accounts}
            selected={account}
            select={setAccount}
            optionKey="name"
            isMandatory
            t={t}
          />
        </LabelFieldPair>

        <LabelFieldPair>
          <label>
            Reconciliation Date <span style={{ color: "red" }}>*</span>
          </label>
          <DatePicker date={reconciliationDate} onChange={setReconciliationDate} />
        </LabelFieldPair>

        <LabelFieldPair>
          <label>
            Bank Statement From Date <span style={{ color: "red" }}>*</span>
          </label>
          <DatePicker date={fromDate} onChange={setFromDate} />
        </LabelFieldPair>

        <LabelFieldPair>
          <label>
            Bank Statement To Date <span style={{ color: "red" }}>*</span>
          </label>
          <DatePicker date={toDate} onChange={setToDate} />
        </LabelFieldPair>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
        <SubmitBar label="Process" onSubmit={handleProcess} />
        <Button label="Close" variation="secondary" onClick={handleClose} />
      </div>

      <div style={{ marginTop: "1rem", color: "red", paddingLeft: "1rem" }}>
        <p><strong>Note:</strong></p>
        <p>
          1. This screen will process the Bank Statement uploaded in Auto Reconcile - Statement Upload screen.
        </p>
      </div>
    </div>
  );
};

export default AutoBankReconciliation;
